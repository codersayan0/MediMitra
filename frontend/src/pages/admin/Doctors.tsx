import { AccountTable } from '@/components/admin/AccountTable';
import { useAdminData } from '@/contexts/AdminDataContext';
import { useAdminDashboardI18n } from '@/hooks/useAdminDashboardI18n';
export function Doctors(){const t=useAdminDashboardI18n();const d=useAdminData();return <div className="admin-page"><div className="admin-section-title"><span className="admin-eyebrow">MediMitra Admin</span><h1>{t.doctorsPageTitle}</h1><p>{t.doctorsPageDesc}</p></div><AccountTable kind="doctor" rows={d.doctors} onRemove={d.removeDoctor}/></div>}
