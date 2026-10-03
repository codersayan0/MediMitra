# MediMitra Patient Dashboard — Frontend Update

This update replaces the old single patient dashboard composition with a shared patient portal shell and nested pages.

## Routes

- `/patient/dashboard`
- `/patient/dashboard/new-health-problem`
- `/patient/dashboard/cases`
- `/patient/dashboard/history`
- `/patient/dashboard/documents`
- `/patient/dashboard/appointments`
- `/patient/dashboard/prescriptions`
- `/patient/dashboard/ai-assistant`
- `/patient/dashboard/profile`
- `/patient/dashboard/settings`

`/patient/profile` redirects to `/patient/dashboard/profile`.
`/patient/dashboard/new-case/*` remains backward-compatible and opens the new health-problem page.

## Included

1. PatientLayout
2. Sidebar
3. Header
4. Overview
5. New Health Problem
6. Current Cases
7. Medical History
8. Documents
9. Appointments
10. Prescriptions
11. Profile
12. Settings
13. AI Assistant standalone UI
14. Floating AI chatbot on every patient page
15. Existing ThemeContext light/dark integration
16. English/Bengali/Hindi patient portal dictionary
17. Responsive mobile drawer/table/card layouts

## Backend boundary

The overview attempts to read health cases through the existing `healthCaseService.getMine()` API and falls back to preview rows for visual development. New Health Problem uses the existing `healthCaseService.create()` endpoint. Profile uses the existing patient profile GET/PATCH service. Other sections are intentionally frontend-first preview UIs until their backend services are implemented.

Medical files are not uploaded to MongoDB by this UI. The Documents page only keeps newly selected files in browser state for the frontend phase; production should use secure object storage plus metadata in MongoDB.

## Verification checklist

- Switch header language: English → বাংলা → हिन्दी.
- Switch theme: light → dark → light.
- Refresh: theme and language remain because the existing contexts persist them in localStorage.
- Resize below 800px: sidebar becomes a drawer and content grids collapse.
- Resize below 520px: search hides, cards/tables simplify, and the floating AI control remains accessible.
- Confirm patient routes remain behind `ProtectedRoute`.
