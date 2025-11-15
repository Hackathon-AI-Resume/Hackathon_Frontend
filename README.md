🎨 YuKeSong Frontend Architecture

AI-powered resume workspace for job seekers · Visual · Downloadable · Actionable Feedback

⚛️ React SPA | 🎭 Simulated Progress UX | 📄 ATS-friendly Resume Generation | 🧠 HR-style Feedback | 🔐 JWT

<div align="center"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" width="110"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="90"/> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/512px-Tailwind_CSS_Logo.svg.png?20230715030042" width="110"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/axios/axios-plain.svg" width="90"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg" width="110"/> </div>
🎯 Project Overview

YuKeSong is an intelligent, visual, and exportable resume generation and optimization platform.
The frontend is more than just a resume form—it is a complete workstation built around:

“Resume input → AI optimization → Feedback visualization → Export to PDF/Word”

✨ Core Frontend Features & Architecture
1️⃣ Dual Input Modes (Form + Upload)
📌 Structured Form-based Resume Builder

Users fill in modules such as personal info, education, experience, projects, skills, etc.

Real-time validation for required fields, length, and basic formats

Automatic persistence to localStorage to prevent data loss on refresh

On submit, calls backend AI optimization API via Axios + JWT

Backend returns structured JSON → mapped to UI for real-time rendering

📌 Resume + JD Upload Mode

Supports uploading existing PDF/Word resumes

Supports pasting job descriptions (JD) as text

Frontend sends files and JD to backend Agents via Axios

Parsed and optimized structured data is fed directly into the UI and enters the same optimization/feedback flow

2️⃣ Custom Resume Preview Component (ResumePreview)

Built with React + Tailwind CSS:

Dynamically renders a complete resume based on backend JSON

Maintains clear hierarchy and layout, strictly ATS-friendly

Updates in real time (no page reload needed)

Supports one-click export to PDF / Word

Modular layout design, ready for future template/theme expansion

🧩 Final layout is rendered on the frontend; the backend focuses on generating content, not presentation.

3️⃣ HR Feedback Module (Simulated Recruiter Perspective)

Backend returns:

Overall match score

Role highlights and risk points

Suggestions per experience / section

Frontend visualizes these via a card-based feedback component:

Top-level overall score + tags (e.g., “Highly matched”, “Needs more quantification”)

Section-level suggestions under each experience entry

Tailwind-driven color system and visual hierarchy for readability

Goal: make users feel like they’re receiving feedback from a real HR / Hiring Manager, rather than raw LLM output.

4️⃣ Non-streaming Waiting Experience Optimization (Progress Simulation)

Because backend processing takes about 2–3 minutes, the frontend is designed to smooth out the waiting experience:

✔️ Simulated Progress Bar (Fake Progress Bar)

Progress stages:

Parsing resume…

Optimizing bullet points…

Evaluating JD fit…

Generating final summary…

✔️ Skeleton UI

Avoids blank loading screens

Improves perceived responsiveness

✔️ Animations + Step-wise Status Text

Provides psychological feedback and a sense of motion during waiting

⚠️ The frontend does not use true streaming responses; it uses simulated progressive UI to improve user experience.

🧱 Frontend Tech Stack
Technology	Purpose
React (JavaScript)	SPA architecture, component-based rendering
Tailwind CSS	Modern UI, responsive layout, theming
Axios	API calls, interceptors, JWT injection
JWT + localStorage	Frontend auth persistence
React Router	Client-side routing
LocalStorage cache	Auto-saving user input
Docker	Containerized frontend deployment
🔄 Frontend–Backend Interaction Flow (Mermaid)
graph TB
    U[User Interface<br/>React] --> F1[Select Mode<br/>Form / Upload Resume + JD]

    F1 --> F2[Fill in data or upload files]
    F2 --> F3[Trigger AI optimization]

    F3 --> P[Fake progress bar<br/>Step messages + Skeleton UI]
    F3 --> A[Axios + JWT calls FastAPI]

    A --> B[Backend multi-agent workflow<br/>LangGraph + DeepSeek + Qwen3]
    B --> C[Returns structured JSON<br/>Resume + score + suggestions]

    C --> V[ResumePreview<br/>Real-time rendering]
    C --> R[HR Feedback<br/>Display score and hints]

    V --> D[Click export PDF/Word]
    D --> S[Backend generates file → Frontend downloads]

⚙️ Frontend Engineering Practices

Follows React best practices for component design and state management

Axios interceptors for:

Auto-attaching JWT token

Unified error handling and user-friendly messaging

Layout reuse + Tailwind utility classes and abstraction to reduce duplication

Local caching:

Automatically saves form contents

Restores user data after refresh

Prevents duplicate submissions:

Buttons enter disabled state

Clear loading indicators and request state management

📄 Main Functional Modules

Personal Information

Education

Work Experience

Project Experience

Skills (auto formatting)

Certifications

Professional Summary

One-click export to PDF/Word

HR-style feedback view

Dual-mode resume creation: form-based and upload-based

🚀 Getting Started (React + Vite)
Clone the repo
git clone https://github.com/626-Legendary/ai-resume.git
cd ai-resume

Install dependencies
npm install

Run in development mode
npm run dev

Build for production
npm run build

📦 Deployment Options

Supported deployment methods:

Vercel (recommended)

Netlify

GitHub Pages

Docker deployment (with Nginx config)

Traditional servers using Nginx / Apache

🔒 Data Security

JWT-based frontend auth persistence

Axios interceptors auto-inject tokens

Frontend validation before submission

Proper CORS configuration for secure access