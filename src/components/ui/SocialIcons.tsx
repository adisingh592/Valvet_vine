/* Simple line icons for social platforms (Lucide no longer ships brand marks). */

type IconProps = React.SVGProps<SVGSVGElement>;

function Base(props: IconProps & { children: React.ReactNode }) {
  const { children, ...rest } = props;
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </Base>
  );
}

export function PinterestIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10.6 20.6 12.3 13" />
      <path d="M10 14.2c-.9-.6-1.4-1.6-1.4-2.8 0-2.3 1.6-4 3.9-4 2.2 0 3.6 1.4 3.6 3.4 0 2.3-1.2 4-2.9 4-.9 0-1.5-.7-1.3-1.6" />
    </Base>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10.5 9.5 4 2.5-4 2.5z" fill="currentColor" />
    </Base>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M15 3.5h-2a4 4 0 0 0-4 4V10H7v3.5h2v7h3.5v-7H15l.5-3.5h-3V8a1 1 0 0 1 1-1H15z" />
    </Base>
  );
}

export function TiktokIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M14 3.5v11a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 3.5c.4 2.6 2.2 4.4 5 4.6" />
    </Base>
  );
}

export function WhatsappIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3.5 20.5 4.8 16A8.5 8.5 0 1 1 8 19.2z" />
      <path d="M9 8.5c.2-.5.5-.6.8-.6h.5l.9 2.1-.7.9c.5 1 1.3 1.9 2.4 2.4l.9-.7 2.1.9v.5c0 .3-.1.6-.6.8-.8.4-1.8.3-3.1-.4a8 8 0 0 1-2.9-2.9c-.6-1.2-.7-2.2-.3-3z" />
    </Base>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V16M8 7.8v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.3-2.6 1.3 0 2.2.9 2.2 2.6V16" />
    </Base>
  );
}
