import React, { useEffect, useState } from "react";
import { AuthContext } from "./auth-context";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

const FRIENDLY_AUTH_MESSAGES = {
  signInDefault: "We couldn't sign you in. Please try again.",
  invalidCredentials: "Incorrect email or password.",
  signUpDefault: "We couldn't create your account. Please review your information and try again.",
  accountExists: "An account with this email already exists. Try signing in instead.",
  serviceUnavailable: "This service is temporarily unavailable. Please try again later.",
};

function readStoredUser(rawUser) {
  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
}

async function parseJsonSafely(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function extractErrorText(payload) {
  if (!payload) return "";

  if (typeof payload === "string") {
    return payload;
  }

  if (typeof payload?.detail === "string") {
    return payload.detail;
  }

  if (Array.isArray(payload?.detail)) {
    return payload.detail
      .map((item) => {
        if (typeof item === "string") return item;
        if (typeof item?.msg === "string") return item.msg;
        return "";
      })
      .filter(Boolean)
      .join(" ");
  }

  if (typeof payload?.message === "string") {
    return payload.message;
  }

  return "";
}

function getFriendlyAuthMessage({ mode, status, payload, fallbackMessage }) {
  const normalized = extractErrorText(payload).toLowerCase();

  if (
    mode === "signIn" &&
    (status === 401 ||
      normalized.includes("invalid credential") ||
      normalized.includes("invalid credentials") ||
      normalized.includes("incorrect password"))
  ) {
    return FRIENDLY_AUTH_MESSAGES.invalidCredentials;
  }

  if (
    mode === "signUp" &&
    (status === 409 ||
      normalized.includes("already exists") ||
      normalized.includes("already registered") ||
      normalized.includes("already been registered") ||
      normalized.includes("duplicate"))
  ) {
    return FRIENDLY_AUTH_MESSAGES.accountExists;
  }

  if (status >= 500) {
    return FRIENDLY_AUTH_MESSAGES.serviceUnavailable;
  }

  return fallbackMessage;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
    const storedUser = readStoredUser(localStorage.getItem(AUTH_USER_KEY));

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }

    setLoading(false);
  }, []);

  const setSession = ({ user: nextUser, token: nextToken }) => {
    setUser(nextUser);
    setToken(nextToken);
    localStorage.setItem(AUTH_TOKEN_KEY, nextToken);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser));
  };

  const login = ({ user: nextUser, token: nextToken }) => {
    setSession({ user: nextUser, token: nextToken });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  };

  const signIn = async ({ email, password }) => {
    const loginUrl = import.meta.env.VITE_API_LOGIN_URL;

    if (!loginUrl) {
      throw new Error(FRIENDLY_AUTH_MESSAGES.serviceUnavailable);
    }

    let response;

    try {
      response = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    } catch {
      throw new Error(FRIENDLY_AUTH_MESSAGES.serviceUnavailable);
    }

    const payload = await parseJsonSafely(response);

    if (!response.ok) {
      throw new Error(
        getFriendlyAuthMessage({
          mode: "signIn",
          status: response.status,
          payload,
          fallbackMessage: FRIENDLY_AUTH_MESSAGES.signInDefault,
        })
      );
    }

    if (!payload?.token) {
      throw new Error(FRIENDLY_AUTH_MESSAGES.signInDefault);
    }

    setSession({
      user: payload.user ?? { email },
      token: payload.token,
    });

    return payload;
  };

  const signUp = async ({ email, password, fullName }) => {
    const signupUrl = import.meta.env.VITE_API_SIGNUP_URL;

    if (!signupUrl) {
      throw new Error(FRIENDLY_AUTH_MESSAGES.serviceUnavailable);
    }

    let response;

    try {
      response = await fetch(signupUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          full_name: fullName,
        }),
      });
    } catch {
      throw new Error(FRIENDLY_AUTH_MESSAGES.serviceUnavailable);
    }

    const payload = await parseJsonSafely(response);

    if (!response.ok) {
      throw new Error(
        getFriendlyAuthMessage({
          mode: "signUp",
          status: response.status,
          payload,
          fallbackMessage: FRIENDLY_AUTH_MESSAGES.signUpDefault,
        })
      );
    }

    if (!payload?.token) {
      throw new Error(FRIENDLY_AUTH_MESSAGES.signUpDefault);
    }

    setSession({
      user: payload.user ?? { email, full_name: fullName },
      token: payload.token,
    });

    return payload;
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    signIn,
    signUp,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
