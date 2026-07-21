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

  const cardBg = isDark
    ? "linear-gradient(160deg, rgba(20,8,10,0.65) 0%, rgba(30,6,10,0.5) 100%)"
    : "linear-gradient(160deg, rgba(255,255,255,0.8) 0%, rgba(255,240,242,0.65) 100%)";
  const cardBorder = isDark ? "rgba(183,0,0,0.25)" : "rgba(157,19,24,0.18)";

  const inputBg = isDark ? "rgba(10,10,15,0.75)" : "rgba(255,255,255,0.85)";
  const inputBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  const inputBase =
    "w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-300 border";

  const inputStyle = (key: string): React.CSSProperties => ({
    background: inputBg,
    borderColor: focused === key ? "#b70000" : inputBorder,
    color: isDark ? "#fff" : "#0a0a0a",
    boxShadow:
      focused === key
        ? "0 0 0 3px rgba(183,0,0,0.18), 0 0 20px rgba(183,0,0,0.25)"
        : "none",
  });

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 md:py-28"
      style={{
        background: isDark ? "#0a0a0a" : "#f7f5f2",
        color: isDark ? "#fff" : "#0a0a0a",
      }}
    >
      {/* Background (matches Hero) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: isDark
              ? "linear-gradient(rgba(183,0,0,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(183,0,0,0.18) 1px, transparent 1px)"
              : "linear-gradient(rgba(157,19,24,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(157,19,24,0.12) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, rgba(0,0,0,0.5) 55%, transparent 88%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, rgba(0,0,0,0.5) 55%, transparent 88%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 55% at 50% 40%, rgba(183,0,0,0.20) 0%, rgba(157,19,24,0.08) 45%, rgba(0,0,0,0) 75%)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 md:px-12">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="uppercase font-bold tracking-[0.35em] text-[#b70000] text-xs md:text-sm mb-3"
          >
            Get In Touch
          </p>
          <h2
            style={{
              fontFamily: "Anton, Impact, sans-serif",
              fontWeight: 800,
              letterSpacing: "1.5px",
              fontSize: "clamp(2rem, 5vw, 3.75rem)",
              lineHeight: 1.05,
            }}
          >
            Let's Automate Your Business
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-[#b70000]" />
          <p
            className={`mt-5 max-w-2xl mx-auto ${isDark ? "text-white/70" : "text-neutral-700"}`}
            style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)" }}
          >
            Have an automation project in mind? I'd love to help you build smarter systems
            for your business.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Contact details */}
          <div className="lg:col-span-2 space-y-6">
            <h3
              className="text-xl font-bold"
              style={{ letterSpacing: "0.5px" }}
            >
              Contact Details
            </h3>
            <div className="space-y-4">
              {DETAILS.map(({ Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-xl border p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(183,0,0,0.18)]"
                  style={{ background: cardBg, borderColor: cardBorder }}
                >
                  <div
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border"
                    style={{
                      borderColor: "rgba(183,0,0,0.5)",
                      background: isDark ? "rgba(183,0,0,0.08)" : "rgba(183,0,0,0.06)",
                      color: "#b70000",
                      boxShadow: "0 0 20px rgba(183,0,0,0.15)",
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold tracking-[0.25em] text-[#b70000]">
                      {label}
                    </p>
                    <p
                      className={`mt-1 font-medium truncate ${isDark ? "text-white" : "text-neutral-900"}`}
                    >
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border px-4 py-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b70000] hover:shadow-[0_10px_28px_rgba(183,0,0,0.28)]"
                  style={{ background: cardBg, borderColor: cardBorder }}
                >
                  <Icon className="h-4 w-4 text-[#b70000]" />
                  <span className={`text-sm font-semibold ${isDark ? "text-white" : "text-neutral-900"}`}>
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-2xl border p-6 md:p-8 backdrop-blur-md"
            style={{ background: cardBg, borderColor: cardBorder }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Name <span className="text-[#b70000]">*</span>
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
                <label className="block text-sm font-semibold mb-2">
                  Email <span className="text-[#b70000]">*</span>
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
              <label className="block text-sm font-semibold mb-2">Subject</label>
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
              <label className="block text-sm font-semibold mb-2">
                Message <span className="text-[#b70000]">*</span>
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
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-md font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(183,0,0,0.55)] min-h-[48px]"
              style={{
                background: "linear-gradient(135deg, #b70000 0%, #7c0000 100%)",
                padding: "0.85rem 1.25rem",
                fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                letterSpacing: "0.5px",
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