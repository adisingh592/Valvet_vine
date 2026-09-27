import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <div className="container-vv flex flex-col items-center py-24 text-center">
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-mocha">Error 404</p>
      <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">This page has wandered off</h1>
      <p className="mt-4 max-w-md text-sm text-muted">
        The link may be old or the style may have moved. Let&apos;s get you back to something lovely.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/new-in" variant="outline">
          See new arrivals
        </ButtonLink>
      </div>
    </div>
  );
}
