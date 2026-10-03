import { AdminIcon } from './AdminIcon';
import { useAdminDashboardI18n } from '@/hooks/useAdminDashboardI18n';

export function RemoveAccountModal({ name, onCancel, onConfirm }: { name:string; onCancel:()=>void; onConfirm:()=>void }) {
 const t=useAdminDashboardI18n();
 return <div className="admin-modal-backdrop" role="presentation" onMouseDown={onCancel}><div className="admin-modal" role="dialog" aria-modal="true" onMouseDown={e=>e.stopPropagation()}><button className="admin-modal-close" onClick={onCancel} aria-label={t.close}><AdminIcon name="close"/></button><div className="admin-modal-icon"><AdminIcon name="trash" size={22}/></div><h2>{t.confirmTitle}</h2><p>{t.confirmText}<br/><strong>{name}</strong></p><div className="admin-modal-actions"><button className="admin-btn secondary" onClick={onCancel}>{t.cancel}</button><button className="admin-btn danger" onClick={onConfirm}><AdminIcon name="trash" size={16}/>{t.confirmRemove}</button></div></div></div>;
}
