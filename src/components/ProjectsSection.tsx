import { useState, useEffect } from "react";
import { ArrowRight, X } from "lucide-react";

type Project = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  image?: string;
  alt?: string;
  tech?: string[];
};

const PROJECTS: Project[] = [
  {
    title: "AI Voice Appointment Setter with Vapi",
    shortDescription:
      "An AI voice appointment setter built with Vapi that checks availability and manages bookings, updates, and cancellations automatically.",
    fullDescription:
      "This workflow powers an AI voice appointment setter built with Vapi and n8n, enabling users to manage appointments through natural voice conversations. The assistant can check available time slots, retrieve appointment details, create new bookings, update existing appointments, and process cancellations automatically.\n\nThe system synchronizes with Google Calendar to manage calendar events in real time and uses Google Sheets as a lightweight appointment database for tracking records. Input validation, error handling, timezone conversion, and automated responses ensure a smooth and reliable booking experience without manual intervention.\n\nCore Features\n\n📅 Get available time slots\n🔍 Check appointment information\n✅ Book new appointments\n✏️ Update existing appointments\n❌ Cancel appointments\n🔄 Google Calendar synchronization\n📊 Google Sheets record management\n🛡️ Input validation and error handling",
    image: "/appointment-setter-workflow.png",
    alt: "AI Voice Appointment Setter workflow diagram",
    tech: ["n8n", "Vapi", "Webhooks", "Calendar", "Sheets", "JavaScript"],
  },
  {
    title: "AI-Powered Local Business Lead Generation",
    shortDescription:
      "An automated lead generation workflow that collects businesses from Google Maps, analyzes website quality, extracts contact information, and saves qualified leads to Google Sheets.",
    fullDescription:
      "This workflow automates the process of finding and qualifying local business leads using Google Maps data. It begins by searching businesses based on user-defined keywords and location, then separates results into businesses with and without websites.\n\nFor businesses with websites, the workflow visits each site, evaluates its quality, extracts valuable contact information, and qualifies leads based on predefined criteria. Businesses without websites are also captured as potential prospects, making them ideal candidates for digital services. Finally, all qualified leads are organized and stored in Google Sheets for outreach and sales campaigns.\n\nCore Features\n\n 🔎 Search businesses from Google Maps\n\n 🌐 Detect website availability\n\n 📊 Analyze website quality\n\n 📧 Extract contact information\n\n ✅ Qualify leads automatically\n\n 📁 Save qualified leads to Google Sheets\n\n 🏢 Capture businesses without websites as potential prospects",
    image: "/lead-generation-workflow.png",
    alt: "AI-Powered Local Business Lead Generation workflow diagram",
    tech: ["n8n", "Apify", "Sheets", "JavaScript"],
  },
  {
    title: "AI Telegram Appointment Assistant",
    shortDescription:
      "An AI-powered Telegram assistant that automates appointment scheduling, calendar management, and reminder emails using Google Vertex AI, Google Calendar, and Google Sheets.",
    fullDescription:
      "This workflow enables an intelligent Telegram AI assistant that communicates with users through text or voice messages. Voice messages are automatically transcribed before being processed by the AI, allowing users to interact naturally.\n\nPowered by Google Vertex AI, the assistant can answer questions, check calendar availability, create, update, and cancel appointments, and manage customer records stored in Google Sheets. Responses are formatted before being sent back to Telegram for a clean user experience.\n\nThe workflow also includes an automated reminder system that generates personalized appointment reminder emails and delivers them through Gmail, helping reduce missed appointments and improve customer engagement.\n\nCore Features\n\n💬 Telegram text and voice support\n🎙️ Automatic voice transcription\n🤖 AI-powered conversational assistant\n📅 Appointment booking, updates, and cancellations\n🗓️ Google Calendar integration\n📊 Google Sheets customer record management\n📧 Automated appointment reminder emails\n✨ Response formatting for clean, readable replies",
    image: "/telegram-appointment-assistant.png",
    alt: "AI Telegram Appointment Assistant workflow diagram",
    tech: ["n8n", "Telegram", "Webhook", "Gmail", "Sheets", "Calendar", "AI Agent", "JavaScript"],
  },
  {
    title: "AI-Powered Google Drive File Organizer",
    shortDescription:
      "An AI-driven workflow that automatically analyzes uploaded files, determines the appropriate destination, and organizes them into the correct Google Drive folders.",
    fullDescription:
      "This workflow automates document organization in Google Drive using AI-powered content analysis. Whenever a new file is uploaded, the workflow downloads and analyzes the document to understand its contents. An AI agent then determines the most appropriate folder based on the document's context and classification.\n\nIf the target folder already exists, the file is moved directly into it. If no matching folder is found, the workflow automatically creates a new folder before moving the file. This ensures documents remain organized without requiring manual sorting, making it ideal for managing large volumes of files efficiently.\n\nCore Features\n\n📂 Automatically detects new Google Drive uploads\n🤖 AI-powered document analysis and classification\n🗂️ Identifies the correct destination folder\n➕ Creates folders automatically when needed\n📁 Moves files to the appropriate location\n⚡ Eliminates manual file organization",
    image: "/google-drive-file-organizer.png",
    alt: "AI-Powered Google Drive File Organizer workflow diagram",
    tech: ["n8n", "Drive", "AI Agent"],
  },
  {
    title: "AI Facebook Messenger Customer Support Agent",
    shortDescription:
      "An AI-powered Facebook Messenger chatbot that automatically responds to customer inquiries using a knowledge base and conversational AI.",
    fullDescription:
      "This workflow automates customer support for a Facebook Page by responding to incoming Messenger conversations with an AI-powered assistant. When a user sends a message, the Facebook webhook triggers the workflow. A verification step validates the webhook request to ensure only authorized Facebook events are processed.\n\nIncoming events are then filtered so only valid customer messages continue through the workflow. The chatbot retrieves relevant information from a Google Docs knowledge base, which provides context for the AI agent to generate accurate and helpful responses. The AI also maintains conversation history to deliver more natural, context-aware interactions throughout the chat.\n\nFinally, the generated response is sent back to the customer through Facebook Messenger, enabling businesses to provide instant, automated support without manual intervention.\n\nCore Features\n\n💬 Automatically responds to Facebook Messenger inquiries\n🔐 Webhook verification for secure Facebook integration\n📨 Filters incoming events to process only valid user messages\n📚 Uses Google Docs as a dynamic knowledge base\n🤖 AI-powered, context-aware conversations\n🧠 Maintains conversation history for better responses\n⚡ Instantly replies to customers through Facebook Messenger",
    image: "/facebook-messenger-support-agent.png",
    alt: "AI Facebook Messenger Customer Support Agent workflow diagram",
    tech: ["n8n", "Facebook", "Docs", "Webhook"],
  },
  {
    title: "Invoice Follow-Up System",
    shortDescription:
      "An automated workflow that monitors overdue invoices, sends scheduled payment reminders, escalates long-overdue accounts, and logs all actions in Google Sheets.",
    fullDescription:
      "This workflow automates the invoice follow-up process by checking outstanding invoices on a daily schedule. Every morning, it reads invoice records from Google Sheets, identifies overdue payments, and calculates the number of days each invoice has been overdue.\n\nBased on configurable overdue thresholds, the workflow routes each invoice into the appropriate reminder stage. Customers receive a first or second payment reminder via Gmail, while invoices that remain unpaid for an extended period are automatically escalated. During escalation, an additional notification is sent to the assigned freelancer or account manager to prompt further action.\n\nEvery reminder and escalation is recorded in Google Sheets, providing a complete audit trail of payment communications and ensuring consistent, automated accounts receivable management.\n\nCore Features\n\n⏰ Daily automated invoice monitoring\n📄 Reads invoice data from Google Sheets\n📅 Calculates overdue days automatically\n📧 Sends first and second payment reminders\n🚨 Escalates long-overdue invoices\n👤 Notifies assigned freelancer or account manager\n📊 Logs all reminders and escalation status in Google Sheets",
    image: "/invoice-follow-up-system.png",
    alt: "Invoice Follow-Up System workflow diagram",
    tech: ["n8n", "Sheets", "Gmail", "JavaScript"],
  },
];

