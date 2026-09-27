"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter sign-up (front-end only for now — no email is sent or stored).
 * Wire `onSubmit` to the mailing-list provider when the backend exists.
 */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setDone(true);
  };

  return (
    <section aria-labelledby="newsletter-title" className="container-vv mt-20 sm:mt-28">
      <Reveal className="relative overflow-hidden rounded-[var(--radius-hero)] bg-blush/60 px-6 py-12 text-center sm:px-12 sm:py-16">
        <div aria-hidden className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-white/40 blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-10 size-64 rounded-full bg-rose/20 blur-3xl" />
        <p className="relative text-[0.7rem] font-medium uppercase tracking-[0.25em] text-mocha">Newsletter</p>
        <h2 id="newsletter-title" className="relative mt-3 font-serif text-3xl text-ink sm:text-4xl">
          Join the Velvet Vine Community
        </h2>
        <p className="relative mx-auto mt-3 max-w-md text-sm text-muted">
          Weekly style guides, new-season edits and the best finds from our partner retailers.
        </p>

        <div className="relative mx-auto mt-7 max-w-md">
          <AnimatePresence mode="wait" initial={false}>
            {done ? (
              <motion.p
                key="done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                role="status"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm text-ink shadow-soft"
              >
                <Check aria-hidden className="size-4 text-velvet" />
                Thanks! You&apos;re on the list (demo — no email was sent).
              </motion.p>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-2 sm:flex-row"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "newsletter-error" : undefined}
                  className="h-12 flex-1 rounded-full border border-line bg-white px-5 text-sm text-ink transition-[border-color,box-shadow] duration-200 placeholder:text-muted/80 focus:border-rose focus:shadow-[0_0_0_4px_rgb(201_143_140/0.18)] focus:outline-none"
                />
                <button
                  type="submit"
                  className="group/sub inline-flex h-12 items-center justify-center gap-2 rounded-full bg-velvet px-6 text-sm font-medium text-white transition-[background-color,translate] duration-200 hover:-translate-y-0.5 hover:bg-velvet-dark"
                >
                  Subscribe
                  <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover/sub:translate-x-1" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          {error && (
            <p id="newsletter-error" role="alert" className="mt-2 text-left text-xs text-velvet sm:pl-5">
              {error}
            </p>
          )}
        </div>
      </Reveal>
    </section>
  );
}
