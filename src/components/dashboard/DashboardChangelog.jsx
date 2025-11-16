import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    History,
    GitBranch,
    Rocket,
    Wrench,
    Sparkles,
    CalendarClock,
} from 'lucide-react';


import mashupsImg from '../../assets/mashups.png';
import introImg from '../../assets/introduction.png';
import macmockupImg from '../../assets/macmockup.png';
import feturesImg from '../../assets/fetures.png';
import reviewImg from '../../assets/review.png';

const productShots = [
{
    src: mashupsImg,
    title: 'FairStart Product Overview',
    caption: 'A consolidated showcase of FairStart’s resume workspace, AI optimization pipeline, and core user experience.',
},
{
    src: introImg,
    title: 'Intelligent Resume Builder Introduction',
    caption: 'A clean and guided starting interface that walks users through resume creation and AI enhancement.',
},
{
    src: macmockupImg,
    title: 'Full AI Optimization Workflow Preview',
    caption: 'A high-level visualization of how FairStart parses, optimizes, and evaluates resumes through multi-agent collaboration.',
},
{
    src: feturesImg,
    title: 'Feature Highlights & System Capabilities',
    caption: 'Showcases the key modules of FairStart—including parsing, editing, evaluation, and export functionalities.',
},
{
    src: reviewImg,
    title: 'HR-Style Evaluation & Feedback System',
    caption: 'Demonstrates detailed feedback, mismatch detection, and improvement suggestions powered by HR-inspired reasoning.',
},

];

