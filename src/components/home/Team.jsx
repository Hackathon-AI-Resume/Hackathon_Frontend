import React from "react";
import {
  ArrowUpRight,
  Award,
  Code2,
  Linkedin,
  ServerCog,
  Workflow,
} from "lucide-react";
import SectionIntro from "./SectionIntro.jsx";
import Zexiang from "../../assets/team/zexiang.jpg";
import Yanfeng from "../../assets/team/yanfeng.jpg";
import Chunyu from "../../assets/team/chunyu.jpg";
import Certificate from "../../assets/certificate.png";

const teamMembers = [
  {
    name: "Zexiang Zhang",
    role: "Full Stack Engineer",
    image: Zexiang,
    url: "https://www.linkedin.com/in/zexiang-zhang-9842b6160/",
    icon: Code2,
    summary:
      "Owns the end-to-end product flow, from frontend experience to platform wiring and release velocity.",
    strengths: ["React UI", "Product architecture", "Delivery loop"],
  },
  {
    name: "Yanfeng Tan",
    role: "Backend Engineer",
    image: Yanfeng,
    url: "https://www.linkedin.com/in/yanfeng-tan/",
    icon: Workflow,
    summary:
      "Builds the backend services and orchestration logic that keep resume generation stable and scalable.",
    strengths: ["API design", "Service reliability", "Data flow"],
  },
  {
    name: "Chunyu Huang",
    role: "System Engineer",
    image: Chunyu,
    url: "https://www.linkedin.com/in/chun-yu-huang-8b194b167/",
    icon: ServerCog,
    summary:
      "Handles the systems and infrastructure side so the product can ship with confidence beyond the prototype stage.",
    strengths: ["Deployment", "Environment ops", "Platform support"],
  },
];

const teamValues = [
  {
    title: "Small team, fast iteration",
    description:
      "We keep the loop tight between product ideas, implementation, and user-facing improvements.",
  },
  {
    title: "Engineering across layers",
    description:
      "Frontend polish, backend reliability, and system thinking all show up directly in the product.",
  },
  {
    title: "Built to be useful",
    description:
      "The goal is not flashy AI output. It is practical resume improvement people can use right away.",
  },
];

const Team = () => {
  return (
    <section id="teamSection" className="home-section">
      <div className="home-container">
        <SectionIntro
          eyebrow="Team"
          title="A focused team building across product, backend, and systems"
          description="FairStart is shaped by a compact engineering group that ships quickly, covers multiple layers of the stack, and cares about making AI features actually useful."
        />

        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {teamValues.map((value) => (
            <div key={value.title} className="home-panel-soft p-5">
              <h3 className="text-lg font-semibold text-white">{value.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <div className="home-panel mb-10 overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <span className="home-kicker">Recognition</span>
              <h3 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Hackathon Excellent Achievement
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Our team earned this hackathon recognition for FairStart. It is
                a strong snapshot of the product thinking, execution speed, and
                collaboration behind the project.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="home-chip">
                  <Award className="mr-2 h-4 w-4 text-cyan-200" />
                  Team Award
                </span>
                <span className="home-chip">December 9, 2025</span>
              </div>
            </div>

            <div className="border-t border-white/10 bg-slate-950/60 p-4 lg:border-l lg:border-t-0 lg:p-6">
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white shadow-2xl shadow-black/30">
                <img
                  src={Certificate}
                  alt="Hackathon Excellent Achievement certificate awarded to the FairStart team"
                  className="w-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {teamMembers.map(({ name, role, image, url, icon, summary, strengths }) => (
            <article key={name} className="home-panel overflow-hidden">
              <div className="aspect-[4/4.4] overflow-hidden">
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-100">
                      {role}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      {name}
                    </h3>
                  </div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    {React.createElement(icon, {
                      className: "h-5 w-5 text-cyan-200",
                    })}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {strengths.map((strength) => (
                    <span key={strength} className="home-chip text-xs">
                      {strength}
                    </span>
                  ))}
                </div>

                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-100 transition hover:text-white"
                >
                  <Linkedin className="h-4 w-4" />
                  View profile
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
