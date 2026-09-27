import { ViewTransition } from "react";

/**
 * Wrap each page's content (not the layout — layouts persist across
 * navigations, so enter/exit never fire there). Uses the browser View
 * Transition API via React: old page fades out, new page fades up 10px.
 * Unsupported browsers simply navigate without animation.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
