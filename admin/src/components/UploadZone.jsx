import React, { useRef, useState } from 'react';
import { UploadSimple, FileImage, Sparkle, CheckCircle } from '@phosphor-icons/react';
import { uploadToCloudinary } from '../services/imageUploader';
import { adminStore } from '../services/adminStore';

export default function UploadZone({ onUploadComplete }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentFileName, setCurrentFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleFiles = async (filesList) => {
    const files = Array.from(filesList).filter((f) => f.type.startsWith('image/'));
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setCurrentFileName(file.name);
      try {
        const imageUrl = await uploadToCloudinary(file);
        const title = file.name.replace(/\.[^/.]+$/, '');
        adminStore.addImage(imageUrl, title);
        setUploadProgress(Math.round(((i + 1) / files.length) * 100));
      } catch (err) {
        console.error('Error uploading file:', file.name, err);
      }
    }

    setIsUploading(false);
    setCurrentFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onUploadComplete) onUploadComplete();
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="w-full mb-8">
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFiles(e.target.files)}
        multiple
        accept="image/*"
        className="hidden"
      />

      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`w-full border-2 border-dashed rounded-3xl p-6 sm:p-10 text-center transition-all cursor-pointer relative overflow-hidden bg-white shadow-sm hover-glow ${
          isDragging 
            ? 'border-accent-purple bg-purple-50/50 scale-[1.01]' 
            : 'border-black hover:border-accent-purple'
        }`}
      >
        
        {/* Decorative Badge */}
        <div className="absolute top-4 right-4 pointer-events-none hidden sm:block">
          <div className="bg-accent-yellow border-2 border-black px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider text-ink -rotate-3 shadow-2xs">
            BATCH DROPZONE
          </div>
        </div>

        {/* Camera Icon Container */}
        <div className="w-16 h-16 rounded-2xl bg-white border-2 border-black p-2 flex items-center justify-center mx-auto mb-3.5 shadow-sm -rotate-3 group-hover:rotate-0 transition-transform">
          <img src="/camera3.svg" alt="Upload" className="w-10 h-10 object-contain" />
        </div>

        <h3 className="font-condensed text-2xl sm:text-3xl text-ink uppercase tracking-tight mb-1">
          {isUploading ? 'Processing & Optimizing Photographs...' : 'Drop New Photographs Here'}
        </h3>
        
        <p className="text-xs text-ink-muted max-w-md mx-auto">
          {isUploading 
            ? `Uploading ${currentFileName} (${uploadProgress}%)`
            : 'Click or drag high-resolution JPG, PNG, WEBP files to instantly add to the portfolio showcase.'}
        </p>

        {/* Upload Progress Bar */}
        {isUploading && (
          <div className="mt-5 max-w-md mx-auto">
            <div className="w-full bg-[#ede9df] border-2 border-black rounded-full h-3.5 overflow-hidden p-0.5">
              <div 
                className="bg-accent-purple h-full transition-all duration-300 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-ink font-bold mt-1.5 block">
              {uploadProgress}% OPTIMIZED &amp; READY
            </span>
          </div>
        )}

      </div>
    </div>
  );
}
