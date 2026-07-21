import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Download,
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  Facebook,
  Send,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import portraitAsset from "@/assets/portrait.png.asset.json";
import { PortraitEmbers } from "@/components/PortraitEmbers";
import { ServicesSection } from "@/components/ServicesSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";

export const Route = createFileRoute("/")({
  component: Index,
});

const NAV_ITEMS = [
  { id: "about", label: "About Me" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Sample Work" },
  { id: "contact", label: "Contact" },
];

const SERVICES = [
  "Workflow Automation",
  "AI Chatbots & Agents",
  "CRM Pipeline Management",
  "Process Optimization",
  "API Integration",
];


const SOCIALS = [
  { href: "https://www.linkedin.com/in/jimrex-raagas", label: "LinkedIn", Icon: Linkedin },
  { href: "https://www.instagram.com/u.jiimm", label: "Instagram", Icon: Instagram },
  { href: "https://www.facebook.com/jimrex.raagas", label: "Facebook", Icon: Facebook },
  { href: "https://t.me/u_jiimm", label: "Telegram", Icon: Send },
];

const CV_URL =
  "https://drive.google.com/file/d/1I0jWUtBtFv_PxOSksPjoD1Pydyhr1_vG/view?usp=drive_link";

function Index() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [active, setActive] = useState<string>("about");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [mounted, setMounted] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = SERVICES[roleIndex];
    if (!deleting && typed === current) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (deleting && typed === "") {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % SERVICES.length);
      return;
    }
    const t = setTimeout(
      () => {
        setTyped((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
        );
      },
      deleting ? 40 : 80,
    );
    return () => clearTimeout(t);
  }, [typed, deleting, roleIndex]);


  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);

  // Subtle mouse parallax for the red oval ring (desktop only).
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    const el = document.querySelector<HTMLElement>(".portrait-ring-parallax");
    if (!el) return;
    const MAX = 12; // px
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      tx = nx * MAX;
      ty = ny * MAX;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  useEffect(() => {
    let disposed = false;
    (async () => {
      // Inject n8n chat stylesheet
      if (!document.getElementById("n8n-chat-css")) {
        const link = document.createElement("link");
        link.id = "n8n-chat-css";
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
        document.head.appendChild(link);
      }
      if (disposed) return;
      const { createChat } = await import("@n8n/chat");
      createChat({
        webhookUrl:
          "https://n8n.automatewithjim.com/webhook/fbea4072-c708-4ed4-addb-fa34ac68456b/chat",
        webhookConfig: { method: "POST", headers: {} },
        target: "#n8n-chat",
        mode: "window",
        chatInputKey: "chatInput",
        chatSessionKey: "sessionId",
        loadPreviousSession: true,
        showWelcomeScreen: false,
        enableStreaming: true,
        defaultLanguage: "en",
        initialMessages: [
          "Hi! 👋 I'm Jimrex's assistant. Looking to automate your business? I can answer your questions.",
        ],
        i18n: {
          en: {
            title: "Jimrex's Assistant",
            subtitle: "🟢 Online",
            footer: "",
            getStarted: "New Conversation",
            inputPlaceholder: "Type a message...",
            closeButtonTooltip: "Close chat",
          },
        },
      });
    })();
    return () => {
      disposed = true;
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    NAV_ITEMS.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === "dark";

  return (
    <div
      className={
        isDark
          ? "min-h-screen bg-[#0a0a0a] text-white"
          : "min-h-screen bg-[#f7f5f2] text-neutral-900"
      }
      style={{ transition: "background-color 500ms ease, color 500ms ease" }}
    >
      {/* NAVBAR (desktop) */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 backdrop-blur-md bg-black/20">
        <div className="w-full flex items-center justify-end gap-4 md:gap-8">
          <ul className="hidden md:flex items-center gap-6 lg:gap-10">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`nav-link group relative uppercase text-sm font-semibold tracking-widest transition-colors duration-300 ${
                      isDark
                        ? "text-white hover:text-[#b70000]"
                        : "text-neutral-900 hover:text-[#9d1318]"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute left-0 -bottom-2 h-0.5 bg-[#b70000] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
            className={`relative h-10 w-10 md:h-11 md:w-11 rounded-full border-2 flex items-center justify-center transition-all duration-500 hover:scale-110 ${
              isDark
                ? "border-[#b70000] text-[#b70000] hover:shadow-[0_0_20px_rgba(183,0,0,0.5)]"
                : "border-[#9d1318] text-[#9d1318] hover:shadow-[0_0_20px_rgba(157,19,24,0.5)]"
            }`}
          >
            <Sun
              className={`h-5 w-5 absolute transition-all duration-500 ${
                isDark ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
              }`}
            />
            <Moon
              className={`h-5 w-5 absolute transition-all duration-500 ${
                !isDark ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
              }`}
            />
          </button>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileNavOpen((v) => !v)}
            aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileNavOpen}
            className={`md:hidden relative h-10 w-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              isDark
                ? "border-[#b70000] text-[#b70000] bg-black/60 hover:shadow-[0_0_20px_rgba(183,0,0,0.55)]"
                : "border-[#9d1318] text-[#9d1318] bg-white/70 hover:shadow-[0_0_20px_rgba(157,19,24,0.45)]"
            }`}
          >
            <Menu
              className={`h-5 w-5 absolute transition-all duration-300 ${
                mobileNavOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <X
              className={`h-5 w-5 absolute transition-all duration-300 ${
                mobileNavOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* MOBILE FLOATING DROPDOWN PANEL */}
      {mobileNavOpen && (
        <div
          className="md:hidden fixed inset-0 z-[55]"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        role="menu"
        aria-hidden={!mobileNavOpen}
        className={`md:hidden fixed top-20 right-4 z-[60] w-[240px] rounded-[20px] p-5 backdrop-blur-xl border transition-all duration-300 ease-in-out origin-top-right ${
          mobileNavOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-3 scale-95 pointer-events-none"
        }`}
        style={{
          background: isDark
            ? "linear-gradient(160deg, rgba(15,4,6,0.92) 0%, rgba(60,8,12,0.88) 100%)"
            : "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(255,225,228,0.9) 100%)",
          borderColor: isDark ? "rgba(183,0,0,0.45)" : "rgba(157,19,24,0.35)",
          boxShadow: isDark
            ? "0 12px 40px rgba(0,0,0,0.55), 0 0 20px rgba(183,0,0,0.25)"
            : "0 12px 40px rgba(157,19,24,0.18), 0 0 16px rgba(157,19,24,0.15)",
        }}
      >
        <ul className="flex flex-col items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="w-full">
                <a
                  href={`#${item.id}`}
                  onClick={() => setMobileNavOpen(false)}
                  className={`block w-full text-center uppercase text-sm font-semibold tracking-[0.2em] py-3 rounded-lg transition-all duration-200 active:scale-95 ${
                    isActive
                      ? "text-[#b70000]"
                      : isDark
                        ? "text-white hover:text-[#b70000] hover:bg-white/5"
                        : "text-neutral-900 hover:text-[#9d1318] hover:bg-black/5"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>



      {/* HERO */}
      <section
        id="about"
        className="relative overflow-hidden w-full flex items-center justify-center min-h-screen lg:h-screen pt-24 pb-12 md:pt-28 md:pb-10 lg:pt-[clamp(80px,10vh,120px)] lg:pb-[clamp(16px,3vh,40px)]"
      >
        {/* Grid + red radial glow background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ zIndex: 0 }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: isDark
                ? "linear-gradient(rgba(183,0,0,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(183,0,0,0.22) 1px, transparent 1px)"
                : "linear-gradient(rgba(157,19,24,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(157,19,24,0.14) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 45%, black 0%, rgba(0,0,0,0.6) 50%, transparent 88%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 45%, black 0%, rgba(0,0,0,0.6) 50%, transparent 88%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 55% at 50% 45%, rgba(183,0,0,0.28) 0%, rgba(157,19,24,0.12) 40%, rgba(0,0,0,0) 75%)",
            }}
          />
        </div>

        {/* Particle embers emitting from the portrait frame */}
        <PortraitEmbers emitterSelector=".portrait-inner-frame" />

        {/* Subtle ambient glow behind the portrait */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{ zIndex: -1 }}
        >
          <div
            style={{
              width: "clamp(280px, 38vw, 560px)",
              height: "clamp(280px, 38vw, 560px)",
              borderRadius: "9999px",
              background:
                "radial-gradient(circle at center, rgba(183,0,0,0.12) 0%, rgba(157,19,24,0.06) 45%, rgba(157,19,24,0) 72%)",
              filter: "blur(60px)",
              animation: "tracking-glow 12s ease-in-out infinite",
            }}
          />
        </div>

        <div className="relative max-w-[110rem] mx-auto w-full px-5 sm:px-8 md:px-12 flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-10 lg:gap-8 items-center">

          {/* PORTRAIT — appears first on mobile/tablet, middle column on desktop */}
          <div className="order-1 lg:order-2 lg:col-span-5 relative z-[25] flex justify-center items-center w-full">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-visible"
              style={{ zIndex: 1 }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  width: "clamp(200px, 32vw, 420px)",
                  height: "clamp(200px, 32vw, 420px)",
                  top: "8%",
                  left: "-10%",
                  background: "#9d1318",
                  opacity: 0.05,
                  filter: "blur(80px)",
                  animation: "blob-float-1 18s ease-in-out infinite",
                }}
              />
              <div
                className="absolute rounded-full"
                style={{
                  width: "clamp(180px, 28vw, 380px)",
                  height: "clamp(180px, 28vw, 380px)",
                  bottom: "5%",
                  right: "-8%",
                  background: "#b70000",
                  opacity: 0.04,
                  filter: "blur(80px)",
                  animation: "blob-float-2 20s ease-in-out infinite",
                }}
              />
            </div>

            <div
              className="relative mx-auto w-[72vw] max-w-[300px] aspect-[3/4] sm:w-[55vw] sm:max-w-[360px] md:w-[46vw] md:max-w-[420px] lg:aspect-auto lg:w-full lg:max-w-[min(540px,41vw)] lg:h-[clamp(340px,68vh,610px)]"
            >
              <div
                aria-hidden
                className="portrait-ring-parallax absolute inset-0"
                style={{ transform: "translate3d(0,0,0)" }}
                onPointerDown={(e) => {
                  window.dispatchEvent(new Event("portrait-ember-burst"));
                }}
              >
                <div className="portrait-outer-ring" />
              </div>
              <div className="portrait-inner-frame">
                <img
                  src={portraitAsset.url}
                  alt="Jimrex Raagas portrait"
                  className="relative z-[2] w-full h-full object-cover object-top animate-fade-in"
                  style={{
                    filter: isDark
                      ? "saturate(0.9) drop-shadow(0 20px 30px rgba(0,0,0,0.6))"
                      : "brightness(1.05) contrast(0.98) saturate(0.9)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* LEFT TEXT COLUMN */}
          <div
            className="order-2 lg:order-1 lg:col-span-5 z-20 animate-fade-in relative flex flex-col items-center text-center lg:items-start lg:text-left lg:self-center w-full lg:mt-[clamp(80px,14vh,160px)]"
          >
            <p
              className="mb-1"
              style={{
                fontFamily: "'Great Vibes', cursive",
                color: isDark ? "#fff" : "#1a1a1a",
                fontSize: "clamp(1.25rem, 2.6vw, 2.25rem)",
              }}
            >
              Hello, I'm
            </p>
            <h1
              style={{
                fontFamily: "Anton, Impact, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 6.2vw, 5.5rem)",
                letterSpacing: "2px",
                lineHeight: 1.02,
                marginBottom: "clamp(0.5rem, 1.4vh, 0.875rem)",
                color: isDark ? "#fff" : "#0a0a0a",
              }}
            >
              JIMREX
              <br />
              RAAGAS
            </h1>

            <div
              className="font-semibold"
              style={{
                marginBottom: "clamp(0.5rem, 1.4vh, 0.875rem)",
                minHeight: "1.8em",
                color: "#9d1318",
                fontSize: "clamp(0.95rem, 1.6vw, 1.35rem)",
                textShadow: isDark
                  ? "0 2px 8px rgba(0,0,0,0.9), 0 0 12px rgba(183,0,0,0.35)"
                  : "0 1px 2px rgba(255,255,255,0.8)",
              }}
              aria-live="polite"
            >
              <span>{typed}</span>
              <span
                aria-hidden
                style={{
                  display: "inline-block",
                  marginLeft: "2px",
                  animation: "caret-blink 1s steps(1) infinite",
                }}
              >
                |
              </span>
            </div>

            <p
              className={`leading-relaxed max-w-md ${
                isDark ? "text-white/75" : "text-neutral-700"
              }`}
              style={{
                fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
                marginBottom: "clamp(0.75rem, 1.8vh, 1.125rem)",
              }}
            >
              I design and build AI automation systems using n8n and API integrations
              that reduce manual work, save time, generate more leads, lower operational
              costs, and help businesses scale faster.
            </p>

            <div
              className="flex flex-wrap justify-center lg:justify-start gap-3 w-full"
              style={{ marginBottom: "clamp(0.5rem, 1.4vh, 0.875rem)" }}
            >
              <a
                href={CV_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-md bg-[#b70000] font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#9d0000] hover:shadow-[0_10px_30px_rgba(183,0,0,0.5)] min-h-[44px]"
                style={{ padding: "0.65rem 1.25rem", fontSize: "clamp(0.85rem, 1.1vw, 1rem)" }}
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
              <a
                href="mailto:jimrexraagas01@gmail.com"
                className="mail-beam-btn group inline-flex items-center gap-2 rounded-md font-bold min-h-[44px]"
                style={{ padding: "0.65rem 1.25rem", fontSize: "clamp(0.85rem, 1.1vw, 1rem)" }}
              >
                <Mail className="h-4 w-4" />
                Mail Me
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <div className="flex items-center gap-2 order-1 lg:order-2">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid h-10 w-10 lg:h-9 lg:w-9 place-items-center rounded-md border border-[#b70000] text-[#b70000] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b70000] hover:text-white hover:shadow-[0_0_18px_rgba(183,0,0,0.6)]"
                  >
                    <Icon className="h-4 w-4 lg:h-3.5 lg:w-3.5" />
                  </a>
                ))}
              </div>
              <div
                className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs order-2 lg:order-1 ${
                  isDark
                    ? "border-white/10 bg-black/50 text-white"
                    : "border-black/10 bg-white text-neutral-900"
                }`}
              >
                <MapPin className="h-3.5 w-3.5 text-[#b70000]" />
                Bulacan, Philippines
              </div>
            </div>
          </div>

          {/* STATS — right column on desktop, below content on tablet/mobile */}
          <div className="order-3 lg:col-span-2 z-20 flex flex-row lg:flex-col justify-center lg:justify-start gap-6 sm:gap-10 lg:gap-8 lg:ml-auto lg:items-end lg:text-right lg:pr-2 lg:mt-[26vh] w-full lg:w-auto">
            {[
              { n: "6+", label: "MONTHS OF\nEXPERIENCE" },
              { n: "20+", label: "PROJECTS\nCOMPLETED" },
            ].map((s, i) => (
              <div key={s.n} className="group">
                <div className="flex items-center gap-3 transition-transform duration-300 group-hover:scale-105">
                  <span
                    className="font-black text-[#b70000] leading-none"
                    style={{
                      fontFamily: "Anton, Impact, sans-serif",
                      fontSize: "clamp(1.75rem, 3.2vw, 3rem)",
                      textShadow: "0 0 24px rgba(183,0,0,0.45)",
                    }}
                  >
                    {s.n}
                  </span>
                  <span
                    className={`font-semibold uppercase whitespace-pre-line tracking-widest ${
                      isDark ? "text-white/80" : "text-neutral-800"
                    }`}
                    style={{ fontSize: "clamp(0.6rem, 0.8vw, 0.8rem)" }}
                  >
                    {s.label}
                  </span>
                </div>
                {i === 0 && (
                  <div
                    className={`hidden lg:block mt-4 h-px w-full ${isDark ? "bg-white/15" : "bg-black/15"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


      <ServicesSection />
      <ProjectsSection />
      <ContactSection isDark={isDark} />

      <div id="n8n-chat" />
    </div>
  );
}