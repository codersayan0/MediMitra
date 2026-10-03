interface NewCaseIntroCardProps {
  onStart: () => void;
  onSkip: () => void;
  disabled?: boolean;
}

export function NewCaseIntroCard({
  onStart,
  onSkip,
  disabled = false,
}: NewCaseIntroCardProps) {
  return (
    <section className="new-case-intro-card">
      <div className="new-case-intro-card__icon">
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 3.5c-4.7 0-8.5 3.1-8.5 7 0 2.1 1.1 4 2.9 5.3L5.3 19l3.7-1.4c1 .4 2 .6 3 .6 4.7 0 8.5-3.1 8.5-7s-3.8-7.7-8.5-7.7Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />

          <path
            d="M8.7 10.5h.01M12 10.5h.01M15.3 10.5h.01"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="new-case-intro-card__content">
        <span className="new-case-intro-card__eyebrow">
          AI-POWERED HEALTH INTAKE
        </span>

        <h2>Let&apos;s understand your health better</h2>

        <p>
          MediMitra can guide you through a structured health
          interview before you upload your medical reports.
          Your answers will later be combined with your medical
          documents and previous history for a doctor-ready case
          summary.
        </p>

        <div className="new-case-intro-card__features">
          <div>
            <span className="new-case-intro-card__feature-icon">
              T
            </span>
            <span>Voice &amp; Text Input</span>
          </div>

          <div>
            <span className="new-case-intro-card__feature-icon">
              A
            </span>
            <span>Multi-language Support</span>
          </div>

          <div>
            <span className="new-case-intro-card__feature-icon">
              +
            </span>
            <span>Personalized Case Summary</span>
          </div>
        </div>

        <div className="new-case-intro-card__actions">
          <button
            type="button"
            className="new-case-intro-card__primary"
            onClick={onStart}
            disabled={disabled}
          >
            Start Health Interview
          </button>

          <button
            type="button"
            className="new-case-intro-card__secondary"
            onClick={onSkip}
            disabled={disabled}
          >
            Skip Interview
          </button>
        </div>

        <p className="new-case-intro-card__notice">
          You can skip the interview and continue to medical
          document upload.
        </p>
      </div>
    </section>
  );
}