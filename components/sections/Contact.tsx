"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

// Safe to ship in client code — Web3Forms access keys are routing keys, not secrets.
// Set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local (dev) and in your Vercel env vars (prod).
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

export default function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Graceful degradation when the env var hasn't been set yet.
    if (!WEB3FORMS_KEY) {
      setErrorMsg(
        `Form not configured — email ${profile.email} directly and I'll reply within 24 h.`
      );
      setState("error");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    const senderName = String(data.get("name") ?? "Someone");

    // Web3Forms required + optional fields
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", `Portfolio contact from ${senderName}`);
    data.append("from_name", "Portfolio Contact Form");
    // Redirect Web3Forms' thank-you page back to ourselves (we handle the UI)
    data.append("redirect", "false");

    setState("sending");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json: { success: boolean; message?: string } = await res.json();
      if (json.success) {
        setState("sent");
        form.reset();
      } else {
        throw new Error(json.message ?? "Submission failed — please try again.");
      }
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : `Something went wrong — email ${profile.email} directly.`
      );
      setState("error");
    }
  };

  return (
    <section id="contact" className="section-pad relative overflow-hidden">
      {/* Animated gradient bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 0%, rgba(91,140,255,0.18), transparent 70%), radial-gradient(40% 60% at 100% 100%, rgba(91,140,255,0.10), transparent 60%)",
        }}
      />
      <FloatingParticles />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300"
          >
            <span className="text-accent">06</span>
            <span className="h-px w-8 bg-white/15" />
            <span>Contact</span>
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.8, ease, delay: 0.05 }}
            className="mt-6 font-display text-display-lg text-balance text-bone-50"
          >
            Get in <em className="italic text-gradient-accent">touch</em>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
            className="mx-auto mt-5 max-w-xl leading-relaxed text-bone-200"
          >
            If you're working on software, automation, or AI systems and think
            I could help, feel free to reach out.
          </motion.p>
        </div>

        <motion.form
          onSubmit={onSubmit}
          onChange={() => { if (state === "sent" || state === "error") setState("idle"); }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, ease, delay: 0.18 }}
          className="mx-auto mt-12 max-w-2xl rounded-2xl glass-strong p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Your name" name="name" required />
            <Field label="Email" name="email" type="email" required />
          </div>
          <div className="mt-5">
            <Field
              label="What are you building?"
              name="message"
              as="textarea"
              rows={5}
              required
            />
          </div>

          {/* Error banner */}
          {state === "error" && errorMsg && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {errorMsg}
            </motion.p>
          )}

          <div className="mt-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
              {state === "sent"
                ? "Message delivered — I'll reply within 24 h."
                : `Replies usually within 24 h · ${profile.location}`}
            </span>
            <MagneticButton
              variant="primary"
              type="submit"
              disabled={state === "sending" || state === "sent"}
            >
              {state === "sending"
                ? "Sending…"
                : state === "sent"
                ? "Sent ✓"
                : state === "error"
                ? "Try again"
                : "Send message"}
              <Arrow />
            </MagneticButton>
          </div>
        </motion.form>

        {/* Direct links */}
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          <ContactLink label="Email" value={profile.email} href={`mailto:${profile.email}`} />
          <ContactLink label="GitHub" value="@michaelgichamu" href={profile.github} />
          <ContactLink label="LinkedIn" value="michael-gichamu" href={profile.linkedin} />
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  as = "input",
  rows,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  as?: "input" | "textarea";
  rows?: number;
  required?: boolean;
}) {
  const baseInput =
    "peer w-full rounded-lg border border-white/[0.08] bg-ink-900/60 px-4 pt-6 pb-2 text-bone-50 outline-none transition-colors duration-300 focus:border-accent/60 placeholder-transparent";
  return (
    <label className="relative block">
      {as === "textarea" ? (
        <textarea
          name={name}
          rows={rows}
          placeholder={label}
          required={required}
          className={cn(baseInput, "resize-none")}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={label}
          required={required}
          className={baseInput}
        />
      )}
      <span className="pointer-events-none absolute left-4 top-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300 transition-colors peer-focus:text-accent">
        {label}
      </span>
    </label>
  );
}

function ContactLink({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition-colors hover:border-accent/40 hover:bg-white/[0.04]"
    >
      <div className="flex flex-col">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
          {label}
        </span>
        <span className="text-sm text-bone-50">{value}</span>
      </div>
      <span className="text-bone-300 transition-transform group-hover:translate-x-0.5 group-hover:text-bone-50">
        ↗
      </span>
    </a>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="-mr-1">
      <path
        d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 14 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {particles.map((_, i) => {
        const left = `${(i * 7.3) % 100}%`;
        const delay = (i % 5) * 0.6;
        const duration = 8 + (i % 4) * 2;
        return (
          <motion.span
            key={i}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "-10%", opacity: [0, 0.7, 0] }}
            transition={{
              repeat: Infinity,
              duration,
              delay,
              ease: "easeInOut",
            }}
            className="absolute h-1 w-1 rounded-full bg-accent/70 blur-[0.4px]"
            style={{ left }}
          />
        );
      })}
    </div>
  );
}
