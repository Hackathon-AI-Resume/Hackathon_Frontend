import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "../ui/button";

const footerLinks = [
  { name: "Workflow", href: "#featuresSection" },
  { name: "Stack", href: "#stackSection" },
  { name: "Team", href: "#teamSection" },
  { name: "FAQ", href: "#faqSection" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/10 bg-slate-950/60">
      <div className="home-container py-12 sm:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-100">
              FairStart
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              AI-powered resume optimization with a clearer product flow.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
              Built to help applicants move from job post to stronger resume
              faster, with better feedback and less trial-and-error.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                Navigate
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {footerLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-slate-300 transition hover:text-white"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                Explore
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <Button
                  asChild
                  variant="ghost"
                  className="h-11 justify-start rounded-full border border-white/10 bg-white/5 px-4 text-slate-100 hover:bg-white/10 hover:text-white"
                >
                  <Link to="/signup">Create an account</Link>
                </Button>
                <a
                  href="https://github.com/Hackathon-AI-Resume"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-slate-100 transition hover:bg-white/10 hover:text-white"
                >
                  <span className="inline-flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    View GitHub
                  </span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {currentYear} FairStart. All rights reserved.</p>
          <p>Designed for clearer applications, stronger fit, and faster iteration.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
