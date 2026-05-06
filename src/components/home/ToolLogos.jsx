import React from "react";
import SectionIntro from "./SectionIntro.jsx";
import AwsLogo from "../../assets/tools/aws.png";
import DeepseekLogo from "../../assets/tools/deepseek.svg";
import FastapiLogo from "../../assets/tools/fastapi.svg";
import FigmaLogo from "../../assets/tools/figma.svg";
import InsomniaLogo from "../../assets/tools/insomnia.svg";
import LangchainLogo from "../../assets/tools/langchain.png";
import LanggraphLogo from "../../assets/tools/langgraph.png";
import LangsmithLogo from "../../assets/tools/langsmith.png";
import LinuxLogo from "../../assets/tools/ubuntu.png";
import PostgresqlLogo from "../../assets/tools/postgresql.svg";
import PydanticAiLogo from "../../assets/tools/pydanticai.svg";
import PythonLogo from "../../assets/tools/python.svg";
import RaspberryPiLogo from "../../assets/tools/raspberry-pi.svg";
import ReactLogo from "../../assets/tools/react.svg";
import TailwindLogo from "../../assets/tools/tailwindcss.svg";
import DockerLogo from "../../assets/tools/docker.svg";
import VercelLogo from "../../assets/tools/vercel.png";
import SiliconFlowLogo from "../../assets/tools/siliconflow.png";
import GitLogo from "../../assets/tools/git.png";

const tools = [
  { name: "React", logo: ReactLogo },
  { name: "Tailwind CSS", logo: TailwindLogo },
  { name: "FastAPI", logo: FastapiLogo },
  { name: "Python", logo: PythonLogo },
  { name: "LangChain", logo: LangchainLogo },
  { name: "LangGraph", logo: LanggraphLogo },
  { name: "LangSmith", logo: LangsmithLogo },
  { name: "SiliconFlow", logo: SiliconFlowLogo },
  { name: "DeepSeek", logo: DeepseekLogo },
  { name: "PostgreSQL", logo: PostgresqlLogo },
  { name: "Git", logo: GitLogo },
  { name: "AWS", logo: AwsLogo },
  { name: "Vercel", logo: VercelLogo },
  { name: "Docker", logo: DockerLogo },
  { name: "Ubuntu", logo: LinuxLogo },
  { name: "Insomnia", logo: InsomniaLogo },
  { name: "Figma", logo: FigmaLogo },
  { name: "Pydantic AI", logo: PydanticAiLogo },
  { name: "Raspberry Pi", logo: RaspberryPiLogo },
];

const stackPillars = ["Frontend", "LLM orchestration", "Infra and data"];

const ToolLogos = () => {
  return (
    <section id="stackSection" className="home-section">
      <div className="home-container">
        <SectionIntro
          eyebrow="Stack"
          title="Built with a modern product and AI delivery stack"
          description="The product experience is backed by frontend polish, orchestration tooling, and deployment infrastructure chosen for iteration speed and production reliability."
        />

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {stackPillars.map((pillar) => (
            <span key={pillar} className="home-chip">
              {pillar}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="home-panel-soft flex min-h-[132px] flex-col items-center justify-center gap-3 p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/8"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/70">
                <img
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  className="h-9 w-9 object-contain"
                  loading="lazy"
                />
              </div>
              <p className="text-sm font-medium text-slate-200">{tool.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolLogos;
