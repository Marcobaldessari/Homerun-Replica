import React, { useCallback, useRef, useState } from "react";
import { Header } from "./FormHeader";
import { ProgressBar } from "./ProgressBar";
import { PriceRange } from "./PriceRange";
import { CTA } from "./CTA";

interface AttachmentsStepProps {
  serviceName: string;
  progressValue: number;
  onNext: (photos: File[]) => void;
  onBack: () => void;
  onClose: () => void;
}

const MAX_PHOTOS = 5;
const MAX_PHOTO_SIZE_MB = 16;

export const AttachmentsStep: React.FC<AttachmentsStepProps> = ({
  serviceName,
  progressValue,
  onNext,
  onBack,
  onClose,
}) => {
  const [photos, setPhotos] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddPhotosClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const validFiles = Array.from(files).filter(
          (file) => file.size <= MAX_PHOTO_SIZE_MB * 1024 * 1024
        );
        setPhotos((prev) => [...prev, ...validFiles].slice(0, MAX_PHOTOS));
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    []
  );

  const removePhoto = useCallback((index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full max-w-md mx-auto bg-white relative">
      <Header title={serviceName} onBackClick={onBack} onCloseClick={onClose} />

      <div className="bg-white flex justify-center py-1">
        <ProgressBar value={progressValue} />
      </div>

      <PriceRange minPrice="350 TL" maxPrice="1.100 TL" />

      <div className="flex flex-col flex-grow pb-24">
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-xl font-semibold text-[#0e0f11] leading-7">
            Do you want to add a photo?
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center h-[148px] px-[122px]">
          <button
            type="button"
            onClick={handleAddPhotosClick}
            disabled={photos.length >= MAX_PHOTOS}
            className="flex items-center gap-2 border-2 border-[#f0f1f2] rounded-lg px-4 py-[7px] disabled:opacity-50"
          >
            <span className="text-sm font-semibold text-[#292d33]">
              Add photos
            </span>
            <img src="/icons/Upload.svg" alt="" className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 flex flex-col gap-1">
          <span className="text-xs font-semibold text-[#6a7482]">
            {photos.length}/{MAX_PHOTOS} photos
          </span>
          <span className="text-xs text-[#6a7482]">
            Upload up to {MAX_PHOTOS} photos. Photos can&apos;t be bigger than{" "}
            {MAX_PHOTO_SIZE_MB} MB
          </span>
        </div>

        {photos.length > 0 && (
          <div className="px-6 pt-4 flex flex-wrap gap-2">
            {photos.map((photo, index) => (
              <div
                key={`${photo.name}-${index}`}
                className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#e3e5e8]"
              >
                <img
                  src={URL.createObjectURL(photo)}
                  alt={photo.name}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  aria-label="Remove photo"
                  className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#0e0f11]/70 text-white text-[10px] leading-4 text-center"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <CTA onClick={() => onNext(photos)}>Next</CTA>

      <div className="h-8 bg-white flex justify-center items-center">
        <div className="w-[134px] h-[5px] bg-[#0e0f11] rounded-full"></div>
      </div>
    </div>
  );
};
