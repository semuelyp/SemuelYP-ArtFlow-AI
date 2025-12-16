import React from 'react';
import { Download, RefreshCw, XCircle } from 'lucide-react';
import Button from './Button';

interface ResultViewProps {
  resultImage: string | null;
  onClose: () => void;
  isLoading: boolean;
}

const ResultView: React.FC<ResultViewProps> = ({ resultImage, onClose, isLoading }) => {
  if (!resultImage && !isLoading) return null;

  const handleDownload = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `artflow-hasil-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 animate-in fade-in duration-500">
      <div className="bg-[#0b0f19] border border-white/10 rounded-[2rem] max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl shadow-indigo-900/50 overflow-hidden relative ring-1 ring-white/5">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5 relative z-10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3 tracking-tight">
            {isLoading ? (
              <span className="flex items-center gap-2">
                 <span className="animate-pulse text-cyan-400">⚡</span> Sedang Memproses...
              </span>
            ) : (
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                Hasil Ajaib
              </span>
            )}
          </h2>
          {!isLoading && (
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors hover:rotate-90 duration-300">
              <XCircle size={28} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-[#050511] relative z-10">
          {isLoading ? (
            <div className="text-center">
              <div className="relative w-28 h-28 mx-auto mb-8">
                <div className="absolute inset-0 border-t-4 border-cyan-500 rounded-full animate-spin shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
                <div className="absolute inset-3 border-r-4 border-purple-500 rounded-full animate-spin animation-delay-200 shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
                <div className="absolute inset-6 border-b-4 border-pink-500 rounded-full animate-spin animation-delay-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>
              </div>
              <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-purple-200 animate-pulse">AI sedang berimajinasi...</p>
              <p className="text-sm text-slate-500 mt-3 font-medium tracking-wide">Mohon tunggu sebentar</p>
            </div>
          ) : (
             <img 
               src={resultImage!} 
               alt="Generated Result" 
               className="max-w-full max-h-full rounded-xl shadow-2xl border border-white/10 ring-4 ring-black/50"
             />
          )}
        </div>

        {/* Footer */}
        {!isLoading && (
          <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end gap-4 relative z-10">
            <Button variant="secondary" onClick={onClose} icon={<RefreshCw size={20}/>} className="border border-white/10 hover:bg-white/10">
              Edit Lainnya
            </Button>
            <Button variant="primary" onClick={handleDownload} icon={<Download size={20}/>} className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-500/20">
              Unduh Gambar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultView;