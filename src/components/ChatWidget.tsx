import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, ArrowUp } from "lucide-react";

const WEBHOOK_URL =
  "https://n8n.automatewithjim.com/webhook/728016fb-1c9b-4be8-ab68-c05a3d1be847/chat";

const WELCOME =
  "Hi! 👋 I'm Jimrex's assistant. Looking to automate your business? I can answer your questions.";

type Msg = { id: string; role: "user" | "assistant"; text: string };

function extractReply(data: unknown): string {
  if (typeof data === "string") return data;
  if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    for (const k of ["output", "text", "message", "reply", "answer", "response"]) {
      const v = o[k];
      if (typeof v === "string" && v.trim()) return v;
    }
    if (Array.isArray(data) && data.length) return extractReply(data[0]);
  }
  return "Sorry, I couldn't read that response.";
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { id: "welcome", role: "assistant", text: WELCOME },
  ]);
  const sessionId = useRef(
    `sess-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`,
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((m) => [...m, { id: `u-${Date.now()}`, role: "user", text }]);
    setLoading(true);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          chatInput: text,
          sessionId: sessionId.current,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const raw = await res.text();
      let reply: string;
      try {
        reply = extractReply(JSON.parse(raw));
      } catch {
        reply = raw.trim() || "Sorry, I couldn't read that response.";
      }
      setMessages((m) => [...m, { id: `a-${Date.now()}`, role: "assistant", text: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: `e-${Date.now()}`,
          role: "assistant",
          text: "⚠️ I couldn't reach the assistant right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-5 z-[70] grid h-14 w-14 place-items-center rounded-full border-2 border-[#9d1318] bg-white text-[#0a0a0a] shadow-[0_8px_25px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-105 dark:bg-[#0a0a0a] dark:text-white dark:shadow-[0_8px_25px_rgba(157,19,24,0.45)]"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat window */}
      <div
        className={`fixed z-[69] flex flex-col overflow-hidden rounded-2xl border border-[#9d1318]/50 bg-[#0f0f0f] text-white shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        } bottom-24 right-4 left-4 h-[70vh] max-h-[600px] sm:left-auto sm:right-5 sm:w-[400px]`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center gap-3 bg-gradient-to-r from-[#9d1318] to-[#b70000] px-4 py-3">
          <div>
            <p className="text-sm font-bold leading-tight">Jimrex's Assistant</p>
            <p className="flex items-center gap-1.5 text-xs text-white/90">
              <span className="inline-block h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.9)]" />
              Online
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="ml-auto grid h-8 w-8 place-items-center rounded-full text-white/90 transition hover:bg-white/15"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto px-4 py-4 pb-6"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-[#9d1318] text-white"
                    : "bg-white/8 text-white/90"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 rounded-2xl bg-white/8 px-4 py-3">
                {[0, 150, 300].map((d) => (
                  <span
                    key={d}
                    className="h-2 w-2 animate-bounce rounded-full bg-white/60"
                    style={{ animationDelay: `${d}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="shrink-0 border-t border-white/10 bg-[#0f0f0f] p-3">
          <div className="flex items-center gap-3">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              placeholder="Type a message..."
              className="max-h-28 min-h-[44px] flex-1 resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#9d1318] focus:outline-none"
            />
            <button
              onClick={() => void send()}
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#9d1318] text-white transition hover:bg-[#b70000] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
