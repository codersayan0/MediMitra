import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DoctorSidebar } from '@/components/doctor/DoctorSidebar';
import { DoctorHeader } from '@/components/doctor/DoctorHeader';
import { FloatingDoctorAIChat } from '@/components/doctor/FloatingDoctorAIChat';
import '@/styles/doctor-portal.css';

export function DoctorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return <div className="doctor-portal">
    <DoctorSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    <div className="doctor-main-shell">
      <DoctorHeader onMenu={() => setSidebarOpen(true)} />
      <main className="doctor-main-content"><Outlet /></main>
    </div>
    <FloatingDoctorAIChat />
  </div>;
}
