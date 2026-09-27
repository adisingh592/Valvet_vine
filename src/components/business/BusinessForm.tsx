"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/format";

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink transition-[border-color,box-shadow] duration-200 placeholder:text-muted/70 focus:border-rose focus:shadow-[0_0_0_4px_rgb(201_143_140/0.18)] focus:outline-none";

const ENQUIRY_TYPES = [
  "Brand partnership",
  "Affiliate / retail programme",
  "Sponsored content or campaign",
  "Creator or stylist collaboration",
  "Press & media",
  "Something else",
];

const BUDGETS = ["Not sure yet", "Under ₹50,000", "₹50,000 – ₹2 lakh", "₹2 – 5 lakh", "₹5 lakh+"];

/** Business enquiry form. Front-end only: validates and confirms; connect to email/CRM later. */
export function BusinessForm() {
  const id = useId();
  const [sent, setSent] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const next: Record<string, string> = {};
    if (!get("name")) next.name = "Please tell us your name.";
    if (!get("company")) next.company = "Which brand or company are you with?";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) next.email = "Please enter a valid work email.";
    if (get("phone") && !/^[+\d][\d\s-]{6,}$/.test(get("phone"))) next.phone = "That number doesn't look right.";
    if (get("message").length < 20) next.message = "A few more details help us reply properly (20+ characters).";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(get("name").split(" ")[0]);
  };

  const field = (name: string, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}, optional = false) => (
    <div>
      <label htmlFor={`${id}-${name}`} className="text-sm font-medium text-ink">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      <input
        id={`${id}-${name}`}
        name={name}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${id}-${name}-error` : undefined}
        className={fieldClass}
        {...props}
      />
      {errors[name] && (
        <p id={`${id}-${name}-error`} className="mt-1 text-xs text-velvet">
          {errors[name]}
        </p>
      )}
    </div>
  );

  const select = (name: string, label: string, options: string[]) => (
    <div>
      <label htmlFor={`${id}-${name}`} className="text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative">
        <select id={`${id}-${name}`} name={name} className={cn(fieldClass, "appearance-none pr-10")}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute bottom-0 right-4 top-1.5 my-auto size-4 text-muted" />
      </div>
    </div>
  );

  return (
    <AnimatePresence mode="wait" initial={false}>
      {sent !== null ? (
        <motion.div
          key="sent"
          role="status"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-[var(--radius-hero)] bg-blush/60 p-10 text-center"
        >
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-velvet text-white">
            <Check aria-hidden className="size-6" />
          </span>
          <p className="mt-4 font-serif text-3xl text-ink">Thank you, {sent}!</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
            This is a demo form, so nothing was sent yet. Once it&apos;s connected, our partnerships team replies within
            two working days.
          </p>
          <button
            type="button"
            onClick={() => setSent(null)}
            className="mt-6 rounded-full border border-ink/15 bg-white/70 px-5 py-2.5 text-sm font-medium text-ink hover:bg-white"
          >
            Send another enquiry
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={submit}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid gap-4 rounded-[var(--radius-hero)] border border-line bg-white/70 p-6 shadow-soft sm:grid-cols-2 sm:p-8"
        >
          {field("name", "Your name", { autoComplete: "name" })}
          {field("company", "Brand / company", { autoComplete: "organization" })}
          {field("email", "Work email", { type: "email", autoComplete: "email" })}
          {field("phone", "Phone / WhatsApp", { type: "tel", autoComplete: "tel" }, true)}
          {select("type", "What's this about?", ENQUIRY_TYPES)}
          {select("budget", "Budget range", BUDGETS)}
          <div className="sm:col-span-2">{field("website", "Website or Instagram", { type: "url", placeholder: "https://" }, true)}</div>
          <div className="sm:col-span-2">
            <label htmlFor={`${id}-message`} className="text-sm font-medium text-ink">
              Tell us about your idea
            </label>
            <textarea
              id={`${id}-message`}
              name="message"
              rows={5}
              placeholder="Goals, timelines, products or collections you'd like to feature…"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? `${id}-message-error` : undefined}
              className={cn(fieldClass, "resize-none")}
            />
            {errors.message && (
              <p id={`${id}-message-error`} className="mt-1 text-xs text-velvet">
                {errors.message}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
            <p className="text-xs text-muted">We reply to business enquiries within two working days.</p>
            <button
              type="submit"
              className="group/cs inline-flex items-center gap-2 rounded-full bg-velvet px-6 py-3 text-sm font-medium text-white transition-[background-color,translate] duration-250 hover:-translate-y-0.5 hover:bg-velvet-dark"
            >
              Send enquiry
              <ArrowRight aria-hidden className="size-4 transition-transform duration-250 group-hover/cs:translate-x-1" />
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
