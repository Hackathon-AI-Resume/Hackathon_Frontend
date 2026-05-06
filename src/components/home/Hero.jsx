import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button.jsx";
import TechLogos from "./TechLogos.jsx";
import Siliconflow from "../../assets/siliconflow.svg";
import Gemini from "../../assets/gemini.svg";

const githubRepoUrl = "https://github.com/Hackathon-AI-Resume";

const statusTone = {
  pending: "bg-amber-400",
  ready: "bg-green-500",
  offline: "bg-red-500",
};

const Hero = () => {
  const [systems, setSystems] = useState({
    app: "pending",
    db: "pending",
    ai: "pending",
  });

  useEffect(() => {
    let isMounted = true;
    const timers = [];

    const updateSystems = (nextState, animate = false) => {
      if (!isMounted) return;

      if (!animate) {
        setSystems(nextState);
        return;
      }

      [
        ["app", nextState.app],
        ["db", nextState.db],
        ["ai", nextState.ai],
      ].forEach(([key, value], index) => {
        const timer = window.setTimeout(() => {
          if (!isMounted) return;
          setSystems((prev) => ({ ...prev, [key]: value }));
        }, 420 * (index + 1));
        timers.push(timer);
      });
    };

    const checkHealth = async () => {
      const healthUrl = import.meta.env.VITE_API_HEALTH_URL;

      if (!healthUrl) {
        updateSystems({
          app: "ready",
          db: "ready",
          ai: "ready",
        });
        return;
      }

      try {
        const response = await fetch(healthUrl);
        const payload = await response.json().catch(() => null);

        const appHealthy = response.ok;
        const dbHealthy = Boolean(
          payload?.db ?? payload?.database ?? payload?.[0]?.db ?? appHealthy
        );
        const aiHealthy = Boolean(
          payload?.ai ?? payload?.model ?? payload?.[0]?.ai ?? appHealthy
        );

        updateSystems(
          {
            app: appHealthy ? "ready" : "offline",
            db: dbHealthy ? "ready" : "offline",
            ai: aiHealthy ? "ready" : "offline",
          },
          appHealthy
        );
      } catch (error) {
        console.error(error);
        updateSystems({
          app: "offline",
          db: "offline",
          ai: "offline",
        });
      }
    };

    checkHealth();

    return () => {
      isMounted = false;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const appReady = systems.app === "ready";

  return (
    <section className="overflow-hidden border-b border-white/10">
      <div className="flex min-h-[calc(100vh-5rem)] flex-col justify-center py-10 sm:py-12">
        <div className="home-container flex flex-1 flex-col justify-center">
          <div className="mx-auto w-full max-w-5xl pb-12 text-center sm:pb-16 lg:pb-20">
            <div className="mb-8 flex flex-wrap justify-center gap-x-3 gap-y-3">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                <span
                  className={`mr-2 h-2 w-2 rounded-full transition-colors duration-700 ${statusTone[systems.app]}`}
                />
                Application Server
              </div>

              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                <span
                  className={`mr-2 h-2 w-2 rounded-full transition-colors duration-700 ${statusTone[systems.db]}`}
                />
                Database Server
              </div>

              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                <span
                  className={`mr-2 h-2 w-2 rounded-full transition-colors duration-700 ${statusTone[systems.ai]}`}
                />
                AI Inference Engine
              </div>
            </div>

            <h1 className="mx-auto mb-10 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              AI-Powered Resumes
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                That Gets You Hired
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-3xl px-4 text-sm leading-7 text-slate-300 sm:text-base md:text-lg">
              FairStart helps you shape a stronger resume for each role. Start
              from your existing draft, compare it against the job post, and
              tighten the final version before you apply.
            </p>

            <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-5 px-4">
              {appReady ? (
                <Button
                  asChild
                  className="h-12 rounded-lg border border-transparent bg-white px-8 text-lg font-semibold text-slate-900 shadow-md transition hover:bg-slate-200"
                >
                  <Link to="/dashboard">Get Started &gt;&gt;</Link>
                </Button>
              ) : (
                <span className="text-sm text-slate-400 animate-pulse">
                  {systems.app === "offline"
                    ? "Service unavailable"
                    : "Connecting..."}
                </span>
              )}

              <p className="text-sm leading-6 text-slate-400 sm:text-[15px]">
                This public demo is not currently connected to the original
                hackathon backend. That service was built for the event and is
                not always available online.
              </p>

              <p className="text-sm leading-6 text-slate-400 sm:text-[15px]">
                You can still review the source on{" "}
                <a
                  href={githubRepoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-200 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white"
                >
                  GitHub
                </a>
                , run the project locally with Docker, or reach out if you
                would like a live walkthrough.
              </p>
            </div>

            <div className="max-w-2xl mx-auto mt-16 flex justify-between gap-8 sm:gap-12 lg:mt-24">
              <a
                href="https://siliconflow.cn/"
                target="_blank"
                rel="noreferrer"
                className="opacity-85 transition duration-300 hover:scale-105 hover:opacity-100"
              >
                <img
                  className="h-8 w-auto sm:h-10"
                  src={Siliconflow}
                  alt="SiliconFlow logo"
                />
              </a>
              <a
                href="https://gemini.google.com/"
                target="_blank"
                rel="noreferrer"
                className="opacity-85 transition duration-300 hover:scale-105 hover:opacity-100"
              >
                <img
                  className="h-8 w-auto sm:h-10"
                  src={Gemini}
                  alt="Gemini logo"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="relative left-1/2 mt-8 w-screen -translate-x-1/2 border-t border-white/10 pt-8 lg:mt-12 lg:pt-10">
          <TechLogos />
        </div>
      </div>
    </section>
  );
};

export default Hero;
