import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/Button";
import type { UserRole } from "@/types";

interface PlaceholderPageProps {
  role: UserRole;
  kind: "login" | "register" | "dashboard";
}

const ICONS: Record<PlaceholderPageProps["kind"], string> = {
  login: "🔐",
  register: "📝",
  dashboard: "📊",
};

/**
 * Placeholder shown for routes whose real implementation (auth, dashboards)
 * ships in a later phase. Keeps navigation working end-to-end without
 * faking production authentication logic.
 */
export function PlaceholderPage({ role, kind }: PlaceholderPageProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const roleName = t.roleNames[role];
  const titleTemplate =
    kind === "login" ? t.placeholder.loginTitle : kind === "register" ? t.placeholder.registerTitle : t.placeholder.dashboardTitle;
  const title = titleTemplate.replace("{role}", roleName);

  return (
    <div className="placeholder">
      <div className="placeholder__card">
        <div className="placeholder__icon" aria-hidden="true">
          {ICONS[kind]}
        </div>
        <h1 className="placeholder__title">{title}</h1>
        <p className="placeholder__desc">{t.placeholder.desc}</p>
        <Button onClick={() => navigate("/")}>{t.placeholder.backHome}</Button>
      </div>
    </div>
  );
}