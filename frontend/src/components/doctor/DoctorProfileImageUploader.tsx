import { useRef, useState } from "react";
import { doctorProfileImageService } from "@/services/doctorProfileImage.service";
import { useLanguage } from "@/hooks/useLanguage";

interface DoctorProfileImageUploaderProps {
  onChange?: (dataUrl: string | null) => void;
}

export function DoctorProfileImageUploader({ onChange }: DoctorProfileImageUploaderProps) {
  const { t } = useLanguage();
  const [preview, setPreview] = useState<string | null>(() => doctorProfileImageService.get());
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    try {
      const dataUrl = await doctorProfileImageService.setFromFile(file);
      setPreview(dataUrl);
      onChange?.(dataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not process image.");
    }
  };

  const handleRemove = () => {
    doctorProfileImageService.remove();
    setPreview(null);
    onChange?.(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="profile-uploader">
      <div className="profile-uploader__avatar">
        {preview ? <img src={preview} alt="Profile preview" /> : <span aria-hidden="true">🩺</span>}
      </div>
      <div className="profile-uploader__actions">
        <label className="profile-uploader__pick">
          {preview ? t.doctorAuth.register.changeImage : t.doctorAuth.register.uploadImage}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
        {preview && (
          <button type="button" className="profile-uploader__remove" onClick={handleRemove}>
            {t.doctorAuth.register.removeImage}
          </button>
        )}
      </div>
      <p className="profile-uploader__hint">{t.doctorAuth.register.imageHint}</p>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}