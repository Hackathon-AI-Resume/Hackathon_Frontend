import React from "react";
import { cn } from "@/lib/utils";

const alignmentClasses = {
  center: "mx-auto items-center text-center",
  left: "items-start text-left",
};

const SectionIntro = ({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}) => {
  return (
    <div
      className={cn(
        "mb-12 flex max-w-3xl flex-col sm:mb-16",
        alignmentClasses[align] ?? alignmentClasses.center,
        className
      )}
    >
      {eyebrow ? <span className="home-kicker">{eyebrow}</span> : null}
      <h2 className="home-section-title mt-5">{title}</h2>
      {description ? <p className="home-section-copy">{description}</p> : null}
    </div>
  );
};

export default SectionIntro;
