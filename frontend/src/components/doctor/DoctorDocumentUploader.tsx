import { useRef, useState } from "react";
import { doctorDocumentService } from "@/services/doctorDocument.service";
import { useLanguage } from "@/hooks/useLanguage";

const ICONS: Record<string, string> = {
  "application/pdf": "📄",
  "image/jpeg": "🖼️",
  "image/jpg": "🖼️",
  "image/png": "🖼️",
};

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DoctorDocumentUploader() {
  const { t } = useLanguage();
  const [doc, setDoc] = useState(() => doctorDocumentService.get());
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    try {
      const record = await doctorDocumentService.setFromFile(file);
      setDoc(record);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not process file.");
    }
  };

  const handleRemove = () => {
    doctorDocumentService.remove();
    setDoc(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="doc-uploader">
      <span className="doc-uploader__icon" aria-hidden="true">
        {doc ? ICONS[doc.type] ?? "📎" : "📎"}
      </span>
      <div className="doc-uploader__meta">
        {doc && (
          <>
            <strong>{doc.name}</strong>
            <span>{formatSize(doc.size)}</span>
          </>
        )}
      </div>
      <div className="doc-uploader__actions">
        <label className="doc-uploader__pick">
          {doc ? t.doctorAuth.register.changeDocument : t.doctorAuth.register.uploadDocument}
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,image/jpeg,image/png"
            hidden
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
        {doc && (
          <button type="button" className="doc-uploader__remove" onClick={handleRemove}>
            {t.doctorAuth.register.removeDocument}
          </button>
        )}
      </div>
      <p className="doc-uploader__hint">{t.doctorAuth.register.documentHint}</p>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}