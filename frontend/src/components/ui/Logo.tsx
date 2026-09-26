interface LogoProps {
  /** Pixel size of the square badge. Defaults to 30 (navbar height). */
  size?: number;
  className?: string;
}

/**
 * MediMitra brand mark: a pulse (EKG) line that peaks into a cross —
 * "intelligent monitoring" (the pulse) meeting "care" (the cross), the
 * two ideas the brand brief asks the identity to carry. Colors mirror the
 * app's --gradient-primary token so it stays in sync with theme.css.
 *
 * Used inline (Navbar, Footer) and mirrored as the static /logo.svg used
 * for the favicon, since a favicon document has no access to the app's
 * CSS custom properties.
 */
export function Logo({ size = 30, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="MediMitra"
    >
      <rect width="32" height="32" rx="9" fill="url(#medimitra-logo-grad)" />
      <path
        d="M6 18H10L12 10L14 24L17 4L19 18H26"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="medimitra-logo-grad"
          x1="2"
          y1="2"
          x2="30"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0EA5E9" />
          <stop offset="1" stopColor="#14B8A6" />
        </linearGradient>
      </defs>
    </svg>
  );
}