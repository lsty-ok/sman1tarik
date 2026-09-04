"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import Image from "next/image";
import { uploadImage } from "@/lib/storage";
import {
  UploadCloud,
  Link as LinkIcon,
  Loader2,
  Trash2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function ImageUploader({
  value,
  onChange,
  folder = "uploads",
  label = "Gambar",
}: ImageUploaderProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState(value || "");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar (JPG, PNG, WebP, dsb).");
      return;
    }

    // Limit size to 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran file maksimal 5MB.");
      return;
    }

    try {
      setError(null);
      setIsUploading(true);
      const uploadedUrl = await uploadImage(file, folder);
      onChange(uploadedUrl);
      setUrlInput(uploadedUrl);
    } catch (err: unknown) {
      const errMsg =
        err instanceof Error ? err.message : "Gagal mengunggah gambar. Silakan coba lagi.";
      setError(errMsg);
    } finally {
      setIsUploading(false);
    }
  };

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleApplyUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) {
      setError("Masukkan URL gambar yang valid.");
      return;
    }
    setError(null);
    onChange(trimmed);
  };

  const handleClearImage = () => {
    onChange("");
    setUrlInput("");
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full space-y-2.5">
      {label && (
        <label className="block text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      {/* When Image Value exists, show preview and remove/replace */}
      {value ? (
        <div className="relative border border-slate-200 rounded-2xl p-4 bg-slate-50/50 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-44 h-36 rounded-xl overflow-hidden bg-slate-200 border border-slate-200 flex-shrink-0">
            <Image
              src={value}
              alt="Preview gambar"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex-1 w-full space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>Gambar Terpasang</span>
            </div>
            <p className="text-xs text-slate-500 font-mono break-all line-clamp-2 bg-white p-2 rounded-lg border border-slate-100">
              {value}
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={handleClearImage}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors border border-rose-200/60"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus / Ganti Gambar</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Image upload / URL picker box */
        <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-xs">
          {/* Dual Tabs */}
          <div className="flex border-b border-slate-100 bg-slate-50/80 p-1 gap-1">
            <button
              type="button"
              onClick={() => {
                setActiveTab("upload");
                setError(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === "upload"
                  ? "bg-white text-slate-800 shadow-xs border border-slate-200/50"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload File</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("url");
                setError(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === "url"
                  ? "bg-white text-slate-800 shadow-xs border border-slate-200/50"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              <span>Gunakan URL</span>
            </button>
          </div>

          <div className="p-4 sm:p-5">
            {activeTab === "upload" ? (
              /* Drag & Drop Visual Area */
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 sm:p-8 cursor-pointer transition-all duration-150 ${
                  isDragging
                    ? "border-blue-500 bg-blue-50/50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 bg-slate-50/20"
                } ${isUploading ? "pointer-events-none opacity-80" : ""}`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={onFileInputChange}
                  className="hidden"
                  disabled={isUploading}
                />

                {isUploading ? (
                  <div className="flex flex-col items-center gap-2.5 py-4">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    <p className="text-sm font-medium text-slate-700">
                      Mengunggah gambar...
                    </p>
                    <p className="text-xs text-slate-400">Mohon tunggu sebentar</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl mb-1">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        Klik untuk upload{" "}
                        <span className="text-slate-500 font-normal">atau seret gambar ke sini</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        PNG, JPG, JPEG, atau WebP (maks. 5MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* URL Input Tab */
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => {
                      setUrlInput(e.target.value);
                      setError(null);
                    }}
                    placeholder="https://example.com/gambar.jpg"
                    className="flex-1 px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors"
                  >
                    Gunakan
                  </button>
                </div>

                {urlInput && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-500">Preview:</span>
                    <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                      <Image
                        src={urlInput}
                        alt="URL Preview"
                        fill
                        className="object-cover"
                        unoptimized
                        onError={() => {
                          setError("URL gambar tidak valid atau tidak dapat dimuat.");
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Inline Error Message */}
            {error && (
              <div className="mt-3 flex items-start gap-2 p-3 bg-rose-50 text-rose-700 rounded-xl text-xs border border-rose-100">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
