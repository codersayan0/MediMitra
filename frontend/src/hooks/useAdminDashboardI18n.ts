import { useLanguage } from '@/hooks/useLanguage';
import { adminDashboardI18n } from '@/i18n/adminDashboard';

export function useAdminDashboardI18n() {
  const { language } = useLanguage();
  return adminDashboardI18n[language] ?? adminDashboardI18n.en;
}
