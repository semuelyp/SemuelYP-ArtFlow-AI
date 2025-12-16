import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import Button from './Button';
import { Sparkles, AlertCircle, Eraser, Palette, Scissors, Box, Zap, Camera } from 'lucide-react';
import { editImage } from '../services/geminiService';

interface GeneralEditorProps {
  onProcessingStart: () => void;
  onProcessingEnd: (result: string | null, error?: string) => void;
}

const GeneralEditor: React.FC<GeneralEditorProps> = ({ onProcessingStart, onProcessingEnd }) => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);

  const predefinedPrompts = [
    { label: "Hapus Latar", icon: <Scissors size={14}/>, text: "Remove the background and make it white." },
    { label: "Cyberpunk", icon: <Zap size={14}/>, text: "Change the lighting to a neon cyberpunk style." },
    { label: "Sketsa", icon: <Eraser size={14}/>, text: "Turn this image into a detailed pencil sketch." },
    { label: "Kartun 3D", icon: <Box size={14}/>, text: "Transform this into a 3D Pixar-style cartoon character." },
    { label: "Film Klasik", icon: <Camera size={14}/>, text: "Apply a vintage 1980s film grain and color grade." },
    { label: "Surealis", icon: <Palette size={14}/>, text: "Make it a dreamlike surrealist painting." },
    { label: "Pertajam", icon: <Sparkles size={14}/>, text: "Enhance the colors, sharpness, and details of the image." },
  ];

  const handleEdit = async () => {
    if (!sourceImage || !prompt.trim()) {
      setError("Harap unggah gambar dan berikan instruksi.");
      return;
    }
    setError(null);
    onProcessingStart();

    try {
      const result = await editImage(sourceImage, prompt);
      onProcessingEnd(result);
    } catch (err) {
      onProcessingEnd(null, "Gagal mengedit gambar. Silakan coba lagi.");
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
       <div className="max-w-xl mx-auto">
        <ImageUpload 
            label="Unggah Gambar untuk Diedit" 
            image={sourceImage} 
            onImageChange={setSourceImage}
            className="mb-8" 
          />
       </div>

      <div className="bg-slate-800/40 p-8 rounded-3xl border border-white/5 backdrop-blur-md shadow-inner shadow-black/20">
        <label className="block text-sm font-bold text-fuchsia-200 mb-4 uppercase tracking-widest">
          Aksi Ajaib
        </label>
        
        <div className="flex flex-wrap gap-3 mb-6">
          {predefinedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setPrompt(p.text)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900/80 hover:bg-fuchsia-600 hover:text-white rounded-xl text-xs font-semibold text-slate-300 transition-all border border-slate-700 hover:border-fuchsia-400 hover:shadow-[0_0_15px_rgba(217,70,239,0.3)]"
            >
              {p.icon}
              {p.label}
            </button>
          ))}
        </div>

        <div className="relative group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Contoh: Ubah langit menjadi sore hari, tambahkan topi merah pada subjek..."
            className="w-full bg-slate-950/60 border border-slate-700 rounded-xl p-5 text-white placeholder-slate-600 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent min-h-[120px] resize-none outline-none transition-all shadow-inner"
          />
          <div className="absolute bottom-4 right-4 text-xs font-mono text-slate-600 group-focus-within:text-fuchsia-400">
            {prompt.length} karakter
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-950/30 border border-red-500/30 text-red-200 px-6 py-4 rounded-xl flex items-center gap-3 text-sm shadow-lg backdrop-blur-sm">
          <AlertCircle size={18} className="text-red-500" />
          {error}
        </div>
      )}

      <div className="flex justify-center">
        <Button 
          onClick={handleEdit} 
          disabled={!sourceImage || !prompt.trim()}
          className="w-full md:w-auto min-w-[280px] h-14 text-lg font-bold shadow-fuchsia-500/20 hover:shadow-fuchsia-500/40 rounded-2xl"
          variant="primary"
          icon={<Sparkles />}
        >
          Mulai Edit
        </Button>
      </div>
    </div>
  );
};

export default GeneralEditor;