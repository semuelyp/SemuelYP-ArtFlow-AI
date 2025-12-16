import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  image: string | null;
  onImageChange: (image: string | null) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, image, onImageChange, className = '' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageChange(result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageChange(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <label className="text-sm font-bold text-slate-300 ml-1 tracking-wide uppercase">{label}</label>
      
      <div
        onClick={() => !image && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative group cursor-pointer transition-all duration-300
          border-2 border-dashed rounded-2xl h-56 sm:h-72 flex items-center justify-center overflow-hidden
          ${image ? 'border-indigo-500/50 bg-slate-900/80 shadow-[0_0_20px_rgba(99,102,241,0.1)]' : 
            isDragging ? 'border-cyan-400 bg-cyan-500/10 scale-[1.02] shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 'border-slate-700 hover:border-slate-500 hover:bg-slate-800/40'}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          accept="image/*"
          className="hidden"
        />

        {image ? (
          <>
            <img 
              src={image} 
              alt="Uploaded" 
              className="w-full h-full object-contain p-4" 
            />
            <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="p-3 bg-indigo-600 rounded-full hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 transform hover:scale-110 transition-all"
                title="Ganti Gambar"
              >
                <Upload size={24} />
              </button>
              <button 
                onClick={clearImage}
                className="p-3 bg-red-600 rounded-full hover:bg-red-500 text-white shadow-lg shadow-red-500/30 transform hover:scale-110 transition-all"
                title="Hapus Gambar"
              >
                <X size={24} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-slate-400 p-6 text-center group-hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 mb-4 rounded-full bg-slate-800/80 flex items-center justify-center ring-1 ring-white/10 group-hover:bg-cyan-500/20 group-hover:ring-cyan-500/50 transition-all">
              <ImageIcon size={32} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
            </div>
            <p className="font-bold text-lg text-slate-200 group-hover:text-cyan-200 transition-colors">Klik untuk unggah</p>
            <p className="text-sm text-slate-500 mt-1 font-medium">atau seret & lepas PNG, JPG</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;