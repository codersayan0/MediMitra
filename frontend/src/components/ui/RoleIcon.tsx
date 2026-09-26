import type { UserRole } from "@/types";

interface IconProps {
  size?: number;
  className?: string;
}

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/**
 * Role-card iconography for the Patient / Doctor / Administrative cards.
 * Line-art SVGs (not emoji) so every role reads clearly in both themes and
 * scales cleanly at any size — used on both the landing page's RoleSection
 * and the dedicated RoleSelectionPage, keyed off the same `role` value the
 * rest of the app already uses (see ROLE_OPTIONS in constants/index.ts).
 */
export function RoleIcon({ role, size = 26, className = "" }: IconProps & { role: UserRole }) {
  const icons: Record<UserRole, JSX.Element> = {
    patient: (
      <>
        <circle cx="12" cy="8" r="3.4" {...strokeProps} />
        <path d="M5 20c0-3.6 3.1-6.4 7-6.4s7 2.8 7 6.4" {...strokeProps} />
      </>
    ),
    doctor: (
      <path
        d="M8 3v5.5a4 4 0 0 0 8 0V3M8 6H6M8 10H6M16 6h2M16 10h2M12 14v3a3 3 0 1 0 6 0v-1.2a3.3 3.3 0 1 0-2-6.1"
        {...strokeProps}
      />
    ),
    admin: (
      <>
        <path d="M12 3.5l6.5 2.4v5.3c0 4.2-2.7 7.6-6.5 8.8-3.8-1.2-6.5-4.6-6.5-8.8V5.9L12 3.5z" {...strokeProps} />
        <path d="M9.3 12.1l1.9 1.9 3.6-3.7" {...strokeProps} />
      </>
    ),
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      {icons[role]}
    </svg>
  );
}

type TrustKey = "secure" | "ai" | "language" | "trust";

/** Icon set for the role-selection trust strip (secure / AI / language / care). */
export function TrustIcon({ trustKey, size = 20, className = "" }: IconProps & { trustKey: TrustKey }) {
  const icons: Record<TrustKey, JSX.Element> = {
    secure: (
      <path
        d="M12 3.5l6.5 2.4v5.3c0 4.2-2.7 7.6-6.5 8.8-3.8-1.2-6.5-4.6-6.5-8.8V5.9L12 3.5zM9.3 12.1l1.9 1.9 3.6-3.7"
        {...strokeProps}
      />
    ),
    ai: (
      <>
        <rect x="6" y="7" width="12" height="10" rx="3" {...strokeProps} />
        <path d="M9 7V5a3 3 0 0 1 6 0v2M9.5 12h.01M14.5 12h.01M4 11h2M18 11h2" {...strokeProps} />
      </>
    ),
    language: (
      <>
        <circle cx="12" cy="12" r="8.2" {...strokeProps} />
        <path d="M3.8 12h16.4M12 3.8c2.2 2.3 3.4 5.2 3.4 8.2s-1.2 5.9-3.4 8.2c-2.2-2.3-3.4-5.2-3.4-8.2S9.8 6.1 12 3.8z" {...strokeProps} />
      </>
    ),
    trust: (
      <path
        d="M12 20.2s-7.6-4.4-7.6-10a4.6 4.6 0 0 1 7.6-3.5 4.6 4.6 0 0 1 7.6 3.5c0 5.6-7.6 10-7.6 10z"
        {...strokeProps}
      />
    ),
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      {icons[trustKey]}
    </svg>
  );
}