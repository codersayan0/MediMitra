import { useContext } from "react";
import { DoctorAuthContext } from "@/contexts/DoctorAuthContext";

export function useDoctorAuth() {
  const ctx = useContext(DoctorAuthContext);
  if (!ctx) throw new Error("useDoctorAuth must be used within DoctorAuthProvider");
  return ctx;
}