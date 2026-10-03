import { useState } from 'react';
import { useAdminDashboardI18n } from '@/hooks/useAdminDashboardI18n';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { LANGUAGES, ROUTES } from '@/constants';
import { AdminIcon } from './AdminIcon';
import { useNavigate } from 'react-router-dom';

export function AdminHeader({ onMenu }: { onMenu: () => void }) {
  const t = useAdminDashboardI18n();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const doLogout = async () => { await logout(); navigate(ROUTES.admin.login, { replace:true }); };
  return <header className="admin-header">
    <button className="admin-menu-btn" onClick={onMenu} aria-label={t.menu}><AdminIcon name="menu"/></button>
    <div className="admin-search"><AdminIcon name="search" size={17}/><input placeholder={t.search} aria-label={t.search}/></div>
    <div className="admin-header-actions">
      <button className="admin-icon-btn" onClick={toggleTheme} title="Theme"><AdminIcon name={theme === 'dark' ? 'sun' : 'moon'}/></button>
      <button className="admin-icon-btn notification" title={t.notifications}><AdminIcon name="bell"/><span>3</span></button>
      <select className="admin-language" value={language} onChange={e => setLanguage(e.target.value as typeof language)} aria-label={t.language}>
        {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.nativeLabel}</option>)}
      </select>
      <button className="admin-profile" onClick={() => setOpen(v=>!v)} aria-expanded={open}><span className="admin-avatar">A</span><span className="admin-profile-text"><strong>{t.profile}</strong><small>{t.role}</small></span><span>⌄</span></button>
      {open && <div className="admin-profile-menu"><button onClick={doLogout}>{t.logout}</button></div>}
    </div>
  </header>;
}
