import React from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import SectionIntro from "./SectionIntro.jsx";

const faqItems = [
  {
    value: "item-1",
    question: "Why use an AI resume builder instead of editing manually?",
    answer:
      "Manual editing works, but it is slow and easy to miss what a role is really asking for. FairStart helps you target the role faster, sharpen weak bullets, and keep your resume structured for ATS systems.",
  },
  {
    value: "item-2",
    question: "Will the resume feel obviously AI-written?",
    answer:
      "That is exactly what we try to avoid. The goal is stronger phrasing based on your actual experience, not generic language or inflated claims that feel copied from a template.",
  },
  {
    value: "item-3",
    question: "How does FairStart tailor a resume to a job description?",
    answer:
      "The product scans the job post, identifies important requirements, compares them against your resume, and then guides updates so the final document reflects the role more clearly without keyword stuffing.",
  },
  {
    value: "item-4",
    question: "Can I improve an existing resume instead of starting over?",
    answer:
      "Yes. You can upload what you already have, review the feedback, and iterate from there. FairStart is designed to help refine a working draft, not just generate one from scratch.",
  },
];

const FAQ = () => {
  return (
    <section id="faqSection" className="home-section border-b-0">
      <div className="home-container">
        <SectionIntro
          eyebrow="FAQ"
          title="Questions people usually ask before they trust the workflow"
          description="A good resume tool should be easy to understand before you commit to it. These answers focus on what the product actually helps with in practice."
        />

        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full max-w-4xl space-y-4"
          defaultValue="item-1"
        >
          {faqItems.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className="home-panel-soft overflow-hidden px-5 sm:px-6"
            >
              <AccordionTrigger className="py-5 text-base font-semibold text-white hover:no-underline hover:text-cyan-100 sm:text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-7 text-slate-300 sm:text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="home-panel-soft mx-auto mt-12 flex max-w-4xl flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-100">
              Ready to try it
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Open the dashboard and run a real resume through the workflow to
              see how the feedback feels on your own material.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full border border-cyan-300/20 bg-cyan-300 px-6 text-slate-950 hover:bg-cyan-200"
          >
            <Link to="/dashboard">Open dashboard</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
