import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, Send } from "lucide-react";

type Props = { isDark: boolean };

const SOCIALS = [
  { href: "https://www.linkedin.com/in/jimrex-raagas", label: "LinkedIn", Icon: Linkedin },
  { href: "https://www.instagram.com/u.jiimm", label: "Instagram", Icon: Instagram },
  { href: "https://www.facebook.com/jimrex.raagas", label: "Facebook", Icon: Facebook },
  { href: "https://t.me/u_jiimm", label: "Telegram", Icon: Send },
];

const DETAILS = [
  { Icon: Mail, label: "EMAIL", value: "jimrexraagas01@gmail.com" },
  { Icon: Phone, label: "PHONE", value: "+63 9054232699" },
  { Icon: MapPin, label: "LOCATION", value: "Bulacan, Philippines" },
];

const CRIMSON = "#B11226";
const CRIMSON_DARK = "#7A0F18";

export function ContactSection({ isDark }: Props) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || "AI Automation Inquiry");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:jimrexraagas01@gmail.com?subject=${subject}&body=${body}`;
  };

  // Glass tokens — subtle, premium
  const glassBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.65)";
  const glassBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const iconTileBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const iconTileBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  const mutedText = isDark ? "#B3B3B3" : "#5c5c5c";
  const primaryText = isDark ? "#F5F5F5" : "#111111";

  const inputBg = isDark ? "#111111" : "#ffffff";
  const inputBorderIdle = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";

  const inputBase =
    "w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-300 border placeholder:text-[#777]";

  const inputStyle = (key: string): React.CSSProperties => ({
    background: inputBg,
    borderColor: focused === key ? CRIMSON : inputBorderIdle,
    color: primaryText,
    boxShadow: focused === key ? `0 0 0 3px rgba(177,18,38,0.12)` : "none",
  });

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28 md:py-36"
      style={{
        background: isDark
          ? "linear-gradient(180deg, #090909 0%, #111111 100%)"
          : "linear-gradient(180deg, #f7f5f2 0%, #efece7 100%)",
        color: primaryText,
      }}
    >
      {/* Background layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {/* Faint grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: isDark
              ? "linear-gradient(rgba(177,18,38,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(177,18,38,0.06) 1px, transparent 1px)"
              : "linear-gradient(rgba(122,15,24,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(122,15,24,0.06) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, rgba(0,0,0,0.55) 55%, transparent 90%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, rgba(0,0,0,0.55) 55%, transparent 90%)",
          }}
        />
        {/* Soft crimson radial glow behind the form */}
        <div
          className="absolute"
          style={{
            top: "20%",
            right: "-10%",
            width: "60%",
            height: "70%",
            background:
              "radial-gradient(circle at center, rgba(177,18,38,0.14) 0%, rgba(177,18,38,0.05) 40%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)",
            opacity: isDark ? 0.9 : 0.25,
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <p
            className="uppercase font-semibold tracking-[0.4em] text-xs mb-4"
            style={{ color: CRIMSON }}
          >
            Get In Touch
          </p>
          <h2
            style={{
              fontFamily: "Anton, Impact, sans-serif",
              fontWeight: 700,
              letterSpacing: "1px",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.05,
              color: primaryText,
            }}
          >
            Let's Automate Your Business
          </h2>
          <div
            className="mx-auto mt-5 h-[2px] w-16 rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${CRIMSON}, transparent)` }}
          />
          <p
            className="mt-6 max-w-2xl mx-auto"
            style={{ color: mutedText, fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)", lineHeight: 1.6 }}
          >
            Have an automation project in mind? I'd love to help you build smarter systems
            for your business.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left: details + socials */}
          <div className="lg:col-span-2 space-y-10">
            <div className="space-y-5">
              <h3
                className="text-[11px] uppercase font-semibold tracking-[0.35em]"
                style={{ color: mutedText }}
              >
                Contact Details
              </h3>
              <div className="space-y-3">
                {DETAILS.map(({ Icon, label, value }) => (
                  <div
                    key={label}
                    className="group flex items-center gap-4 p-4 transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: glassBg,
                      border: `1px solid ${glassBorder}`,
                      borderRadius: 18,
                      backdropFilter: "blur(16px)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = CRIMSON;
                      e.currentTarget.style.boxShadow = "0 0 25px rgba(177,18,38,0.18)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = glassBorder;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      className="grid h-11 w-11 shrink-0 place-items-center"
                      style={{
                        background: iconTileBg,
                        border: `1px solid ${iconTileBorder}`,
                        borderRadius: 12,
                        color: CRIMSON,
                      }}
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-[10px] font-semibold tracking-[0.3em] uppercase"
                        style={{ color: mutedText }}
                      >
                        {label}
                      </p>
                      <p
                        className="mt-1 text-sm font-medium truncate"
                        style={{ color: primaryText }}
                      >
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="space-y-5">
              <h3
                className="text-[11px] uppercase font-semibold tracking-[0.35em]"
                style={{ color: mutedText }}
              >
                Follow Me
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: glassBg,
                      border: `1px solid ${glassBorder}`,
                      borderRadius: 14,
                      backdropFilter: "blur(16px)",
                      color: primaryText,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = isDark
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(255,255,255,0.9)";
                      e.currentTarget.style.borderColor = CRIMSON;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = glassBg;
                      e.currentTarget.style.borderColor = glassBorder;
                    }}
                  >
                    <Icon className="h-4 w-4" style={{ color: CRIMSON }} />
                    <span className="text-sm font-medium">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form panel */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3"
            style={{
              background: glassBg,
              border: `1px solid ${glassBorder}`,
              borderRadius: 24,
              backdropFilter: "blur(18px)",
              padding: "clamp(24px, 3vw, 36px)",
              boxShadow: isDark
                ? "0 30px 80px rgba(0,0,0,0.45)"
                : "0 20px 60px rgba(0,0,0,0.08)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  className="block text-[11px] uppercase font-semibold tracking-[0.25em] mb-2"
                  style={{ color: mutedText }}
                >
                  Name <span style={{ color: CRIMSON }}>*</span>
                </label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  placeholder="Enter your full name"
                  className={inputBase}
                  style={inputStyle("name")}
                />
              </div>
              <div>
                <label
                  className="block text-[11px] uppercase font-semibold tracking-[0.25em] mb-2"
                  style={{ color: mutedText }}
                >
                  Email <span style={{ color: CRIMSON }}>*</span>
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  placeholder="your@email.com"
                  className={inputBase}
                  style={inputStyle("email")}
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                className="block text-[11px] uppercase font-semibold tracking-[0.25em] mb-2"
                style={{ color: mutedText }}
              >
                Subject
              </label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                onFocus={() => setFocused("subject")}
                onBlur={() => setFocused(null)}
                placeholder="AI Automation Inquiry"
                className={inputBase}
                style={inputStyle("subject")}
              />
            </div>

            <div className="mt-5">
              <label
                className="block text-[11px] uppercase font-semibold tracking-[0.25em] mb-2"
                style={{ color: mutedText }}
              >
                Message <span style={{ color: CRIMSON }}>*</span>
              </label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                placeholder="Tell me about your business, the tasks you'd like to automate, or the systems you'd like to integrate."
                className={`${inputBase} resize-y min-h-[140px]`}
                style={inputStyle("message")}
              />
            </div>

            <button
              type="submit"
              className="mt-7 w-full inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 min-h-[52px]"
              style={{
                background: `linear-gradient(90deg, ${CRIMSON_DARK} 0%, ${CRIMSON} 100%)`,
                padding: "0.9rem 1.25rem",
                fontSize: "0.95rem",
                letterSpacing: "0.3px",
                boxShadow: "0 10px 30px rgba(177,18,38,0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(1.08)";
                e.currentTarget.style.boxShadow = "0 14px 40px rgba(177,18,38,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "none";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(177,18,38,0.25)";
              }}
            >
              <Send className="h-4 w-4" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
