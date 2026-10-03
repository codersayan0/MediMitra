# 🩺 MediMitra

### AI-Powered Multilingual Healthcare Platform

> **MediMitra** is a workflow-driven healthcare platform designed to
> connect patients, doctors, and administrators through secure digital
> health workflows, AI-assisted medical information processing, document
> intelligence, and personalized healthcare assistance.

```{=html}
<p align="center">
```
`<strong>`{=html}Patient • Doctor • Admin • AI • RAG • Medical Documents
• Appointments`</strong>`{=html}
```{=html}
</p>
```

------------------------------------------------------------------------

## ✨ Why MediMitra?

Healthcare information is often scattered across prescriptions, reports,
previous consultations, and conversations.

**MediMitra brings these pieces together into one structured healthcare
journey.**

``` text
Patient
   │
   ├── Create Health Problem
   │
   ├── AI Interview
   │
   ├── Upload Medical Documents
   │
   ├── OCR + Document Understanding
   │
   ├── Patient History + RAG
   │
   ├── AI-Assisted Case Summary
   │
   └── Book Doctor
              │
              ▼
           Doctor
              │
              ├── Review Case
              ├── Consultation
              └── Prescription
              │
              ▼
        Patient Medical History
```

The goal is to make MediMitra a **coherent healthcare workflow**, rather
than a collection of disconnected dashboard pages.

------------------------------------------------------------------------

# 🌟 Core Features

## 👤 Patient Portal

-   Secure patient registration and login
-   Email OTP verification
-   JWT-based authentication
-   Forgot-password workflow
-   Patient profile management
-   Multilingual interface
-   Light and dark themes
-   Health case creation
-   AI-assisted health interview
-   Interview skip option
-   Voice input/output support
-   Medical document management
-   Medical history
-   AI-generated case summaries
-   Doctor search and appointment workflow
-   Appointment tracking
-   Prescription history
-   Medical timeline
-   Personal AI assistant
-   Responsive dashboard

### Patient Dashboard

``` text
Overview
New Health Problem
Current Cases
Medical History
Documents
Appointments
Prescriptions
AI Assistant
Profile
Settings
```

------------------------------------------------------------------------

# 👨‍⚕️ Doctor Portal

The doctor portal is designed around the clinical workflow created from
patient cases.

### Doctor Dashboard

``` text
Overview
Appointments
Patients
My Schedule
Consultations
Prescriptions
Medical Records
Earnings
Profile
Settings
AI Assistant
```

Doctors can eventually:

-   View permitted patient cases
-   Review appointment requests
-   Manage consultation schedules
-   Review patient summaries
-   View relevant medical documents
-   Record consultation notes
-   Create prescriptions
-   Review previous visits
-   Use the doctor AI assistant

> Doctor access is restricted to patients/cases the doctor is authorized
> to access through the appointment and case workflow.

------------------------------------------------------------------------

# 🛡️ Admin Portal

The Admin portal intentionally remains simple.

### Admin Dashboard

``` text
Dashboard
Patients
Doctors
User Management
Reports & Analytics
Settings
```

Admin functionality focuses on **account administration**, not
unnecessary clinical access.

### Patient management

-   View patient account information
-   Search patients
-   Filter accounts
-   View account status
-   Deactivate/remove patient account

### Doctor management

-   View doctor account information
-   Search doctors
-   Filter accounts
-   View account status
-   Doctor verification workflow
-   Deactivate/remove doctor account

Admin should not unnecessarily access:

-   Patient AI conversations
-   Medical reports
-   Diagnoses
-   Prescriptions
-   Private clinical case information

------------------------------------------------------------------------

# 🤖 AI & RAG Architecture

MediMitra uses an AI workflow rather than a simple chatbot.

``` text
Patient Input
     │
     ▼
Current Health Case
     │
     ├── AI Interview
     ├── Medical Documents
     └── Previous History
              │
              ▼
             RAG
              │
              ▼
        Relevant Context
              │
              ▼
            Gemini
              │
              ▼
     Structured AI Output
              │
              ▼
       Patient/Doctor Review
```

## Patient-specific RAG

Private patient information must always be filtered by the authenticated
patient identity.

``` text
Patient Question
      ↓
JWT Authentication
      ↓
Patient ID
      ↓
Patient-specific retrieval
      ↓
Relevant medical context
      ↓
Gemini
      ↓
Response
```

The system must never blindly search all patient data.

------------------------------------------------------------------------

# 🧠 Adaptive AI Interview

The interview is designed to be adaptive.

Instead of:

