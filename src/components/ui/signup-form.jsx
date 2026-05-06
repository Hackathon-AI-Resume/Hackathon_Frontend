import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Logo from "../../assets/Fs_b.png";
import { useAuth } from "../../context/auth-context";

const EMPTY_ERROR_SLOT = "\u00A0";

export default function SignupForm({ className, ...props }) {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const clearErrorOnChange = (setter) => (event) => {
    setter(event.target.value);
    if (error) setError("");
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    if (submitting) return;

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      await signUp({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
      });

      navigate("/dashboard");
    } catch (authError) {
      setError(authError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-linear-to-br from-slate-50 via-white to-slate-100 px-6 py-10">
      <div className="w-full max-w-md">
        <div
          className={cn(
            "rounded-[28px] border border-slate-200/80 bg-white/92 p-8 shadow-lg shadow-slate-200/40 backdrop-blur sm:p-10",
            className
          )}
          {...props}
        >
          <div className="mb-8 flex items-center gap-3">
            <Link to="/" className="shrink-0 transition hover:opacity-85">
              <img
                src={Logo}
                alt="FairStart logo"
                className="h-10 w-10 object-contain"
              />
            </Link>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                FairStart
              </p>
              <p className="text-xs text-slate-400">Resume project demo</p>
            </div>
          </div>

          <div className="mb-8 space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
              Create an account
            </h1>
            <p className="text-sm leading-6 text-slate-500 sm:text-[15px]">
              Set up your account and start working through the resume flow.
            </p>
          </div>

          <form onSubmit={handleSignup} noValidate>
            <FieldGroup className="gap-5">
              <Field>
                <FieldLabel htmlFor="signup-name">Full name</FieldLabel>
                <Input
                  id="signup-name"
                  autoComplete="name"
                  value={fullName}
                  onChange={clearErrorOnChange(setFullName)}
                  disabled={submitting}
                  placeholder="Optional"
                  aria-invalid={!!error}
                  className="h-11 rounded-xl border-slate-300 bg-white"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="signup-email">Email</FieldLabel>
                <Input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={clearErrorOnChange(setEmail)}
                  disabled={submitting}
                  required
                  aria-invalid={!!error}
                  className="h-11 rounded-xl border-slate-300 bg-white"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="signup-password">Password</FieldLabel>
                <Input
                  id="signup-password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={clearErrorOnChange(setPassword)}
                  disabled={submitting}
                  required
                  aria-invalid={!!error}
                  className="h-11 rounded-xl border-slate-300 bg-white"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="signup-confirm-password">
                  Confirm password
                </FieldLabel>
                <Input
                  id="signup-confirm-password"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={clearErrorOnChange(setConfirmPassword)}
                  disabled={submitting}
                  required
                  aria-invalid={!!error}
                  className="h-11 rounded-xl border-slate-300 bg-white"
                />
              </Field>

              <p
                role={error ? "alert" : undefined}
                aria-live="polite"
                className={cn(
                  "min-h-5 text-sm leading-5 transition-colors",
                  error ? "text-red-600" : "text-transparent"
                )}
              >
                {error || EMPTY_ERROR_SLOT}
              </p>

              <Field className="gap-4">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-11 rounded-full bg-slate-950 text-white hover:bg-slate-800"
                >
                  {submitting ? "Creating account..." : "Create account"}
                </Button>

                <FieldDescription className="text-center text-sm text-slate-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-slate-800 hover:text-black"
                  >
                    Log in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </div>
      </div>
    </div>
  );
}
