"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Check, ChevronDown, ImagePlus, Plus, X } from "lucide-react";
import { downscaleImage, usePins } from "@/lib/pins";
import { inspiration } from "@/data/inspiration";
import { cn } from "@/lib/format";

const TITLE_MAX = 100;
const DESCRIPTION_MAX = 500;

const SUGGESTED = inspiration.slice(0, 8).map((i) => ({ src: i.image, label: i.title }));

const fieldClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink transition-[border-color,box-shadow] duration-200 placeholder:text-muted/70 focus:border-rose focus:shadow-[0_0_0_4px_rgb(201_143_140/0.18)] focus:outline-none";

/** Only same-site paths are accepted as a pin's source link. */
function safeLink(value: string | null) {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : undefined;
}

export function CreatePinForm() {
  const router = useRouter();
  const params = useSearchParams();
  const id = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const { boards, addPin, addBoard } = usePins();

  const [image, setImage] = useState(params.get("image") ?? SUGGESTED[0].src);
  const [title, setTitle] = useState(params.get("title")?.slice(0, TITLE_MAX) ?? "");
  const [description, setDescription] = useState("");
  const [board, setBoard] = useState("");
  const [newBoard, setNewBoard] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>(["style", "ootd"]);
  const [tagDraft, setTagDraft] = useState("");
  const [scheduled, setScheduled] = useState(false);
  const [scheduleAt, setScheduleAt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const selectedBoard = board || boards[0];
  const link = safeLink(params.get("link"));

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return setError("Please choose an image file.");
    try {
      setImage(await downscaleImage(file));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const addTag = () => {
    const tag = tagDraft.trim().replace(/^#/, "").toLowerCase();
    if (tag && !tags.includes(tag) && tags.length < 10) setTags([...tags, tag]);
    setTagDraft("");
  };

  const publish = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return setError("Give your pin a title.");
    if (scheduled && !scheduleAt) return setError("Pick a date and time, or turn off scheduling.");
    let boardName = selectedBoard;
    if (newBoard !== null) {
      if (!newBoard.trim()) return setError("Name your new board.");
      boardName = newBoard.trim();
      addBoard(boardName);
    }
    addPin({
      title: title.trim(),
      description: description.trim(),
      image,
      board: boardName,
      tags,
      link,
      scheduledFor: scheduled ? new Date(scheduleAt).toISOString() : undefined,
    });
    setError(null);
    setSaved(boardName);
  };

  if (saved) {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-md rounded-[var(--radius-hero)] bg-blush/60 p-8 text-center"
      >
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-velvet text-white">
          <Check aria-hidden className="size-6" />
        </span>
        <p className="mt-4 font-serif text-3xl text-ink">{scheduled ? "Pin scheduled" : "Pin saved"}</p>
        <p className="mt-2 text-sm text-muted">
          Added to <strong className="font-medium text-ink">{saved}</strong>. Pins are kept on this device.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/boards" className="rounded-full bg-velvet px-5 py-2.5 text-sm font-medium text-white hover:bg-velvet-dark">
            View my boards
          </Link>
          <button
            type="button"
            onClick={() => {
              setSaved(null);
              setTitle("");
              setDescription("");
            }}
            className="rounded-full border border-ink/15 bg-white/70 px-5 py-2.5 text-sm font-medium text-ink hover:bg-white"
          >
            Create another
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={publish} noValidate className="mx-auto max-w-5xl">
      {/* App-style top bar */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="inline-flex size-10 items-center justify-center rounded-full text-ink hover:bg-cream"
        >
          <ArrowLeft aria-hidden className="size-5" />
        </button>
        <h1 className="font-serif text-2xl text-ink sm:text-3xl">Create Pin</h1>
        <button
          type="submit"
          className="rounded-full bg-gold px-5 py-2 text-sm font-medium text-white shadow-[0_8px_20px_-10px_rgb(184_155_106/0.9)] transition-[background-color,translate] duration-250 hover:-translate-y-0.5 hover:bg-mocha"
        >
          {scheduled ? "Schedule" : "Publish"}
        </button>
      </div>

      <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-10">
        {/* Image */}
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-hero)] bg-cream shadow-soft md:aspect-[4/5]">
            <Image
              key={image}
              src={image}
              alt="Pin image preview"
              fill
              loading="eager"
              fetchPriority="high"
              unoptimized={image.startsWith("data:")}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              aria-label="Upload your own photo"
              className="absolute bottom-3 right-3 inline-flex size-10 items-center justify-center rounded-xl bg-ink/70 text-white backdrop-blur transition-colors hover:bg-ink/85"
            >
              <ImagePlus aria-hidden className="size-5" />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="sr-only"
              tabIndex={-1}
              aria-hidden
              onChange={(e) => onFile(e.target.files?.[0])}
            />
          </div>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-muted">Or pick a look</p>
          <ul className="no-scrollbar -mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-4 md:px-0">
            {SUGGESTED.map((s) => (
              <li key={s.src} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setImage(s.src)}
                  aria-label={`Use the ${s.label} photo`}
                  aria-pressed={image === s.src}
                  className={cn(
                    "relative block size-16 overflow-hidden rounded-xl ring-2 ring-offset-2 ring-offset-ivory transition-shadow md:aspect-square md:size-auto md:w-full",
                    image === s.src ? "ring-velvet" : "ring-transparent hover:ring-line",
                  )}
                >
                  <Image src={s.src} alt="" fill loading="eager" sizes="96px" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Details */}
        <div className="space-y-5">
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor={`${id}-title`} className="text-sm font-medium text-ink">
                Title
              </label>
              <span className="text-xs text-muted">
                {title.length}/{TITLE_MAX}
              </span>
            </div>
            <input
              id={`${id}-title`}
              value={title}
              maxLength={TITLE_MAX}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="A breezy summer look ☀️"
              className={cn(fieldClass, "mt-1.5")}
            />
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor={`${id}-desc`} className="text-sm font-medium text-ink">
                Description
              </label>
              <span className="text-xs text-muted">
                {description.length}/{DESCRIPTION_MAX}
              </span>
            </div>
            <textarea
              id={`${id}-desc`}
              rows={3}
              value={description}
              maxLength={DESCRIPTION_MAX}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Linen, sandals and one bold bag. #summerstyle"
              className={cn(fieldClass, "mt-1.5 resize-none")}
            />
          </div>

          <div>
            <label htmlFor={`${id}-board`} className="text-sm font-medium text-ink">
              Add to board
            </label>
            {newBoard === null ? (
              <div className="relative mt-1.5">
                <select
                  id={`${id}-board`}
                  value={selectedBoard}
                  onChange={(e) => (e.target.value === "__new" ? setNewBoard("") : setBoard(e.target.value))}
                  className={cn(fieldClass, "appearance-none pr-10")}
                >
                  {boards.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                  <option value="__new">+ New board…</option>
                </select>
                <ChevronDown aria-hidden className="pointer-events-none absolute inset-y-0 right-4 my-auto size-4 text-muted" />
              </div>
            ) : (
              <div className="mt-1.5 flex gap-2">
                <input
                  id={`${id}-board`}
                  autoFocus
                  value={newBoard}
                  maxLength={40}
                  onChange={(e) => setNewBoard(e.target.value)}
                  placeholder="New board name"
                  className={fieldClass}
                />
                <button
                  type="button"
                  onClick={() => setNewBoard(null)}
                  aria-label="Cancel new board"
                  className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl border border-line bg-white text-muted hover:text-ink"
                >
                  <X aria-hidden className="size-4" />
                </button>
              </div>
            )}
          </div>

          <div>
            <label htmlFor={`${id}-tag`} className="text-sm font-medium text-ink">
              Tags
            </label>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <AnimatePresence initial={false}>
                {tags.map((tag) => (
                  <motion.span
                    key={tag}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="inline-flex items-center gap-1 rounded-full border border-line bg-white py-1 pl-3 pr-1.5 text-xs text-ink"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => setTags(tags.filter((t) => t !== tag))}
                      aria-label={`Remove tag ${tag}`}
                      className="rounded-full p-0.5 text-muted hover:bg-cream hover:text-ink"
                    >
                      <X aria-hidden className="size-3" />
                    </button>
                  </motion.span>
                ))}
              </AnimatePresence>
              <div className="flex items-center gap-1 rounded-full border border-dashed border-line bg-white/60 py-0.5 pl-3 pr-1">
                <input
                  id={`${id}-tag`}
                  value={tagDraft}
                  maxLength={24}
                  onChange={(e) => setTagDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Add tag"
                  className="w-20 bg-transparent text-xs text-ink placeholder:text-muted/70 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addTag}
                  aria-label="Add tag"
                  className="inline-flex size-6 items-center justify-center rounded-full text-mocha hover:bg-cream"
                >
                  <Plus aria-hidden className="size-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white/70 p-4">
            <div className="flex items-center justify-between gap-4">
              <span id={`${id}-schedule-label`} className="text-sm font-medium text-ink">
                Schedule for later
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={scheduled}
                aria-labelledby={`${id}-schedule-label`}
                onClick={() => setScheduled((v) => !v)}
                className={cn(
                  "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-250",
                  scheduled ? "bg-velvet" : "bg-line",
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 size-5 rounded-full bg-white shadow transition-[left] duration-250 ease-[var(--ease-vv)]",
                    scheduled ? "left-[22px]" : "left-0.5",
                  )}
                />
              </button>
            </div>
            <AnimatePresence initial={false}>
              {scheduled && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <label htmlFor={`${id}-when`} className="sr-only">
                    Publish date and time
                  </label>
                  <input
                    id={`${id}-when`}
                    type="datetime-local"
                    value={scheduleAt}
                    onChange={(e) => setScheduleAt(e.target.value)}
                    className={cn(fieldClass, "mt-3")}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {error && (
            <p role="alert" className="text-sm text-velvet">
              {error}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
