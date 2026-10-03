import "./PatientCaseStepper.css";

export type PatientCaseStep =
  | "start"
  | "interview"
  | "documents"
  | "analysis"
  | "summary";

interface PatientCaseStepperProps {
  currentStep: PatientCaseStep;
}

const STEPS: Array<{
  id: PatientCaseStep;
  number: number;
  label: string;
}> = [
  {
    id: "start",
    number: 1,
    label: "Start",
  },
  {
    id: "interview",
    number: 2,
    label: "Health Questions",
  },
  {
    id: "documents",
    number: 3,
    label: "Upload Reports",
  },
  {
    id: "analysis",
    number: 4,
    label: "AI Analysis",
  },
  {
    id: "summary",
    number: 5,
    label: "Summary",
  },
];

export function PatientCaseStepper({
  currentStep,
}: PatientCaseStepperProps) {
  const currentIndex = STEPS.findIndex(
    (step) => step.id === currentStep,
  );

  return (
    <div className="patient-case-stepper">
      {STEPS.map((step, index) => {
        const completed = index < currentIndex;
        const active = index === currentIndex;

        return (
          <div
            className="patient-case-stepper__item"
            key={step.id}
          >
            <div
              className={[
                "patient-case-stepper__circle",
                completed
                  ? "patient-case-stepper__circle--completed"
                  : "",
                active
                  ? "patient-case-stepper__circle--active"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {completed ? "✓" : step.number}
            </div>

            <span
              className={[
                "patient-case-stepper__label",
                active
                  ? "patient-case-stepper__label--active"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {step.label}
            </span>

            {index < STEPS.length - 1 && (
              <div
                className={[
                  "patient-case-stepper__line",
                  index < currentIndex
                    ? "patient-case-stepper__line--completed"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}