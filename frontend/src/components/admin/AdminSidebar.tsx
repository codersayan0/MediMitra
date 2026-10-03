import { NavLink, useLocation } from 'react-router-dom';
import { useAdminDashboardI18n } from '@/hooks/useAdminDashboardI18n';
import { AdminIcon } from './AdminIcon';

const items = [
  ['dashboard','/admin/dashboard'], ['patients','/admin/dashboard/patients'], ['doctors','/admin/dashboard/doctors'], ['users','/admin/dashboard/users'], ['reports','/admin/dashboard/reports'], ['settings','/admin/dashboard/settings'],
] as const;

export function AdminSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useAdminDashboardI18n();
  const location = useLocation();
  const labels: Record<string,string> = { dashboard:t.dashboard, patients:t.patients, doctors:t.doctors, users:t.users, reports:t.reports, settings:t.settings };
  return <>
    {open && <button className="admin-sidebar-backdrop" aria-label={t.close} onClick={onClose} />}
    <aside className={`admin-sidebar ${open ? 'is-open' : ''}`}>
      <div className="admin-brand"><div className="admin-brand-mark">♥</div><div><strong>{t.brand}</strong><span>{t.role}</span></div></div>
      <nav aria-label={t.menu} className="admin-nav">
        {items.map(([icon, path]) => {
          const active = path === '/admin/dashboard' ? location.pathname === path : location.pathname.startsWith(path);
          return <NavLink key={path} to={path} onClick={onClose} className={`admin-nav-link ${active ? 'active' : ''}`}><AdminIcon name={icon}/><span>{labels[icon]}</span></NavLink>;
        })}
      </nav>
      <div className="admin-sidebar-note"><AdminIcon name="shield" size={24}/><strong>MediMitra Admin</strong><p>Account administration only. Clinical information is not shown here.</p></div>
    </aside>
  </>;
}
