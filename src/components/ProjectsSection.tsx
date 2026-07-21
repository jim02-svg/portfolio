import { useState } from "react";
import { ArrowRight } from "lucide-react";
import appointmentSetterWorkflow from "@/assets/appointment-setter-workflow.png.asset.json";

type Project = {
  title: string;
  description: string;
  image?: string;
  alt?: string;
};

const PROJECTS: Project[] = [
  {
    title: "AI Voice Appointment Setter with Vapi",
    description:
      "An AI voice appointment setter built with Vapi that checks availability and manages bookings, updates, and cancellations automatically.",
    image: appointmentSetterWorkflow.url,
    alt: "AI Voice Appointment Setter workflow diagram",
  },
  { title: "Title 2", description: "Description 2" },
  { title: "Title 3", description: "Description 3" },
  { title: "Title 4", description: "Description 4" },
  { title: "Title 5", description: "Description 5" },
  { title: "Title 6", description: "Description 6" },
];

export function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const initial = PROJECTS.slice(0, 3);
  const extra = PROJECTS.slice(3);

  return (
    <section
      id="projects"
      className="projects-section relative overflow-hidden py-24 md:py-32"
    >
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="projects-grid absolute inset-0" />
        <div className="projects-halo absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header row */}
        <div className="flex items-center gap-6 md:gap-10 mb-12 md:mb-16">
          <h2
            className="projects-title font-black shrink-0"
            style={{
              fontFamily: "Anton, Impact, sans-serif",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              letterSpacing: "2px",
              lineHeight: 1,
            }}
          >
            PROJECTS
          </h2>
          <div className="projects-divider flex-1 h-px" />
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="projects-viewall group hidden sm:inline-flex items-center gap-3 text-xs md:text-sm font-bold uppercase tracking-[0.25em] shrink-0"
          >
            {showAll ? "Show Less" : "View All Projects"}
            <span
              className={`inline-grid place-items-center h-9 w-9 rounded-full border transition-transform duration-300 group-hover:translate-x-1 ${showAll ? "rotate-180" : ""}`}
            >
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
          {initial.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>

        {/* Extra row */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8 overflow-hidden transition-all duration-700 ease-out"
          style={{
            maxHeight: showAll ? "2000px" : "0px",
            opacity: showAll ? 1 : 0,
            transform: showAll ? "translateY(0)" : "translateY(-12px)",
            marginTop: showAll ? "2rem" : "0",
          }}
        >
          {extra.map((p, i) => (
            <div
              key={p.title}
              style={{
                transition: "opacity 600ms ease, transform 600ms ease",
                transitionDelay: showAll ? `${i * 100}ms` : "0ms",
                opacity: showAll ? 1 : 0,
                transform: showAll ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>

        {/* Mobile view all button */}
        <div className="sm:hidden mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="projects-viewall inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em]"
          >
            {showAll ? "Show Less" : "View All Projects"}
            <span
              className={`inline-grid place-items-center h-9 w-9 rounded-full border transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
            >
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card group relative rounded-2xl p-5">
      <div className="project-card__image relative overflow-hidden rounded-xl aspect-[4/3]" />

      <h3 className="project-card__title mt-6 font-bold text-lg md:text-xl tracking-wide uppercase">
        {project.title}
      </h3>
      <p className="project-card__desc mt-2 text-sm md:text-[0.95rem] uppercase tracking-[0.15em]">
        {project.description}
      </p>
    </div>
  );
}
