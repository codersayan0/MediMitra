import { useState } from 'react';
import { useDoctorDashboardI18n } from '@/hooks/useDoctorDashboardI18n';
import { DoctorIcon } from './DoctorIcon';

export function FloatingDoctorAIChat() {
  const t = useDoctorDashboardI18n();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{role:'ai'|'user'; text:string}[]>([]);

  const send = () => {
    const value = message.trim();
    if (!value) return;
    setMessages(prev => [...prev, { role: 'user', text: value }, { role: 'ai', text: t.aiReply }]);
    setMessage('');
  };

  return <>
    {open && <section className="doctor-ai-float-panel" aria-label={t.aiTitle}>
      <div className="doctor-ai-float-head"><div><strong>{t.aiTitle}</strong><span>{t.aiSubtitle}</span></div><button onClick={() => setOpen(false)} aria-label={t.close}><DoctorIcon name="close" size={17}/></button></div>
      <div className="doctor-ai-float-body">
        <div className="doctor-ai-message doctor-ai-message--assistant"><DoctorIcon name="bot" size={15}/>{t.hello}</div>
        {messages.map((m, i) => <div key={i} className={`doctor-ai-message ${m.role === 'user' ? 'doctor-ai-message--user' : 'doctor-ai-message--assistant'}`}>{m.text}</div>)}
      </div>
      <div className="doctor-ai-float-input"><input value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder={t.typeMessage}/><button onClick={send} aria-label={t.send}><DoctorIcon name="arrow" size={16}/></button></div>
    </section>}
    <button className={`doctor-ai-float-button ${open ? 'open' : ''}`} onClick={() => setOpen(v => !v)} aria-label={t.aiAsk}><DoctorIcon name="bot" size={22}/><span>{t.aiAsk}</span></button>
  </>;
}
