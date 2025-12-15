"use client";

import { useState, useCallback } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing-client";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  endpoint: "imageUploader" | "logoUploader" | "avatarUploader";
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  endpoint,
  className = "",
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const { startUpload, isUploading } = useUploadThing(endpoint, {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        onChange(res[0].ufsUrl);
      }
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
      alert("Erro ao fazer upload da imagem");
    },
  });

  const handleUpload = useCallback(
    async (file: File) => {
      if (!file) return;
      await startUpload([file]);
    },
    [startUpload]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleUpload(e.dataTransfer.files[0]);
      }
    },
    [handleUpload]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        handleUpload(e.target.files[0]);
      }
    },
    [handleUpload]
  );

  if (value) {
    return (
      <div className={`relative group ${className}`}>
        <img
          src={value}
          alt="Preview"
          className="w-full h-48 object-cover rounded-lg border border-zinc-700"
        />
        <button
          type="button"
          onClick={() => onChange(null)}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`relative ${className}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <label
        className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          dragActive
            ? "border-blue-500 bg-blue-500/10"
            : "border-zinc-700 hover:border-zinc-600 bg-zinc-800/50 hover:bg-zinc-800"
        }`}
      >
        <div className="flex flex-col items-center justify-center py-6">
          {isUploading ? (
            <>
              <Loader2 className="h-10 w-10 text-zinc-400 animate-spin mb-3" />
              <p className="text-sm text-zinc-400">Enviando...</p>
            </>
          ) : (
            <>
              <div className="p-3 rounded-full bg-zinc-700/50 mb-3">
                {dragActive ? (
                  <Upload className="h-6 w-6 text-blue-400" />
                ) : (
                  <ImageIcon className="h-6 w-6 text-zinc-400" />
                )}
              </div>
              <p className="text-sm text-zinc-400 mb-1">
                {dragActive ? "Solte a imagem aqui" : "Arraste uma imagem ou"}
              </p>
              {!dragActive && (
                <p className="text-xs text-blue-400 hover:text-blue-300">
                  clique para selecionar
                </p>
              )}
            </>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          disabled={isUploading}
          className="hidden"
        />
      </label>
    </div>
  );
}

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
  className?: string;
}

export function MultiImageUpload({
  value = [],
  onChange,
  maxImages = 10,
  className = "",
}: MultiImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      if (res) {
        const newUrls = res.map((file) => file.ufsUrl);
        onChange([...value, ...newUrls]);
      }
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
      alert("Erro ao fazer upload das imagens");
    },
  });

  const handleUpload = useCallback(
    async (files: FileList) => {
      if (!files.length) return;

      const remainingSlots = maxImages - value.length;
      if (remainingSlots <= 0) {
        alert(`Limite maximo de ${maxImages} imagens atingido`);
        return;
      }

      const filesToUpload = Array.from(files).slice(0, remainingSlots);
      await startUpload(filesToUpload);
    },
    [value, startUpload, maxImages]
  );

  const handleRemove = (index: number) => {
    const newUrls = [...value];
    newUrls.splice(index, 1);
    onChange(newUrls);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files) {
        handleUpload(e.dataTransfer.files);
      }
    },
    [handleUpload]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleUpload(e.target.files);
      }
    },
    [handleUpload]
  );

  return (
    <div className={className}>
      {/* Image Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {value.map((url, index) => (
            <div key={index} className="relative group aspect-video">
              <img
                src={url}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg border border-zinc-700"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {value.length < maxImages && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <label
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              dragActive
                ? "border-blue-500 bg-blue-500/10"
                : "border-zinc-700 hover:border-zinc-600 bg-zinc-800/50 hover:bg-zinc-800"
            }`}
          >
            <div className="flex flex-col items-center justify-center py-4">
              {isUploading ? (
                <>
                  <Loader2 className="h-8 w-8 text-zinc-400 animate-spin mb-2" />
                  <p className="text-sm text-zinc-400">Enviando...</p>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-zinc-400 mb-2" />
                  <p className="text-sm text-zinc-400">
                    Arraste imagens ou clique para selecionar
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {value.length}/{maxImages} imagens
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleChange}
              disabled={isUploading}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
}
