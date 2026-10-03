import { useLanguage } from '@/hooks/useLanguage';
import { doctorDashboardDictionaries } from '@/i18n/doctorDashboard';

export function useDoctorDashboardI18n() {
  const { language } = useLanguage();
  return doctorDashboardDictionaries[language];
}
