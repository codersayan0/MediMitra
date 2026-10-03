import { NavLink, useNavigate } from 'react-router-dom';
import { useDoctorDashboardI18n } from '@/hooks/useDoctorDashboardI18n';
import { DoctorIcon, type DoctorIconName } from './DoctorIcon';
import { Logo } from '@/components/ui/Logo';
import { useDoctorAuth } from '@/hooks/useDoctorAuth';
import { ROUTES } from '@/constants';

const items: { key: string; path: string; icon: DoctorIconName }[] = [
  { key: 'overview', path: '', icon: 'home' },
  { key: 'appointments', path: 'appointments', icon: 'calendar' },
  { key: 'patients', path: 'patients', icon: 'users' },
  { key: 'schedule', path: 'schedule', icon: 'schedule' },
  { key: 'consultations', path: 'consultations', icon: 'stethoscope' },
  { key: 'prescriptions', path: 'prescriptions', icon: 'prescription' },
  { key: 'records', path: 'records', icon: 'records' },
  { key: 'earnings', path: 'earnings', icon: 'wallet' },
  { key: 'profile', path: 'profile', icon: 'profile' },
  { key: 'settings', path: 'settings', icon: 'settings' },
];

export function DoctorSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useDoctorDashboardI18n();
  const { doctor, logout } = useDoctorAuth();
  const navigate = useNavigate();
  const name = doctor ? `${doctor.title} ${doctor.first_name} ${doctor.last_name}` : t.noDoctor;

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.doctor.login, { replace: true });
  };

  return <>
    <aside className={`doctor-sidebar ${open ? 'is-open' : ''}`} aria-label="Doctor navigation">
      <div className="doctor-sidebar__brand"><Logo size={30} /><span>MediMitra</span></div>
      <nav className="doctor-sidebar__nav">
        {items.map((item) => (
          <NavLink key={item.key} end={item.path === ''} to={item.path || '.'} onClick={onClose} className={({ isActive }) => `doctor-nav-link ${isActive ? 'active' : ''}`}>
            <DoctorIcon name={item.icon} size={17} /><span>{t[item.key as keyof typeof t]}</span>
          </NavLink>
        ))}
      </nav>
      <div className="doctor-sidebar__footer">
        <div className="doctor-sidebar__mini-profile"><div className="doctor-avatar doctor-avatar--small">{doctor?.first_name?.[0] ?? 'D'}</div><div><strong>{name}</strong><span>{doctor?.specialization || t.noDoctor}</span></div></div>
        <button className="doctor-nav-link doctor-logout" onClick={handleLogout}><DoctorIcon name="logout" size={17}/><span>{t.logout}</span></button>
      </div>
    </aside>
    {open && <button className="doctor-sidebar-backdrop" aria-label={t.close} onClick={onClose} />}
  </>;
}
