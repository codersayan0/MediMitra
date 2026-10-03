import type { SVGProps } from 'react';

export type DoctorIconName =
  | 'home' | 'calendar' | 'users' | 'schedule' | 'stethoscope' | 'prescription'
  | 'records' | 'wallet' | 'profile' | 'settings' | 'logout' | 'bell' | 'search'
  | 'menu' | 'close' | 'bot' | 'arrow' | 'check' | 'clock' | 'video' | 'more'
  | 'filter' | 'plus' | 'document' | 'sun' | 'moon' | 'shield' | 'edit' | 'location'
  | 'mail' | 'phone';

export function DoctorIcon({ name, size = 18, ...props }: { name: DoctorIconName; size?: number } & Omit<SVGProps<SVGSVGElement>, 'name'>) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, ...props };
  switch (name) {
    case 'home': return <svg {...p}><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/></svg>;
    case 'calendar': return <svg {...p}><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 9h16"/><path d="M8 13h.01M12 13h.01M16 13h.01"/></svg>;
    case 'users': return <svg {...p}><circle cx="9" cy="8" r="3"/><path d="M3 20c.7-3 2.8-4.5 6-4.5s5.3 1.5 6 4.5"/><circle cx="17" cy="9" r="2.3"/><path d="M16.5 14.5c2.3.3 3.9 1.7 4.5 4.5"/></svg>;
    case 'schedule': return <svg {...p}><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/><path d="M8 3 6 5M16 3l2 2"/></svg>;
    case 'stethoscope': return <svg {...p}><path d="M6 3v5a4 4 0 0 0 8 0V3"/><path d="M6 3H4M14 3h2"/><path d="M10 12v2a5 5 0 0 0 10 0v-1"/><circle cx="20" cy="11" r="1.5"/></svg>;
    case 'prescription': return <svg {...p}><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v4h4M9 12h6M9 16h4"/></svg>;
    case 'records': return <svg {...p}><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/><path d="M9 4v-1h6v1"/></svg>;
    case 'wallet': return <svg {...p}><path d="M4 6h15a2 2 0 0 1 2 2v10H4a2 2 0 0 1-2-2V6z"/><path d="M4 6V4h13"/><path d="M16 13h5"/><circle cx="16" cy="13" r=".7"/></svg>;
    case 'profile': return <svg {...p}><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.2 3.1-5 7-5s6.2 1.8 7 5"/></svg>;
    case 'settings': return <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.2-1.7l2-1.2-2-3.4-2.2 1a7 7 0 0 0-2.8-1.7L13.5 3h-3l-.3 2a7 7 0 0 0-2.8 1.7l-2.2-1-2 3.4 2 1.2A7 7 0 0 0 5 12c0 .6.1 1.2.2 1.7l-2 1.2 2 3.4 2.2-1a7 7 0 0 0 2.8 1.7l.3 2h3l.3-2a7 7 0 0 0 2.8-1.7l2.2 1 2-3.4-2.2-1c.1-.5.2-1.1.2-1.7Z"/></svg>;
    case 'logout': return <svg {...p}><path d="M10 5H5v14h5"/><path d="m14 8 4 4-4 4M18 12H8"/></svg>;
    case 'bell': return <svg {...p}><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>;
    case 'search': return <svg {...p}><circle cx="11" cy="11" r="6.5"/><path d="m16 16 5 5"/></svg>;
    case 'menu': return <svg {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case 'close': return <svg {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>;
    case 'bot': return <svg {...p}><rect x="4.5" y="7" width="15" height="11" rx="4"/><path d="M12 4v3"/><circle cx="12" cy="3.5" r=".8"/><circle cx="9" cy="12" r=".8" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r=".8" fill="currentColor" stroke="none"/><path d="M9 15h6"/></svg>;
    case 'arrow': return <svg {...p}><path d="M5 12h13M13 6l6 6-6 6"/></svg>;
    case 'check': return <svg {...p}><path d="m5 12 4 4L19 6"/></svg>;
    case 'clock': return <svg {...p}><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>;
    case 'video': return <svg {...p}><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3z"/></svg>;
    case 'more': return <svg {...p}><circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/></svg>;
    case 'filter': return <svg {...p}><path d="M4 6h16M7 12h10M10 18h4"/></svg>;
    case 'plus': return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case 'document': return <svg {...p}><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>;
    case 'sun': return <svg {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>;
    case 'moon': return <svg {...p}><path d="M20 15.5A8 8 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/></svg>;
    case 'shield': return <svg {...p}><path d="M12 3 19 6v5c0 4.5-2.9 7.9-7 10-4.1-2.1-7-5.5-7-10V6l7-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg>;
    case 'edit': return <svg {...p}><path d="m4 20 4.2-1 10-10a2 2 0 0 0-3-3l-10 10z"/><path d="m13.5 6.5 3 3"/></svg>;
    case 'location': return <svg {...p}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case 'mail': return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>;
    case 'phone': return <svg {...p}><path d="M6 3h3l1.5 4-2 1.5a14 14 0 0 0 7 7l1.5-2 4 1.5v3c0 1-1 2-2 2C10 20 4 14 4 5c0-1 1-2 2-2Z"/></svg>;
  }
}
