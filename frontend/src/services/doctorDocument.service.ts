import { STORAGE_KEYS } from "@/constants";
import type { DoctorDocumentRecord } from "@/types";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB — stays well within a browser's localStorage quota
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];

/**
 * Doctor medical document proof (degree / registration certificate).
 *
 * Per spec this file is LOCAL ONLY:
 *  - never sent to FastAPI
 *  - never included in DoctorRegisterPayload
 *  - never stored in MongoDB
 *  - never uploaded to Cloudinary/S3/any object store
 *
 * It lives solely in this browser's localStorage, under its own namespaced
 * key (medimitra_doctor_medical_document), separate from the profile image.
 */
export const doctorDocumentService = {
  get(): DoctorDocumentRecord | null {
    const raw = window.localStorage.getItem(STORAGE_KEYS.doctorMedicalDocument);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as DoctorDocumentRecord;
    } catch {
      return null;
    }
  },

  remove(): void {
    window.localStorage.removeItem(STORAGE_KEYS.doctorMedicalDocument);
  },

  async setFromFile(file: File): Promise<DoctorDocumentRecord> {
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error("Please upload a PDF, JPG or PNG file.");
    }
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File must be smaller than 3MB.");
    }

    const dataUrl = await readAsDataUrl(file);
    const record: DoctorDocumentRecord = {
      name: file.name,
      type: file.type,
      size: file.size,
      dataUrl,
    };

    try {
      window.localStorage.setItem(STORAGE_KEYS.doctorMedicalDocument, JSON.stringify(record));
    } catch {
      throw new Error("This device's storage is full. Try a smaller file.");
    }

    return record;
  },
};

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the selected file."));
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}