export function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const initial = PROJECTS.slice(0, 3);
  const extra = PROJECTS.slice(3);

  useEffect(() => {
    if (!activeProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProject(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeProject]);

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
            <ProjectCard key={p.title} project={p} onOpen={() => setActiveProject(p)} />
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
              <ProjectCard project={p} onOpen={() => setActiveProject(p)} />
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

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="project-card group relative rounded-2xl p-5 cursor-pointer text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60"
    >
      <div className="project-card__image relative overflow-hidden rounded-xl aspect-[4/3]">
        {project.image ? (
          <img
            src={project.image}
            alt={project.alt ?? project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            style={{ objectPosition: "center center" }}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-red-950/40 to-black/60" />
        )}
      </div>

      <h3 className="project-card__title mt-6 font-bold text-lg md:text-xl tracking-tight normal-case text-white">
        {project.title}
      </h3>
      <p className="project-card__desc mt-2 text-sm md:text-[0.95rem] normal-case tracking-normal leading-relaxed text-white/70 line-clamp-2">
        {project.shortDescription}
      </p>

      {project.tech && project.tech.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full text-xs font-medium bg-red-950/30 text-red-300 border border-red-500/20 backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl border border-red-500/30 bg-[#0d1117]/95 shadow-[0_0_60px_-10px_rgba(239,68,68,0.35)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "modalIn 220ms ease-out" }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 grid place-items-center h-10 w-10 rounded-full bg-black/60 text-white hover:bg-red-600/80 border border-white/10 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex-shrink-0 overflow-hidden bg-black/40 p-1 rounded-t-xl" style={{ height: "70%", maxHeight: "70vh" }}>
          {project.image ? (
            <img
              src={project.image}
              alt={project.alt ?? project.title}
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <div className="w-full h-full grid place-items-center text-white/40">
              No preview available
            </div>
          )}
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-3">
            <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight normal-case">
              {project.title}
            </h3>
            <p className="text-white/70 text-sm md:text-base leading-relaxed normal-case whitespace-pre-line">
              {project.fullDescription}
            </p>

            {project.tech && project.tech.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-300 border border-red-500/30"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
