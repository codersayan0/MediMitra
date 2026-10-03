import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminDataProvider } from '@/contexts/AdminDataContext';
import '@/styles/admin/admin-portal.css';

export function AdminLayout() {
  const [open, setOpen] = useState(false);
  return <AdminDataProvider><div className="admin-app"><AdminSidebar open={open} onClose={() => setOpen(false)}/><div className="admin-main"><AdminHeader onMenu={() => setOpen(true)}/><main className="admin-content"><Outlet/></main></div></div></AdminDataProvider>;
}
