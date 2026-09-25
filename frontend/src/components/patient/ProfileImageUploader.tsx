import { useRef, useState } from "react";
import { profileImageService } from "@/services/profileImage.service";
import { useLanguage } from "@/hooks/useLanguage";

interface ProfileImageUploaderProps {
  onChange?: (dataUrl: string | null) => void;
}

export function ProfileImageUploader({ onChange }: ProfileImageUploaderProps) {
  const { t } = useLanguage();
  const [preview, setPreview] = useState<string | null>(() => profileImageService.get());
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    try {
      const dataUrl = await profileImageService.setFromFile(file);
      setPreview(dataUrl);
      onChange?.(dataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not process image.");
    }
  };

  const handleRemove = () => {
    profileImageService.remove();
    setPreview(null);
    onChange?.(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="profile-uploader">
      <div className="profile-uploader__avatar">
        {preview ? <img src={preview} alt="Profile preview" /> : <span aria-hidden="true">🧑</span>}
      </div>
      <div className="profile-uploader__actions">
        <label className="profile-uploader__pick">
          {preview ? t.auth.register.changeImage : t.auth.register.uploadImage}
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
            {t.auth.register.removeImage}
          </button>
        )}
      </div>
      <p className="profile-uploader__hint">{t.auth.register.imageHint}</p>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}