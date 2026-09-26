import { STORAGE_KEYS } from "@/constants";

const MAX_DIMENSION = 320;
const JPEG_QUALITY = 0.82;

/**
 * Dedicated service (namespaced storage key) for the doctor's optional
 * profile image. Structurally identical to profileImage.service.ts, kept as
 * its own file per spec rather than generalizing the patient service, so
 * neither role's image logic can accidentally regress the other.
 *
 * The image lives ONLY in localStorage — it is never sent to the backend,
 * never included in DoctorRegisterPayload, and never stored in MongoDB.
 */
export const doctorProfileImageService = {
  get(): string | null {
    return window.localStorage.getItem(STORAGE_KEYS.doctorProfileImage);
  },

  remove(): void {
    window.localStorage.removeItem(STORAGE_KEYS.doctorProfileImage);
  },

  async setFromFile(file: File): Promise<string> {
    if (!file.type.startsWith("image/")) {
      throw new Error("Please select an image file.");
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Image must be smaller than 5MB.");
    }

    const dataUrl = await resizeAndCompress(file);
    window.localStorage.setItem(STORAGE_KEYS.doctorProfileImage, dataUrl);
    return dataUrl;
  },
};

function resizeAndCompress(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the selected file."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Could not load the selected image."));
      img.onload = () => {
        const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas not supported."));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}