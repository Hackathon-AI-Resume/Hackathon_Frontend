import React from "react";
import ReactCompareImage from "react-compare-image";
import {
  FileSearch,
  Gauge,
  PenSquare,
  ScanSearch,
} from "lucide-react";
import SectionIntro from "./SectionIntro.jsx";

const featureCards = [
  {
    step: "01",
    title: "Role-fit keyword mapping",
    description:
      "FairStart scans the job description, spots what matters most, and shows where your resume already aligns or still needs support.",
    bullets: [
      "Extracts hiring signals from the job post",
      "Flags missing themes before you apply",
      "Keeps language aligned without overstuffing",
    ],
    icon: FileSearch,
    accent: "from-cyan-400/20 to-blue-500/10",
    iconClass: "text-cyan-200",
  },
  {
    step: "02",
    title: "AI bullet rewriting",
    description:
      "Turn vague responsibilities into sharp, measurable impact statements that sound credible to both recruiters and hiring managers.",
    bullets: [
      "Rewrites around outcomes, not filler",
      "Preserves your actual experience",
      "Pushes stronger verbs, scope, and metrics",
    ],
    icon: PenSquare,
    accent: "from-emerald-400/20 to-teal-500/10",
    iconClass: "text-emerald-200",
  },
  {
    step: "03",
    title: "ATS-safe structure control",
    description:
      "The layout stays clean and parseable while the content gets smarter, so you do not trade polish for compatibility.",
    bullets: [
      "Protects hierarchy and section clarity",
      "Keeps formatting recruiter-friendly",
      "Removes the need for manual template cleanup",
    ],
    icon: ScanSearch,
    accent: "from-blue-400/20 to-indigo-500/10",
    iconClass: "text-blue-200",
  },
  {
    step: "04",
    title: "Resume scoring feedback",
    description:
      "Get a high-level confidence read plus concrete improvement directions before your resume ever reaches a recruiter.",
    bullets: [
      "Summarizes strengths and blind spots",
      "Scores readiness across multiple signals",
      "Turns analysis into next editing actions",
    ],
    icon: Gauge,
    accent: "from-amber-400/20 to-orange-500/10",
    iconClass: "text-amber-200",
  },
];

const comparisonNotes = [
  {
    title: "Before",
    description:
      "Weak alignment, buried impact, and generic phrasing make a resume easier to skip.",
  },
  {
    title: "After",
    description:
      "The resume becomes sharper, more role-aware, and easier for ATS and recruiters to parse quickly.",
  },
];

const Features = () => {
  return (
    <section id="featuresSection" className="home-section">
      <div className="home-container">
        <SectionIntro
          eyebrow="Workflow"
          title="A tighter workflow from job post to polished resume"
          description="Each step is designed to reduce guesswork. You get clearer targeting, stronger writing, and cleaner structure without bouncing between disconnected tools."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {featureCards.map(
            ({ step, title, description, bullets, icon, accent, iconClass }) => (
              <article key={title} className="home-panel h-full p-6 sm:p-8">
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br ${accent}`}
                >
                  {React.createElement(icon, {
                    className: `h-6 w-6 ${iconClass}`,
                  })}
                </div>

                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                      Step {step}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">
                      {title}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-base leading-7 text-slate-300">
                  {description}
                </p>

                <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-200">
                  {bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-cyan-200" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )
          )}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="home-panel p-6 sm:p-8">
            <span className="home-kicker">Before / After</span>
            <h3 className="mt-5 text-3xl font-semibold tracking-tight text-white">
              See the quality jump, not just the promise.
            </h3>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Slide across the example to compare a weaker resume against a
              more focused, more scannable version. The goal is not louder
              language. It is clearer evidence and better fit.
            </p>

            <div className="mt-8 grid gap-4">
              {comparisonNotes.map((note) => (
                <div key={note.title} className="home-panel-soft p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-100">
                    {note.title}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {note.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="home-panel overflow-hidden p-3 sm:p-4">
            <div className="overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/80">
              <ReactCompareImage
                leftImage="/resumebad.jpg"
                rightImage="/resumegood.jpg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
