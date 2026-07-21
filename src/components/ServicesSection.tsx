import {
  Workflow,
  Bot,
  GitBranch,
  Plug,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

type Service = {
  n: string;
  title: string;
  desc: string;
  Icon: LucideIcon;
};

const SERVICES: Service[] = [
  {
    n: "01",
    title: "Workflow Automation",
    desc: "Automate repetitive tasks with smart workflows that save time, reduce errors, and improve productivity.",
    Icon: Workflow,
  },
  {
    n: "02",
    title: "AI Chatbots & Agents",
    desc: "Build AI-powered chatbots and agents that engage customers, answer inquiries, and work 24/7.",
    Icon: Bot,
  },
  {
    n: "03",
    title: "CRM Pipeline Management",
    desc: "Set up and optimize CRM pipelines with lead tracking, automated follow-ups, and booking systems.",
    Icon: GitBranch,
  },
  {
    n: "04",
    title: "API Integration",
    desc: "Connect your tools seamlessly using custom API integrations, webhooks, and real-time data synchronization.",
    Icon: Plug,
  },
  {
    n: "05",
    title: "Process Optimization",
    desc: "Optimize business processes by eliminating inefficiencies, improving productivity, and supporting sustainable growth.",
    Icon: TrendingUp,
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="services-section relative overflow-hidden py-24 md:py-32"
    >
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="services-grid absolute inset-0" />
        <div className="services-halo absolute left-1/2 top-0 -translate-x-1/2 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="services-eyebrow inline-block px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em]">
            Services
          </span>
          <h2
            className="services-title mt-6 font-black"
            style={{
              fontFamily: "Anton, Impact, sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "1px",
              lineHeight: 1.05,
            }}
          >
            Services
          </h2>
          <p className="services-lede mt-5 mx-auto max-w-2xl leading-relaxed text-base md:text-lg">
            Every automation is built for efficiency and scalability—integrating
            your systems, optimizing workflows, and leveraging AI to help your
            business grow smarter.
          </p>
        </div>

        {/* Cards Grid: 3 top, 2 centered bottom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-7">
          {SERVICES.map((s, idx) => {
            const isBottomRow = idx >= 3;
            const lgSpan = isBottomRow ? "lg:col-span-3" : "lg:col-span-2";
            const lgStart =
              idx === 3 ? "lg:col-start-1" : idx === 4 ? "lg:col-start-4" : "";
            return (
              <ServiceCard
                key={s.n}
                service={s}
                className={`${lgSpan} ${lgStart}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  className = "",
}: {
  service: Service;
  className?: string;
}) {
  const { n, title, desc, Icon } = service;
  return (
    <div
      className={`service-card group relative overflow-hidden rounded-2xl p-7 md:p-8 ${className}`}
    >
      {/* Animated glass border beam */}
      <span aria-hidden className="service-card__beam" />

      {/* Ambient inner glow */}
      <span aria-hidden className="service-card__glow" />

      {/* Number */}
      <span
        aria-hidden
        className="service-card__num absolute top-4 right-5 font-black select-none"
        style={{
          fontFamily: "Anton, Impact, sans-serif",
          fontSize: "clamp(2.5rem, 4vw, 3.75rem)",
          lineHeight: 1,
        }}
      >
        {n}
      </span>

      {/* Icon */}
      <div className="service-card__icon relative mb-6 grid place-items-center h-14 w-14 rounded-full">
        <Icon className="h-6 w-6 text-white" strokeWidth={2.2} />
      </div>

      {/* Text */}
      <h3 className="service-card__title relative font-bold text-lg md:text-xl mb-3">
        {title}
      </h3>
      <p className="service-card__desc relative text-sm md:text-[0.95rem] leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
