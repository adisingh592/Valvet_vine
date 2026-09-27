"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "vv-wishlist";

interface WishlistContextValue {
  slugs: string[];
  /** False until the saved list has been read from this device. */
  ready: boolean;
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  clear: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

function readStorage(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
  } catch {
    return [];
  }
}

function writeStorage(slugs: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    // Storage can be unavailable (private mode); the wishlist still works for this visit.
  }
}

/** Wishlist saved on this device only (no accounts yet). */
export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSlugs(readStorage());
    setReady(true);
  }, []);

  const toggle = useCallback((slug: string) => {
    setSlugs((current) => {
      const next = current.includes(slug) ? current.filter((s) => s !== slug) : [slug, ...current];
      writeStorage(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setSlugs([]);
    writeStorage([]);
  }, []);

  const value = useMemo<WishlistContextValue>(
    () => ({ slugs, ready, has: (slug) => slugs.includes(slug), toggle, clear }),
    [slugs, ready, toggle, clear],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return context;
}
