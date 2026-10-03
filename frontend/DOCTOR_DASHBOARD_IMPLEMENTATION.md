# MediMitra Doctor Dashboard

Implemented from the supplied Doctor Dashboard reference image and the current MediMitra frontend structure.

## Pages
- `/doctor/dashboard` — Overview
- `/doctor/dashboard/appointments` — Appointments
- `/doctor/dashboard/patients` — Patients
- `/doctor/dashboard/schedule` — My Schedule
- `/doctor/dashboard/consultations` — Consultations
- `/doctor/dashboard/prescriptions` — Prescriptions
- `/doctor/dashboard/records` — Medical Records
- `/doctor/dashboard/earnings` — Earnings & Reports
- `/doctor/dashboard/profile` — Profile
- `/doctor/dashboard/settings` — Settings
- `/doctor/dashboard/ai-assistant` — AI Assistant

## Shared shell
`DoctorLayout` contains the reusable sidebar, header, responsive mobile navigation, theme/language controls, and floating AI chatbot.

## Theme
Uses the existing MediMitra `ThemeContext` and the global `data-theme` attribute. No second theme system is introduced.

## Languages
The doctor portal has its own complete UI dictionary for English, Bengali and Hindi in `src/i18n/doctorDashboard.ts`. It follows the existing global `LanguageContext`.

## Backend status
The supplied backend currently exposes doctor authentication/profile data, but not dashboard statistics, appointments, patient management, medical-record access, prescriptions, earnings, or doctor AI endpoints. Therefore the dashboard cards and tables are presentation data until those APIs are implemented. Authentication and doctor profile information continue to use the existing services/context.

## Next backend integration order
1. Doctor dashboard summary API
2. Appointment list + approve/reject/start consultation
3. Patient list + patient/case authorization
4. Schedule CRUD
5. Consultation notes
6. Prescription CRUD
7. Medical record access with strict appointment/case authorization
8. Earnings/report APIs
9. Doctor profile update
10. Notification preferences/security
11. Doctor AI/RAG endpoint with patient/case scoped authorization
