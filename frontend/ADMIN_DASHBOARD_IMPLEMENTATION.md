# MediMitra Admin Dashboard

Frontend-only admin portal built around the current MediMitra React/Vite project.

## Pages
- /admin/dashboard
- /admin/dashboard/patients
- /admin/dashboard/doctors
- /admin/dashboard/users
- /admin/dashboard/reports
- /admin/dashboard/settings

## Scope
The admin UI is intentionally limited to account administration:
- View patient accounts
- View doctor accounts
- Search/filter accounts
- Remove/deactivate accounts through a confirmation modal
- Account-level overview metrics
- Theme and language preferences

Clinical reports, diagnoses, prescriptions, AI conversations, and medical documents are not exposed in the admin UI.

## Backend integration
The current backend in this project exposes admin authentication but does not yet expose patient/doctor account-management endpoints. Therefore the account tables in this frontend use local sample state. Replace `AdminDataContext` mutations with API service calls when those admin endpoints are added.
