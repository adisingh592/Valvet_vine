"use client";

import { useCallback, useEffect, useState } from "react";

/*
 * Pins and boards the shopper creates on /create. Saved on this device only
 * (no accounts yet), like the wishlist.
 */

export interface Pin {
  id: string;
  title: string;
  description: string;
  /** Remote image URL, or a downscaled data URL for uploaded photos. */
  image: string;
  board: string;
  tags: string[];
  /** Page the pin was made from, e.g. a product page. */
  link?: string;
  /** ISO date; set when "Schedule for later" was used. */
  scheduledFor?: string;
  createdAt: string;
}

const PINS_KEY = "vv-pins";
const BOARDS_KEY = "vv-boards";
const CHANGE_EVENT = "vv-pins-change";

export const DEFAULT_BOARDS = ["Everyday Style", "Occasion Wear", "Travel Looks"];

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or blocked: the change only lasts for this visit.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function usePins() {
  const [pins, setPins] = useState<Pin[]>([]);
  const [boards, setBoards] = useState<string[]>(DEFAULT_BOARDS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setPins(read<Pin[]>(PINS_KEY, []));
      setBoards(read<string[]>(BOARDS_KEY, DEFAULT_BOARDS));
      setReady(true);
    };
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const addPin = useCallback((pin: Omit<Pin, "id" | "createdAt">) => {
    const next: Pin = { ...pin, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    write(PINS_KEY, [next, ...read<Pin[]>(PINS_KEY, [])]);
    return next;
  }, []);

  const removePin = useCallback((id: string) => {
    write(PINS_KEY, read<Pin[]>(PINS_KEY, []).filter((p) => p.id !== id));
  }, []);

  const addBoard = useCallback((name: string) => {
    const current = read<string[]>(BOARDS_KEY, DEFAULT_BOARDS);
    if (!current.some((b) => b.toLowerCase() === name.toLowerCase())) write(BOARDS_KEY, [...current, name]);
  }, []);

  return { pins, boards, ready, addPin, removePin, addBoard };
}

/** Shrinks an uploaded photo so it fits comfortably in browser storage. */
export function downscaleImage(file: File, maxSide = 900): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read that image."));
    };
    img.src = url;
  });
}