``` text
Question 1
Question 2
Question 3
Question 4
Question 5
```

MediMitra can use the patient's previous answer to determine the next
relevant question.

``` text
Patient:
"I have stomach pain."

        ↓

AI identifies relevant areas

        ↓

AI:
"When did the pain start?"

        ↓

Patient:
"Yesterday."

        ↓

AI continues with relevant questions
```

The patient can also choose:

``` text
Skip Interview
```

and continue directly to the document stage.

------------------------------------------------------------------------

# 🌍 Multilingual Healthcare Experience

MediMitra is designed for:

``` text
🇬🇧 English
🇮🇳 বাংলা (Bengali)
🇮🇳 हिन्दी (Hindi)
```

Language support is intended to cover more than static UI text.

It can extend to:

-   Dashboard UI
-   AI interview
-   AI responses
-   Medical summaries
-   Document explanations
-   Voice input
-   Voice output
-   AI assistants

------------------------------------------------------------------------

# 📄 Medical Document Intelligence

Supported document categories include:

``` text
Prescription
Blood Report
X-Ray Report
Lab Report
Discharge Summary
Medical Report
Other
```

Planned processing pipeline:

``` text
Image / PDF
    ↓
OCR
    ↓
Text Extraction
    ↓
Document Classification
    ↓
Medical Information Extraction
    ↓
Case Context
    ↓
RAG
```

For the prototype architecture, document metadata and extracted text can
be stored in MongoDB while large files are handled through browser-side
storage such as IndexedDB. A production deployment should use secure
object storage for sensitive medical files.

------------------------------------------------------------------------

# 🏥 Health Case Architecture

The **Health Case** is the central entity connecting the patient, AI,
documents, history, and doctor workflow.

``` text
Patient
  │
  ▼
Health Case
  │
  ├── Interview
  ├── Documents
  ├── Previous History
  ├── AI Analysis
  ├── Patient Review
  └── Appointment
          │
          ▼
       Doctor
          │
          ├── Consultation
          └── Prescription
```

Example case lifecycle:

``` text
draft
  ↓
interviewing
  ↓
documents_pending
  ↓
analyzing
  ↓
review
  ↓
ready
  ↓
appointment_requested
  ↓
completed
  ↓
archived
```

------------------------------------------------------------------------

# 🧩 Technology Stack

## Frontend

  Technology       Purpose
  ---------------- ----------------------------
  React            UI
  TypeScript       Type safety
  Vite             Development/build
  HTML/CSS         UI structure/styling
  Responsive CSS   Mobile/tablet support
  Web Speech API   Initial voice input/output
  IndexedDB        Prototype document storage

## Backend

  Technology         Purpose
  ------------------ ----------------------
  Python             Backend language
  FastAPI            REST API
  Motor              Async MongoDB access
  PyMongo            MongoDB driver
  Pydantic           Validation
  JWT                Authentication
  Password hashing   Credential security

## AI / Document Intelligence

  Technology                    Purpose
  ----------------------------- ---------------------------------
  Gemini                        LLM/AI generation
  RAG                           Patient-context retrieval
  MongoDB Atlas Vector Search   Vector retrieval
  OCR                           Document text extraction
  Document classification       Medical document categorization

## Database

``` text
MongoDB Atlas
```

Potential collections include:

``` text
patients
doctors
admins
health_cases
documents
appointments
prescriptions
otp_verifications
audit_logs
```

------------------------------------------------------------------------

# 🏗️ Architecture

``` text
                    ┌──────────────────────┐
                    │      MediMitra       │
                    └──────────┬───────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
          Patient            Doctor            Admin
             │                 │                 │
             └─────────────────┼─────────────────┘
                               │
                         React + TypeScript
                               │
                         FastAPI REST API
                               │
              ┌────────────────┼────────────────┐
              │                │                │
           MongoDB          Gemini             RAG
              │                │                │
              │          LLM / Vision           │
              │                │                │
              └────────────────┼────────────────┘
                               │
                     Document Intelligence
                               │
                         OCR + Extraction
                               │
                        Health Case System
```

------------------------------------------------------------------------

# 📁 Frontend Structure

``` text
frontend/
└── src/
    ├── components/
    │   ├── patient/
    │   ├── doctor/
    │   └── admin/
    │
    ├── layouts/
    │   ├── PatientLayout.tsx
    │   ├── DoctorLayout.tsx
    │   └── AdminLayout.tsx
    │
    ├── pages/
    │   ├── patient/
    │   ├── doctor/
    │   └── admin/
    │
    ├── contexts/
    │   ├── AuthContext
    │   ├── DoctorAuthContext
    │   ├── AdminAuthContext
    │   ├── ThemeContext
    │   └── LanguageContext
    │
    ├── services/
    │   └── API services
    │
    ├── i18n/
    │   ├── patient/
    │   ├── doctor/
    │   └── admin/
    │
    └── styles/
```

