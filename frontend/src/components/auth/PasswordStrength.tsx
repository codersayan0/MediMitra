interface PasswordStrengthProps {
  password: string;
}

function scorePassword(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const LABELS = ["Very weak", "Weak", "Fair", "Good", "Strong"];

export function PasswordStrength({ password }: PasswordStrengthProps) {
  if (!password) return null;
  const score = scorePassword(password);
  const level = Math.max(0, score - 1);

  return (
    <div className="password-strength" aria-live="polite">
      <div className="password-strength__bars">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={`password-strength__bar ${i <= level ? `is-filled level-${level}` : ""}`} />
        ))}
      </div>
      <span className="password-strength__label">{LABELS[level]}</span>
    </div>
  );
}