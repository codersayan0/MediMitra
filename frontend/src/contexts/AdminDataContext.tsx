import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { initialDoctors, initialPatients, type DoctorAccount, type PatientAccount } from '@/pages/admin/adminData';

interface AdminDataContextValue { patients: PatientAccount[]; doctors: DoctorAccount[]; removedCount:number; removePatient:(id:string)=>void; removeDoctor:(id:string)=>void; }
const Ctx=createContext<AdminDataContextValue|null>(null);
export function AdminDataProvider({children}:{children:ReactNode}){
 const [patients,setPatients]=useState(initialPatients); const [doctors,setDoctors]=useState(initialDoctors); const [removedCount,setRemovedCount]=useState(12);
 const value=useMemo(()=>({patients,doctors,removedCount,removePatient:(id:string)=>{setPatients(v=>v.filter(x=>x.id!==id));setRemovedCount(v=>v+1)},removeDoctor:(id:string)=>{setDoctors(v=>v.filter(x=>x.id!==id));setRemovedCount(v=>v+1)}}),[patients,doctors,removedCount]);
 return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useAdminData(){const ctx=useContext(Ctx);if(!ctx)throw new Error('useAdminData must be used within AdminDataProvider');return ctx;}