------------------------------------------------------------------------

# 📁 Backend Structure

``` text
backend/
└── app/
    ├── api/
    │   ├── auth/
    │   ├── patient/
    │   ├── doctor/
    │   ├── admin/
    │   ├── cases/
    │   ├── documents/
    │   ├── appointments/
    │   ├── prescriptions/
    │   └── ai/
    │
    ├── services/
    │   ├── auth_service.py
    │   ├── case_service.py
    │   ├── interview_service.py
    │   ├── document_service.py
    │   ├── appointment_service.py
    │   ├── prescription_service.py
    │   └── ai/
    │
    ├── rag/
    │   ├── chunker.py
    │   ├── embeddings.py
    │   ├── retriever.py
    │   └── vector_store.py
    │
    ├── documents/
    │   ├── ocr_service.py
    │   ├── parser.py
    │   ├── classifier.py
    │   └── extractor.py
    │
    ├── models/
    │   ├── patient.py
    │   ├── doctor.py
    │   ├── case.py
    │   ├── document.py
    │   ├── appointment.py
    │   └── prescription.py
    │
    └── core/
        ├── config.py
        ├── database.py
        └── security.py
```

------------------------------------------------------------------------

# 🔐 Security

MediMitra handles sensitive healthcare information, so security is a
core architectural requirement.

Planned protections include:

-   JWT authentication
-   Role-based access control
-   Patient ownership checks
-   Doctor appointment/case access checks
-   Admin authorization
-   Secure password hashing
-   Input validation
-   Rate limiting
-   Audit logging
-   Secure file handling
-   Environment-based secrets
-   Patient data isolation

### Data isolation

``` text
Patient A
   │
   └── cannot access Patient B's medical data

Doctor
   │
   └── only accesses permitted patient cases

Admin
   │
   └── manages accounts without unnecessary clinical access
```

------------------------------------------------------------------------

# 📝 Audit Logging

Important actions should be recorded in an audit trail.

Examples:

``` text
Patient created case
Patient uploaded document
Doctor viewed case
Appointment approved
Appointment rejected
Prescription created
Admin removed account
```

This creates a traceable security and workflow history.

------------------------------------------------------------------------

# 🗺️ Development Roadmap

MediMitra is being developed in focused blocks rather than implementing
the entire system at once.

### Block A --- Foundation

``` text
Existing project cleanup
Reusable components
Patient dashboard
Health Case database
New Health Problem
```

### Block B --- AI Interview

``` text
Gemini integration
Adaptive questioning
Skip interview
Three languages
Voice input/output
```

### Block C --- Documents

``` text
Document upload
IndexedDB
OCR
Classification
Medical extraction
Document management
```

### Block D --- RAG + AI

``` text
Embeddings
Vector search
Patient-history retrieval
Case retrieval
Gemini analysis
Medical case report
AI safety/triage
Manual editing
History
```

### Block E --- Appointments

``` text
Doctor search
Doctor availability
Appointment booking
Doctor approval/rejection
```

### Block F --- Doctor Workflow

``` text
Doctor case view
Clinical review
Consultation
Prescription
```

### Block G --- Records

``` text
Appointment history
Prescription history
Medical timeline
```

### Block H --- AI Assistants

``` text
Patient AI Assistant
Doctor AI Assistant
```

### Block I --- Admin

``` text
Patient management
Doctor management
Doctor verification
Account deactivation/removal
```

### Block J --- Production

``` text
Notifications
Audit logs
Security hardening
Testing
Deployment
Monitoring
```

------------------------------------------------------------------------

# 🧪 Testing

Before production:

### Frontend

``` bash
npm run build
npm run lint
```

### Backend

``` bash
pytest
```

Important workflows to test:

``` text
Registration
Login
OTP
JWT
Case creation
AI interview
Document processing
RAG
Appointment
Doctor approval
Consultation
Prescription
Admin management
```

------------------------------------------------------------------------

# 🔄 End-to-End Workflow

The main MediMitra workflow is:

