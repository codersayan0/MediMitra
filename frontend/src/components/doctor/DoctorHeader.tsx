import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useDoctorAuth } from '@/hooks/useDoctorAuth';
import { useTheme } from '@/hooks/useTheme';
import { LANGUAGES } from '@/constants';
import type { LanguageCode } from '@/types';
import { DoctorIcon } from './DoctorIcon';
import { doctorProfileImageService } from '@/services/doctorProfileImage.service';

export function DoctorHeader({ onMenu }: { onMenu: () => void }) {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { doctor } = useDoctorAuth();
  const [query, setQuery] = useState('');
  const avatar = doctorProfileImageService.get();
  const name = doctor ? `${doctor.title} ${doctor.last_name}` : 'Doctor';

  return <header className="doctor-header">
    <button className="doctor-mobile-menu" onClick={onMenu} aria-label="Menu"><DoctorIcon name="menu" /></button>
    <div className="doctor-search"><DoctorIcon name="search" size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="" aria-label="Search"/><span>{query ? '' : ''}</span></div>
    <div className="doctor-header__actions">
      <button className="doctor-icon-button" aria-label="Notifications"><DoctorIcon name="bell" size={18}/><i /></button>
      <button className="doctor-icon-button doctor-theme-button" onClick={toggleTheme} aria-label="Toggle theme"><DoctorIcon name={theme === 'dark' ? 'sun' : 'moon'} size={17}/></button>
      <select className="doctor-language" value={language} onChange={e => setLanguage(e.target.value as LanguageCode)} aria-label="Language">
        {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.nativeLabel}</option>)}
      </select>
      <div className="doctor-header-profile">
        {avatar ? <img src={avatar} alt="" /> : <div className="doctor-avatar">{doctor?.first_name?.[0] ?? 'D'}</div>}
        <div><strong>{name}</strong><span>Doctor</span></div>
      </div>
    </div>
  </header>;
}
