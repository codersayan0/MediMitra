import React, { useState } from "react";
import "./patient-overview.css";
import FloatingAIChat from "../../components/patient/FloatingAIChat";

type Language = "en" | "bn" | "hi";

interface PatientOverviewProps {
  language?: Language;
}

const translations = {
  en: {
    greeting: "Good Morning, Sayan",
    subtitle:
      "Here's your health overview. Take control of your health with MediMitra.",
    healthCases: "Health Cases",
    documents: "Documents",
    appointments: "Appointments",
    prescriptions: "Prescriptions",
    viewAll: "View All",
    recentCases: "Recent Health Cases",
    upcomingAppointment: "Upcoming Appointment",
    viewCase: "View Case",
    viewDetails: "View Details",
    inReview: "In Review",
    completed: "Completed",
    draft: "Draft",
    upcoming: "Upcoming",
    cardiologist: "Cardiologist",
    digestive: "Digestive System",
    musculoskeletal: "Musculoskeletal",
    today: "Today",
    nextMonth: "next month",
    recentMonth: "this month",
  },

  bn: {
    greeting: "শুভ সকাল, Sayan",
    subtitle:
      "এটি আপনার স্বাস্থ্য সংক্রান্ত সংক্ষিপ্ত বিবরণ। MediMitra-এর মাধ্যমে আপনার স্বাস্থ্যের যত্ন নিন।",
    healthCases: "স্বাস্থ্য সমস্যা",
    documents: "ডকুমেন্ট",
    appointments: "অ্যাপয়েন্টমেন্ট",
    prescriptions: "প্রেসক্রিপশন",
    viewAll: "সব দেখুন",
    recentCases: "সাম্প্রতিক স্বাস্থ্য সমস্যা",
    upcomingAppointment: "আসন্ন অ্যাপয়েন্টমেন্ট",
    viewCase: "কেস দেখুন",
    viewDetails: "বিস্তারিত দেখুন",
    inReview: "পর্যালোচনাধীন",
    completed: "সম্পন্ন",
    draft: "খসড়া",
    upcoming: "আসন্ন",
    cardiologist: "কার্ডিওলজিস্ট",
    digestive: "পরিপাকতন্ত্র",
    musculoskeletal: "মাসকুলোস্কেলেটাল",
    today: "আজ",
    nextMonth: "পরের মাসে",
    recentMonth: "এই মাসে",
  },

  hi: {
    greeting: "सुप्रभात, Sayan",
    subtitle:
      "यह आपका स्वास्थ्य अवलोकन है। MediMitra के साथ अपने स्वास्थ्य पर नियंत्रण रखें।",
    healthCases: "स्वास्थ्य मामले",
    documents: "दस्तावेज़",
    appointments: "अपॉइंटमेंट",
    prescriptions: "प्रिस्क्रिप्शन",
    viewAll: "सभी देखें",
    recentCases: "हाल के स्वास्थ्य मामले",
    upcomingAppointment: "आगामी अपॉइंटमेंट",
    viewCase: "केस देखें",
    viewDetails: "विवरण देखें",
    inReview: "समीक्षा में",
    completed: "पूर्ण",
    draft: "ड्राफ्ट",
    upcoming: "आगामी",
    cardiologist: "कार्डियोलॉजिस्ट",
    digestive: "पाचन तंत्र",
    musculoskeletal: "मस्कुलोस्केलेटल",
    today: "आज",
    nextMonth: "अगले महीने",
    recentMonth: "इस महीने",
  },
};

const caseData = [
  {
    icon: "♥",
    title: "Headache and Fever",
    category: "General Health",
    status: "review",
    date: "03 Oct 2026",
  },
  {
    icon: "◉",
    title: "Stomach Pain",
    category: "Digestive System",
    status: "completed",
    date: "12 Sep 2026",
  },
  {
    icon: "✚",
    title: "Back Pain",
    category: "Musculoskeletal",
    status: "draft",
    date: "01 Sep 2026",
  },
];

