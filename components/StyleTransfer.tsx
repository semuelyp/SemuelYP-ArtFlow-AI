import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import Button from './Button';
import { Play, AlertCircle, Coffee, Moon, Armchair, Dumbbell, Briefcase, Pizza } from 'lucide-react';
import { editImage } from '../services/geminiService';

interface ActionEditorProps {
  onProcessingStart: () => void;
  onProcessingEnd: (result: string | null, error?: string) => void;
}

const ActionEditor: React.FC<ActionEditorProps> = ({ onProcessingStart, onProcessingEnd }) => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [actionText, setActionText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const actions = [
    { label: "Makan", icon: <Pizza size={18} />, prompt: "Make the person eating a delicious meal" },
    { label: "Tidur", icon: <Moon size={18} />, prompt: "Make the person sleeping peacefully in a bed" },
    { label: "Bekerja", icon: <Briefcase size={18} />, prompt: "Make the person working on a laptop in an office" },
    { label: "Santai", icon: <Coffee size={18} />, prompt: "Make the person relaxing with a cup of coffee" },
    { label: "Duduk", icon: <Armchair size={18} />, prompt: "Make the person sitting comfortably on a chair" },
    { label: "Olahraga", icon: <Dumbbell size={18} />, prompt: "Make the person lifting weights in a gym" },
  ];

  const handleAction = async () => {
    if (!sourceImage || !actionText.trim()) {
      setError("Harap unggah foto dan tentukan aksi yang diinginkan.");
      return;
    }
    setError(null);
    onProcessingStart();

    try {
      // Sending text in English prefix + User input (which can be ID or EN)
      // The prompt logic handles the rest.
      const result = await editImage(sourceImage, `Change the subject's activity to: ${actionText}`);
      onProcessingEnd(result);
    } catch (err) {
      onProcessingEnd(null, "Gagal memproses gambar. Silakan coba lagi.");
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-xl mx-auto">
        <ImageUpload 
          label="Unggah Foto Anda" 
          image={sourceImage} 
          onImageChange={setSourceImage} 
        />
      </div>

      <div className="bg-slate-800/40 p-8 rounded-3xl border border-white/5 max-w-3xl mx-auto backdrop-blur-md shadow-inner shadow-black/20">
        <label className="block text-sm font-bold text-cyan-200 mb-6 text-center uppercase tracking-widest">
          Apa yang sedang dilakukan subjek?
        </label>

        {/* Action Presets */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {actions.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActionText(item.prompt)}
              className={`
                flex items-center justify-center gap-3 px-4 py-4 rounded-2xl text-sm font-semibold transition-all duration-300
                ${actionText === item.prompt 
                  ? 'bg-cyan-600 text-white shadow-[0_0_20px_rgba(8,145,178,0.4)] scale-105 border border-cyan-400' 
                  : 'bg-slate-900/60 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-500'}
              `}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* Custom Action Input */}
        <div className="relative group">
          <input
            type="text"
            value={actionText}
            onChange={(e) => setActionText(e.target.value)}
            placeholder="Atau ketik aksi khusus... (misal: bermain gitar di bulan)"
            className="w-full bg-slate-950/60 border border-slate-700 rounded-xl py-4 px-6 text-white placeholder-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all shadow-inner"
          />
          <div className="absolute inset-0 rounded-xl bg-cyan-500/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
        </div>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto bg-red-950/30 border border-red-500/30 text-red-200 px-6 py-4 rounded-xl flex items-center gap-3 text-sm shadow-lg backdrop-blur-sm">
          <AlertCircle size={18} className="text-red-500" />
          {error}
        </div>
      )}

      <div className="pt-4 flex justify-center">
        <Button 
          onClick={handleAction} 
          disabled={!sourceImage || !actionText.trim()}
          className="w-full md:w-auto min-w-[280px] h-14 text-lg font-bold shadow-cyan-500/20 hover:shadow-cyan-500/40 rounded-2xl"
          icon={<Play />}
        >
          Terapkan Aksi
        </Button>
      </div>
    </div>
  );
};

export default ActionEditor;