``` text
Patient
  ↓
Create Health Case
  ↓
AI Interview
  ↓
Complete / Skip
  ↓
Upload Documents
  ↓
OCR
  ↓
Document Classification
  ↓
Medical Extraction
  ↓
RAG
  ↓
Gemini Analysis
  ↓
Structured Case Summary
  ↓
Patient Review
  ↓
Book Doctor
  ↓
Doctor Approval
  ↓
Doctor Reviews Case
  ↓
Consultation
  ↓
Doctor Prescription
  ↓
Patient Prescription
  ↓
Medical History Updated
```

This end-to-end flow is the core of MediMitra.

------------------------------------------------------------------------

# 🎨 UI / UX Philosophy

MediMitra follows a consistent healthcare design language:

-   Professional healthcare appearance
-   Clean card-based interface
-   Rounded components
-   Clear information hierarchy
-   Soft shadows
-   Blue healthcare accent
-   Light mode
-   Dark mode
-   Responsive layouts
-   Desktop/tablet/mobile support
-   Accessible contrast
-   Loading states
-   Empty states
-   Error states
-   Confirmation dialogs
-   Consistent spacing and typography

Each role has its own dashboard while sharing the same MediMitra visual
identity.

------------------------------------------------------------------------

# ⚠️ Medical AI Safety

MediMitra's AI is designed as an **assistive information and
case-preparation system**, not a replacement for a qualified healthcare
professional.

AI-generated information should be clearly presented as AI-assisted
content and reviewed appropriately.

Potential emergency/red-flag situations should be handled with
urgent-care guidance rather than relying on normal chatbot interaction.

Actual medical diagnosis and prescriptions remain part of the qualified
doctor workflow.

------------------------------------------------------------------------

# 🚀 Local Development

## Backend

``` bash
cd backend

python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend:

``` text
http://localhost:8000
```

API documentation:

``` text
http://localhost:8000/docs
```

## Frontend

``` bash
cd frontend

npm install
npm run dev
```

Frontend:

``` text
http://localhost:5173
```

------------------------------------------------------------------------

# 🔑 Environment Variables

Never commit real credentials.

Example backend environment:

``` env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DATABASE=MediMitra

JWT_SECRET=your_secret

GEMINI_API_KEY=your_gemini_key

FRONTEND_URL=http://localhost:5173
```

Keep:

``` text
.env
```

out of Git.

Commit only:

``` text
.env.example
```

------------------------------------------------------------------------

# ☁️ Deployment

Planned deployment architecture:

``` text
                GitHub
                  │
        ┌─────────┴─────────┐
        │                   │
      Vercel              Render
        │                   │
    Frontend              FastAPI
                            │
                            ▼
                       MongoDB Atlas
                            │
                       Gemini API
```

------------------------------------------------------------------------

# 🤝 Contribution

MediMitra is being developed incrementally.

Recommended branch structure:

``` text
main
develop

feature/patient-case
feature/ai-interview
feature/documents
feature/rag
feature/appointments
feature/doctor
feature/admin
```

Before submitting changes:

``` bash
npm run build
npm run lint
```

and run the backend tests.

------------------------------------------------------------------------

# 📌 Project Status

### Current foundation

-   React + TypeScript + Vite frontend
-   FastAPI backend
-   MongoDB integration
-   Patient authentication
-   Doctor authentication
-   Admin authentication
-   JWT architecture
-   OTP architecture
-   Role-based routing
-   Patient dashboard
-   Doctor dashboard
-   Admin dashboard
-   Light/dark themes
-   English/Bengali/Hindi UI foundation

### In active development

-   Health Case workflow
-   AI interview
-   Medical document intelligence
-   OCR
-   RAG
-   Gemini integration
-   Doctor appointment workflow
-   Doctor clinical workflow
-   Prescription workflow
-   AI assistants
-   Admin account-management APIs
-   Production security and testing

------------------------------------------------------------------------

# 🎯 Vision

MediMitra aims to make healthcare information:

**Connected. Structured. Understandable. Accessible.**

The long-term goal is to create a healthcare platform where a patient's
information can move through a secure workflow:

``` text
Patient
   ↓
Health Information
   ↓
AI-assisted Case Preparation
   ↓
Medical Documents
   ↓
Relevant History
   ↓
Doctor
   ↓
Consultation
   ↓
Prescription
   ↓
Long-term Medical History
```

------------------------------------------------------------------------

## ❤️ Built with purpose

**MediMitra --- AI for Better Healthcare**

> *Technology should not replace the doctor.\
> It should help patients and doctors understand the information they
> already have.*

------------------------------------------------------------------------

### Developer

**Sayan Mandal**

B.Tech --- Computer Science & Engineering

MediMitra is developed as a technology-focused healthcare platform
combining modern web development, AI, document intelligence, RAG, and
secure role-based workflows.
