import { User, MapPin, Mail, Phone, Briefcase } from "lucide-react";

const PERSONAL_INFO = [
  {
    label: "NAME",
    value: "Jimrex Raagas",
    Icon: User,
    href: null,
  },
  {
    label: "LOCATION",
    value: "Bulacan, Philippines",
    Icon: MapPin,
    href: null,
  },
  {
    label: "EMAIL",
    value: "jimrexraagas01@gmail.com",
    Icon: Mail,
    href: "mailto:jimrexraagas01@gmail.com",
  },
  {
    label: "PHONE",
    value: "+639054232699",
    Icon: Phone,
    href: "tel:+639054232699",
  },
  {
    label: "STATUS",
    value: "Open to Work",
    Icon: Briefcase,
    href: null,
    badge: true,
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="about-section relative overflow-hidden py-24 md:py-32"
    >
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="about-grid absolute inset-0" />
        <div className="about-glow-1 absolute rounded-full" />
        <div className="about-glow-2 absolute rounded-full" />
        <div className="about-glow-3 absolute rounded-full" />
        <div className="about-card-glow absolute rounded-full" />
        <div className="about-vignette absolute inset-0" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-14 md:mb-18">
          <span className="about-eyebrow inline-block text-xs font-bold uppercase tracking-[0.35em]">
            GET TO KNOW ME
          </span>
          <h2
            className="about-title mt-5 font-black text-white"
            style={{
              fontFamily: "Anton, Impact, sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "2px",
              lineHeight: 1.05,
            }}
          >
            About Me
          </h2>
          <div className="about-underline mx-auto mt-5 h-1 w-20 rounded-full" />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column: Bio */}
          <div className="about-bio space-y-6 text-base md:text-lg leading-relaxed text-white/80">
            <p>
              I&apos;m{" "}
              <span className="about-highlight font-bold">Jimrex Raagas</span>,
              a{" "}
              <span className="about-highlight font-bold">
                Workflow and AI Automation Specialist
              </span>{" "}
              focused on helping businesses save time, reduce manual work, and
              grow faster through smart automation systems. I build automated
              workflows using tools like n8n, creating systems that handle
              repetitive tasks so you can focus on what matters most—running
              and growing your business.
            </p>
            <p>
              I believe automation should be easy to use, practical, and
              genuinely helpful—not overly complicated. That&apos;s why I focus on
              building clean, reliable, and scalable workflows that solve real
              business challenges.
            </p>
            <p>
              My goal is simple: to make your business more efficient,
              productive, and less stressful.
            </p>
            <p>
              Whether you&apos;re just getting started with automation or looking to
              improve your existing processes, I can help you create systems that
              save time, reduce manual work, and support your business growth.
            </p>
          </div>

          {/* Right column: Personal info */}
          <div className="about-info-card rounded-3xl p-8 md:p-10">
            <h3 className="about-info-title text-xl md:text-2xl font-bold text-white mb-8">
              Personal Info
            </h3>
            <div className="space-y-0">
              {PERSONAL_INFO.map((item) => (
                <div
                  key={item.label}
                  className="about-info-row grid grid-cols-[auto_1fr] items-center gap-6 py-5 border-b border-red-500/20 last:border-b-0"
                >
                  <div className="about-info-icon grid h-10 w-10 shrink-0 place-items-center rounded-xl">
                    <item.Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0 text-right">
                    <div className="about-info-label text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-1">
                      {item.label}
                    </div>
                    {item.badge ? (
                      <span className="about-status-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold">
                        <span className="about-status-dot h-2 w-2 rounded-full" />
                        {item.value}
                      </span>
                    ) : item.href ? (
                      <a
                        href={item.href}
                        className="about-info-link inline-block text-base md:text-lg font-medium transition-all duration-300 hover:brightness-110"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="about-info-value text-base md:text-lg font-medium text-white/90">
                        {item.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
