import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Github,
  LayoutDashboard,
  LogOut,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import Logo from "../../assets/Fs_w.png";
import { Button } from "../ui/button";
import { useAuth } from "../../context/auth-context";

const navLinks = [
  { name: "Workflow", href: "#featuresSection" },
  { name: "Stack", href: "#stackSection" },
  { name: "Team", href: "#teamSection" },
  { name: "FAQ", href: "#faqSection" },
];

const navLinkClass =
  "text-sm font-medium text-slate-300 transition hover:text-white";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout, loading, user } = useAuth();

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  const showAuthUI = !loading;
  const userLabel = user?.email?.split("@")[0];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="home-container flex h-20 items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-3 transition hover:opacity-90"
          onClick={closeMenu}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl shadow-lg shadow-cyan-500/5">
            <img
              src={Logo}
              alt="FairStart logo"
              className="h-8 w-8 object-contain"
            />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-100">
              FairStart
            </p>
            <p className="text-xs text-slate-400">AI Resume Studio</p>
          </div>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className={navLinkClass}>
              {link.name}
            </a>
          ))}
          <a
            href="https://github.com/Hackathon-AI-Resume"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {showAuthUI && !isAuthenticated ? (
            <>
              <Button
                asChild
                variant="ghost"
                className="rounded-full px-5 text-slate-200 hover:bg-white/10 hover:text-white"
              >
                <Link to="/login">Log in</Link>
              </Button>
              <Button
                asChild
                className="rounded-full border border-cyan-300/20 bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-200"
              >
                <Link to="/signup">
                  Start free
                </Link>
              </Button>
            </>
          ) : null}

          {showAuthUI && isAuthenticated ? (
            <>
              {userLabel ? (
                <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 xl:inline-flex">
                  {userLabel}
                </span>
              ) : null}
              <Button
                asChild
                variant="ghost"
                className="rounded-full px-5 text-slate-200 hover:bg-white/10 hover:text-white"
              >
                <Link to="/dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="rounded-full border border-white/10 bg-white/5 px-4 text-slate-100 hover:bg-white/10 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : null}
        </div>

        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-white/10 bg-slate-950/95 transition-all duration-300 md:hidden ${
          isMenuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="home-container flex flex-col gap-3 py-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-white/10 hover:bg-white/5"
            >
              {link.name}
            </a>
          ))}

          <a
            href="https://github.com/Hackathon-AI-Resume"
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
            className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200"
          >
            <span className="inline-flex items-center gap-2">
              <Github className="h-4 w-4" />
              GitHub
            </span>
            <ArrowUpRight className="h-4 w-4" />
          </a>

          {showAuthUI && !isAuthenticated ? (
            <div className="grid gap-3 pt-2">
              <Button
                asChild
                variant="ghost"
                className="h-12 rounded-2xl border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10 hover:text-white"
              >
                <Link to="/login" onClick={closeMenu}>
                  Log in
                </Link>
              </Button>
              <Button
                asChild
                className="h-12 rounded-2xl border border-cyan-300/20 bg-cyan-300 text-slate-950 hover:bg-cyan-200"
              >
                <Link to="/signup" onClick={closeMenu}>
                  <Sparkles className="h-4 w-4" />
                  Start free
                </Link>
              </Button>
            </div>
          ) : null}

          {showAuthUI && isAuthenticated ? (
            <div className="grid gap-3 pt-2">
              <Button
                asChild
                variant="ghost"
                className="h-12 rounded-2xl border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10 hover:text-white"
              >
                <Link to="/dashboard" onClick={closeMenu}>
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button
                onClick={handleLogout}
                className="h-12 rounded-2xl border border-white/10 bg-rose-500/90 text-white hover:bg-rose-500"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
