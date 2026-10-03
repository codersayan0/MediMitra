import { AccountTable } from '@/components/admin/AccountTable';
import { useAdminData } from '@/contexts/AdminDataContext';
import { useAdminDashboardI18n } from '@/hooks/useAdminDashboardI18n';
export function Patients(){const t=useAdminDashboardI18n();const d=useAdminData();return <div className="admin-page"><PageTitle title={t.patientsPageTitle} desc={t.patientsPageDesc}/><AccountTable kind="patient" rows={d.patients} onRemove={d.removePatient}/></div>}
function PageTitle({title,desc}:{title:string;desc:string}){return <div className="admin-section-title"><span className="admin-eyebrow">MediMitra Admin</span><h1>{title}</h1><p>{desc}</p></div>}
