"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink transition-[border-color,box-shadow] duration-200 placeholder:text-muted/70 focus:border-rose focus:shadow-[0_0_0_4px_rgb(201_143_140/0.18)] focus:outline-none";

/** Front-end only: validates and shows a confirmation. Connect to email/CRM later. */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("name")).trim()) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get("email")).trim())) next.email = "Please enter a valid email.";
    if (String(data.get("message")).trim().length < 10) next.message = "Please write a little more (10+ characters).";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {sent ? (
        <motion.div
          key="sent"
          role="status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="rounded-[var(--radius-card)] bg-blush/60 p-8 text-center"
        >
          <Check aria-hidden className="mx-auto size-6 text-velvet" />
          <p className="mt-3 font-serif text-2xl text-ink">Thank you!</p>
          <p className="mt-2 text-sm text-muted">
            This is a demo form, so your message wasn&apos;t sent yet. The real version will reply within two working days.
          </p>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
          {[
            { name: "name", label: "Name", type: "text", autoComplete: "name" },
            { name: "email", label: "Email", type: "email", autoComplete: "email" },
          ].map((f) => (
            <div key={f.name}>
              <label htmlFor={`contact-${f.name}`} className="text-sm font-medium text-ink">
                {f.label}
              </label>
              <input
                id={`contact-${f.name}`}
                name={f.name}
                type={f.type}
                autoComplete={f.autoComplete}
                aria-invalid={Boolean(errors[f.name])}
                aria-describedby={errors[f.name] ? `contact-${f.name}-error` : undefined}
                className={fieldClass}
              />
              {errors[f.name] && (
                <p id={`contact-${f.name}-error`} className="mt-1 text-xs text-velvet">
                  {errors[f.name]}
                </p>
              )}
            </div>
          ))}
          <div>
            <label htmlFor="contact-message" className="text-sm font-medium text-ink">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              className={fieldClass}
            />
            {errors.message && (
              <p id="contact-message-error" className="mt-1 text-xs text-velvet">
                {errors.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="group/cs inline-flex items-center gap-2 rounded-full bg-velvet px-6 py-3 text-sm font-medium text-white transition-[background-color,translate] duration-250 hover:-translate-y-0.5 hover:bg-velvet-dark"
          >
            Send message
            <ArrowRight aria-hidden className="size-4 transition-transform duration-250 group-hover/cs:translate-x-1" />
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