const DashboardChangelog = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (productShots.length <= 1) return;

        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % productShots.length);
        }, 5000); // 每 5 秒自动切换

        return () => clearInterval(timer);
    }, []);

    const activeShot = productShots[activeIndex];

    return (
        <div className="w-full h-full overflow-auto bg-neutral-50">
            <div className="max-w-6xl mx-auto py-8 px-4 lg:px-8 space-y-10">
                {/* Hero */}
                <section className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <Badge
                            variant="outline"
                            className="border-sky-300 bg-sky-50 text-sky-800 text-[11px]"
                        >
                            Product Changelog · Build Journey
                        </Badge>
                        <Badge
                            variant="outline"
                            className="border-emerald-200 bg-emerald-50 text-emerald-700 text-[10px]"
                        >
                            Project started · 2025-11-06
                        </Badge>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
                            Follow the <span className="text-blue-400">FairStart</span> build in real time.
                        </h1>
                        <p className="text-sm lg:text-base text-slate-600 max-w-2xl">
                            This page records the key milestones, iterations, and experiments of the project.
                            Use it to document what changed, why it changed, and what you&apos;re planning next.
                        </p>
                    </div>
                </section>

                {/* Latest Release Summary */}
                <section className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-start">
                    <Card className="border-slate-200">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm lg:text-base">
                                <Rocket className="w-4 h-4 text-emerald-500" />
                                Latest Release Snapshot
                            </CardTitle>
                            <CardDescription className="text-xs lg:text-sm">
                                Completed Multi-Platform Deployment & Major Backend Optimization
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 text-xs lg:text-sm text-slate-700">
                            <div className="flex flex-wrap items-center gap-2 text-[11px]">
                                <Badge variant="outline" className="border-slate-200">
                                    Release date · 2025-11-15
                                </Badge>
                                <Badge variant="outline" className="border-slate-200">
                                    Version · v1.0.0
                                </Badge>
                                <Badge variant="outline" className="border-emerald-200 text-emerald-700">
                                    Status · Done
                                </Badge>
                            </div>
                            <p className="font-semibold text-slate-900">
                                Completed Multi-Platform Deployment & Major Backend Optimization
                            </p>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Successfully deployed FairStart across three environments: Vercel (frontend), AWS (backend cloud instance), and Raspberry Pi (self-hosted edge server).</li>
                                <li>Integrated DuckDNS for dynamic DNS routing, enabling stable public access to the self-hosted server.</li>
                                <li>Unified deployment workflow with consistent environment variables, reverse proxy rules, and logging standards.</li>
                                <li>Improved dashboard performance and loading states for multi-environment health checks.</li>
                                <li>Refactored backend modules for cleaner async handling and reduced cold-start latency.</li>
                                <li>Optimized AI prompt structure, reducing hallucinations and improving output formatting consistency.</li>
                                <li>Updated internal technical documentation (architecture, deployment steps, API references) to support future scalability and onboarding</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm lg:text-base">
                                <CalendarClock className="w-4 h-4 text-sky-500" />
                                Upcoming / Next Sprint
                            </CardTitle>
                            <CardDescription className="text-xs lg:text-sm">
                                Stabilizing Core Features & Expanding AI Resume Intelligence
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 text-xs lg:text-sm text-slate-700">
                            <p className="font-semibold text-slate-900">
                                Planned Tasks (Next version)
                            </p>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Enhance AI Resume Optimization Pipeline</li>
                                <li>Refine LangGraph workflows, improve structured output accuracy.</li>
                                <li>Develop Multi-Environment Monitoring Dashboard Create a system status panel to show real-time health indicators for Vercel, AWS, and Raspberry Pi deployments.</li>
                                <li>Strengthen Authentication & User Session Flow Improve JWT refresh logic, enhance error handling, and add UI indicators for token expiration or reconnection.</li>
                                <li>Write Internal Playbooks & Onboarding Materials Document coding conventions, component patterns, AI prompt guidelines, and deployment procedures.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                {/* Product Images / Auto Carousel */}
                <section className="space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-purple-500" />
                            Product Design Gallery
                        </h2>
                        <p className="text-sm text-slate-600">
                            A rotating gallery of UI mockups, product workflows, and design previews created during the FairStart build.
                        </p>
                    </div>

                    <Card className="border-slate-200 overflow-hidden">
                        <div className="relative bg-slate-900/80">
                            {/* 主图 */}
                            <div className="aspect-video w-full overflow-hidden">
                                <img
                                    key={activeShot.src}
                                    src={activeShot.src}
                                    alt={activeShot.title}
                                    className="w-full h-full object-cover transition-opacity duration-500"
                                />
                            </div>

                            {/* 渐变遮罩 + 文本信息 */}
                            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/30 to-transparent px-4 pb-4 pt-6">
                                <div className="hidden lg:flex flex-col gap-1">
                                    <p className="text-xs uppercase tracking-[0.18em] text-slate-200">
                                        DESIGN SNAPSHOT
                                    </p>
                                    <h3 className="text-sm lg:text-base font-semibold text-white">
                                        {activeShot.title}
                                    </h3>
                                    <p className="text-xs lg:text-sm text-slate-200/90">
                                        {activeShot.caption}
                                    </p>
                                </div>

                                {/* dots 导航 */}
                                <div className="mt-4 flex items-center justify-between gap-3">
                                    <div className="flex gap-2">
                                        {productShots.map((shot, index) => (
                                            <button
                                                key={shot.src}
                                                onClick={() => setActiveIndex(index)}
                                                className={`h-2.5 rounded-full transition-all ${
                                                    index === activeIndex
                                                        ? 'w-6 bg-white'
                                                        : 'w-2 bg-white/40 hover:bg-white/70'
                                                }`}
                                                aria-label={`Go to slide ${index + 1}`}
                                            />
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Timeline / Changelog list */}
                <section className="space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                            <History className="w-4 h-4 text-slate-500" />
                            Changelog timeline
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {/* Example release block – copy / edit for real history */}
                        <Card className="border-slate-200">
                            <CardHeader className="pb-3 flex flex-col gap-1">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Badge variant="outline" className="text-[10px]">
                                            2025-11-12
                                        </Badge>
                                        <Badge variant="outline" className="text-[10px] border-emerald-200 text-emerald-700">
                                            v0.0.1 · First prototype
                                        </Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-[10px]">
                                        <Badge variant="outline" className="border-slate-200">
                                            Frontend
                                        </Badge>
                                        <Badge variant="outline" className="border-slate-200">
                                            AI logic
                                        </Badge>
                                    </div>
                                </div>
                                <CardTitle className="text-sm lg:text-base">
                                    First end-to-end AI resume prototype
                                </CardTitle>
                                <CardDescription className="text-xs lg:text-sm">
                                    This release delivers the first end-to-end vertical slice of FairStart, connecting the React dashboard with the LangGraph-based backend workflow. For the first time, users can submit a resume and job description, trigger AI optimization, and see a structured result flow through the system.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2 text-xs lg:text-sm text-slate-700">
                                <div className="space-y-2">
                                    <p className="font-semibold text-slate-900">What we shipped</p>
                                    <ul className="list-disc pl-4 space-y-1">
                                        <li>Core Architecture Setup – Initialized repo, folder structure, base linting rules, and Dockerized dev environment to standardize local setup.</li>
                                        <li>Auth API + Login UI – Implemented JWT-based registration and login with protected routes on the frontend and secure token handling on the backend.</li>
                                        <li>Initial Dashboard & UX Shell – Added the first version of the dashboard layout, including dual input modes (form vs. upload), loading states, and basic status messaging for AI processing.</li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <p className="font-semibold text-slate-900">Notes & learnings</p>
                                    <ul className="list-disc pl-4 space-y-1">
                                        <li>Users struggle to write strong bullet points that match job requirements.</li>
                                        <li>Existing resume builders often lack deep AI reasoning and realistic HR-style feedback focused on hiring decisions.</li>
                                        <li>Many tools still cannot export clean, ATS-compliant formats that survive parsing systems.</li>
                                        <li>Users consistently express a desire for a workspace that both optimizes content and visualizes progress in a clear, guided way.</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Another placeholder block */}
                        <Card className="border-slate-200">
                            <CardHeader className="pb-3 flex flex-col gap-1">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Badge variant="outline" className="text-[10px]">
                                            2025-11-08
                                        </Badge>
                                        <Badge variant="outline" className="text-[10px] border-slate-200">
                                            v0.0.0 · Project kickoff
                                        </Badge>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className="flex items-center gap-1 text-[10px] border-sky-200 text-sky-700"
                                    >
                                        <GitBranch className="w-3 h-3" />
                                        Started on 2025-11-06
                                    </Badge>
                                </div>
                                <CardTitle className="text-sm lg:text-base">
                                    Kickoff Summary — FairStart Project Initiation
                                </CardTitle>
                                <CardDescription className="text-xs lg:text-sm">
                                    <p>
                                        The core project team met for the first time to officially kick off the FairStart AI-powered Resume Workspace. During this meeting, the team aligned on the project vision, clarified team roles and responsibilities, reviewed the expected scope, and documented the early roadmap. This marks the formal beginning of the product development cycle.
                                        <br />
                                        <br />
                                        Why This Project Started
                                        <br />
                                        FairStart was initiated to solve a critical user problem in the job application process:
                                        candidates struggle to build strong, ATS-compatible resumes, receive meaningful feedback, and iterate efficiently.
                                        The project aims to provide a visual, intelligent, export-ready resume builder powered by AI and a clean, modern UX.
                                        <br />
                                        <br />
                                        Initial Scope & Primary Goals
                                        <br />
                                        <br />
                                        Build a unified resume creation workspace integrating input → optimization → feedback → export.
                                        <br />
                                        <br />
                                        Support form-based inputs, resume parsing, and real-time AI enhancement.
                                        <br />
                                        <br />
                                        Provide an ATS-friendly preview and export to PDF / Word / Markdown.
                                        <br />
                                        <br />
                                        Design an architecture scalable for future additions (portfolio generator, job-matching engine, etc.).
                                    </p>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-xs lg:text-sm text-slate-700 space-y-2">
                                <p className="font-semibold text-slate-900">Initial setup checklist</p>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li>Frontend: React + Vite + Tailwind + Shadcn UI + Zustand (state)/Redux</li>
                                    <li>Backend: FastAPI + Python + LangGraph workflow + PostgreSQL</li>
                                    <li>Authentication: JWT (Access + Refresh), bcrypt password hashing</li>
                                    <li>DevOps / Tools: Docker, GitHub, Postman / Insomnia for API testing</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DashboardChangelog;