const PatientOverview: React.FC<PatientOverviewProps> = ({
  language = "en",
}) => {
  const t = translations[language];

  const [showChat, setShowChat] = useState(false);

  const stats = [
    {
      icon: "♥",
      value: 3,
      label: t.healthCases,
      footer: `+1 ${t.recentMonth}`,
      type: "red",
    },
    {
      icon: "▣",
      value: 8,
      label: t.documents,
      footer: t.viewAll,
      type: "blue",
    },
    {
      icon: "▦",
      value: 2,
      label: t.appointments,
      footer: t.upcoming,
      type: "purple",
    },
    {
      icon: "▤",
      value: 4,
      label: t.prescriptions,
      footer: t.viewAll,
      type: "green",
    },
  ];

  return (
    <div className="patient-overview">
      {/* Header */}
      <section className="overview-header">
        <div>
          <p className="overview-label">Patient Dashboard</p>

          <h1>{t.greeting}</h1>

          <p className="overview-subtitle">{t.subtitle}</p>
        </div>

        <div className="health-illustration" aria-hidden="true">
          <div className="health-circle">
            <span>+</span>
          </div>
          <div className="health-heart">♥</div>
        </div>
      </section>

      {/* Statistics */}
      <section className="overview-stat-grid">
        {stats.map((stat) => (
          <div className="overview-stat-card" key={stat.label}>
            <div className={`stat-icon ${stat.type}`}>
              {stat.icon}
            </div>

            <div className="stat-content">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>

              <button className="stat-link">
                {stat.footer}
                <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Main content */}
      <section className="overview-content-grid">
        {/* Recent cases */}
        <div className="overview-panel cases-panel">
          <div className="panel-header">
            <div>
              <h2>{t.recentCases}</h2>
              <p>View and manage your recent health cases.</p>
            </div>

            <button className="text-button">
              {t.viewAll}
              <span>→</span>
            </button>
          </div>

          <div className="case-list">
            {caseData.map((item) => (
              <div className="case-row" key={item.title}>
                <div className="case-icon">
                  {item.icon}
                </div>

                <div className="case-info">
                  <h3>{item.title}</h3>
                  <p>{item.category}</p>
                </div>

                <span className={`case-status ${item.status}`}>
                  {item.status === "review"
                    ? t.inReview
                    : item.status === "completed"
                    ? t.completed
                    : t.draft}
                </span>

                <span className="case-date">{item.date}</span>

                <button className="outline-button">
                  {t.viewCase}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment */}
        <div className="overview-panel appointment-panel">
          <div className="panel-header">
            <div>
              <h2>{t.upcomingAppointment}</h2>
              <p>Your next scheduled consultation.</p>
            </div>
          </div>

          <div className="doctor-card">
            <div className="doctor-avatar">
              RS
            </div>

            <div className="doctor-info">
              <h3>Dr. Rahul Sharma</h3>
              <p>{t.cardiologist}</p>
            </div>

            <span className="appointment-status">
              {t.upcoming}
            </span>
          </div>

          <div className="appointment-details">
            <div>
              <span className="detail-icon">▦</span>

              <div>
                <small>Date</small>
                <strong>10 Oct 2026</strong>
              </div>
            </div>

            <div>
              <span className="detail-icon">◷</span>

              <div>
                <small>Time</small>
                <strong>10:30 AM</strong>
              </div>
            </div>

            <div>
              <span className="detail-icon">⌖</span>

              <div>
                <small>Location</small>
                <strong>Apollo Clinic, Kolkata</strong>
              </div>
            </div>
          </div>

          <button className="appointment-button">
            {t.viewDetails}
          </button>
        </div>
      </section>

      {/* Floating AI */}
      <button
        className="ai-floating-button"
        onClick={() => setShowChat(true)}
        aria-label="Open MediMitra AI"
      >
        <span className="ai-bot-icon">✦</span>
        <span className="ai-button-text">
          Ask MediMitra AI
        </span>
      </button>

      {showChat && (
        <FloatingAIChat
          language={language}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
};

export default PatientOverview;