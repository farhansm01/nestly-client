"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { HiPhoto, HiArrowUpTray, HiXMark, HiCheckCircle, HiTrash } from "react-icons/hi2";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "46bceca044842747af17d07992ff9bed";

export default function ImageUploader({ images = [], setImages }) {
  const [uploading, setUploading] = useState(false);
  const [manualUrl, setManualUrl] = useState("");

  const uploadFileToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`ImgBB upload failed with status ${res.status}`);
    }

    const data = await res.json();
    if (data?.success && data?.data?.url) {
      return data.data.url;
    } else {
      throw new Error(data?.error?.message || "Failed to upload image to ImgBB");
    }
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      setUploading(true);
      toast.loading("Uploading image(s) to ImgBB...", { id: "imgbb-upload" });

      const uploadPromises = files.map((file) => uploadFileToImgBB(file));
      const uploadedUrls = await Promise.all(uploadPromises);

      setImages([...images, ...uploadedUrls]);
      toast.success(`Successfully uploaded ${uploadedUrls.length} image(s)!`, {
        id: "imgbb-upload",
      });
    } catch (err) {
      toast.error(err.message || "Failed to upload to ImgBB", {
        id: "imgbb-upload",
      });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleAddManualUrl = () => {
    if (!manualUrl.trim()) return;
    setImages([...images, manualUrl.trim()]);
    setManualUrl("");
    toast.success("Image URL added!");
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages(images.filter((_, idx) => idx !== indexToRemove));
  };

  const setAsPrimaryCover = (index) => {
    if (index === 0) return;
    const updated = [...images];
    const [selected] = updated.splice(index, 1);
    updated.unshift(selected);
    setImages(updated);
    toast.success("Set as primary cover image!");
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div className="border-2 border-dashed border-[var(--border-color)] hover:border-teal-500 rounded-3xl p-6 sm:p-8 text-center bg-[var(--bg-card-subtle)] transition-colors">
        <input
          type="file"
          id="imgbb-file-input"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
        />

        <label
          htmlFor="imgbb-file-input"
          className="cursor-pointer flex flex-col items-center justify-center space-y-3"
        >
          <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center border border-teal-500/20">
            {uploading ? (
              <div className="w-6 h-6 border-3 border-teal-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <HiArrowUpTray className="w-7 h-7" />
            )}
          </div>

          <div>
            <p className="text-sm font-bold text-[var(--text-main)]">
              {uploading ? "Uploading to ImgBB Cloud..." : "Click to Upload Property Images"}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Select one or multiple photos (JPG, PNG, WEBP). Auto-saved to ImgBB CDN.
            </p>
          </div>
        </label>
      </div>

      {/* Manual URL Input Fallback */}
      <div className="flex items-center gap-2">
        <input
          type="url"
          placeholder="Or paste direct image URL (Unsplash / ImgBB)..."
          value={manualUrl}
          onChange={(e) => setManualUrl(e.target.value)}
          className="flex-1 bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-500"
        />
        <button
          type="button"
          onClick={handleAddManualUrl}
          className="btn btn-sm bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card)] text-teal-500 border border-[var(--border-color)] font-semibold rounded-xl px-4"
        >
          Add URL
        </button>
      </div>

      {/* Uploaded Images Gallery Grid & Previews */}
      {images.length > 0 && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
            <span>Uploaded Property Photos ({images.length})</span>
            <span className="text-[10px] text-teal-500 normal-case font-normal">
              ★ First photo is used as Primary Cover Image
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((url, idx) => (
              <div
                key={idx}
                className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 group bg-[var(--bg-card-subtle)] ${
                  idx === 0
                    ? "border-teal-500 shadow-md shadow-teal-900/30"
                    : "border-[var(--border-color)]"
                }`}
              >
                <img src={url} alt={`Property image ${idx + 1}`} className="w-full h-full object-cover" />

                {/* Primary Cover Badge */}
                {idx === 0 ? (
                  <span className="absolute top-2 left-2 text-[9px] font-extrabold px-2 py-0.5 rounded-md bg-teal-600 text-white shadow-md">
                    PRIMARY COVER
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAsPrimaryCover(idx)}
                    className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Set as Cover
                  </button>
                )}

                {/* Remove Image Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600/90 text-white hover:bg-red-600 shadow-md transition-colors opacity-90 hover:opacity-100"
                  title="Delete Image"
                >
                  <HiTrash className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
