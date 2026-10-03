import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PatientCaseStepper } from "../../../components/patient/PatientCaseStepper";
import { NewCaseIntroCard } from "../../../components/patient/NewCaseIntroCard";
import { healthCaseService } from "../../../services/healthCase.service";

import type { HealthCaseLanguage } from "../../../types";

import "./NewHealthCasePage.css";

export default function NewHealthCasePage() {
  const navigate = useNavigate();

  const [problem, setProblem] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  /*
   * Phase 1:
   * The existing i18n module does not currently expose useTranslation
   * in a way this page can consume.
   *
   * Keep the case language as English for now.
   * Multilingual case handling will be connected when the existing
   * language context/API is wired into this feature.
   */
  const selectedLanguage: HealthCaseLanguage = "en";

  async function createCase(
    nextStep: "interview" | "documents",
  ) {
    if (creating) return;

    setCreating(true);
    setError("");

    try {
      const result = await healthCaseService.create({
        title: problem.trim() || "New Health Problem",
        problem_description:
          problem.trim() || undefined,
        language: selectedLanguage,
      });

      if (!result.success || !result.data?.case) {
        setError(
          result.message ||
            "Unable to create your health case. Please try again.",
        );

        setCreating(false);
        return;
      }

      const caseId = result.data.case.case_id;

      if (nextStep === "interview") {
        navigate(
          `/patient/dashboard/new-case/${encodeURIComponent(
            caseId,
          )}/interview`,
        );
      } else {
        navigate(
          `/patient/dashboard/new-case/${encodeURIComponent(
            caseId,
          )}/documents`,
        );
      }
    } catch {
      setError(
        "Unable to create your health case. Please try again.",
      );
      setCreating(false);
    }
  }

  return (
    <main className="new-health-case-page">
      <div className="new-health-case-page__container">
        <header className="new-health-case-page__header">
          <div>
            <span className="new-health-case-page__eyebrow">
              PATIENT HEALTH JOURNEY
            </span>

            <h1>New Health Case</h1>

            <p>
              Start a structured health case that can later combine
              your interview, medical documents and relevant
              previous history.
            </p>
          </div>
        </header>

        <PatientCaseStepper currentStep="start" />

        <section className="new-health-case-page__problem">
          <label htmlFor="health-problem">
            What health problem are you experiencing?
            <span> Optional</span>
          </label>

          <textarea
            id="health-problem"
            value={problem}
            onChange={(event) =>
              setProblem(event.target.value)
            }
            placeholder="Briefly describe your current problem, symptoms or concern..."
            rows={4}
            maxLength={1000}
            disabled={creating}
          />

          <div className="new-health-case-page__counter">
            {problem.length}/1000
          </div>
        </section>

        {error && (
          <div
            className="new-health-case-page__error"
            role="alert"
          >
            {error}
          </div>
        )}

        <NewCaseIntroCard
          disabled={creating}
          onStart={() => createCase("interview")}
          onSkip={() => createCase("documents")}
        />

        <p className="new-health-case-page__privacy">
          Your case is linked to your authenticated patient
          account. Medical files will be handled separately from
          this case metadata.
        </p>
      </div>
    </main>
  );
}