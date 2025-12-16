import React, { useState } from 'react';
import { AppMode } from './types';
import ActionEditor from './components/StyleTransfer'; // Importing the rewritten component
import GeneralEditor from './components/GeneralEditor';
import ResultView from './components/ResultView';
import { PlayCircle, Layers, Sparkles, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

// --- Login Component ---
const LoginScreen: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded password for demo purposes
    if (input === '1234') {
      onLogin();
    } else {
      setError(true);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-[#050511] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Spectacular Background Effects */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-40 pointer-events-none">
            <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-cyan-500 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-purple-600 rounded-full blur-[120px] animate-pulse delay-700" />
            <div className="absolute top-[40%] left-[40%] w-[200px] h-[200px] bg-pink-500 rounded-full blur-[90px] opacity-60" />
         </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl w-full max-w-md z-10 animate-in zoom-in-95 duration-500 ring-1 ring-white/20">
            <div className="flex flex-col items-center mb-10">
                <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 p-4 rounded-2xl mb-6 shadow-lg shadow-cyan-500/30 rotate-3 hover:rotate-6 transition-transform">
                    <Lock className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">ArtFlow AI Studio</h1>
                <p className="text-slate-400 text-sm font-medium tracking-wide">AKSES KEAMANAN DIPERLUKAN</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2 group">
                    <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider ml-1 group-focus-within:text-cyan-300 transition-colors">Kata Sandi</label>
                    <input 
                        type="password" 
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            setError(false);
                        }}
                        placeholder="Masukkan kode akses..."
                        className="w-full bg-slate-900/50 border border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-5 py-4 text-white placeholder-slate-600 outline-none transition-all text-lg tracking-widest"
                        autoFocus
                    />
                </div>
                
                {error && (
                    <div className="flex items-center gap-3 text-red-300 text-sm bg-red-950/40 p-4 rounded-xl border border-red-500/20 animate-in slide-in-from-top-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"/>
                        <span><span className="font-bold">Error:</span> Kata sandi salah. (Hint: 1234)</span>
                    </div>
                )}

                <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] flex items-center justify-center gap-2 group"
                >
                    Buka Studio
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </form>
            
            <div className="mt-10 flex items-center justify-center gap-2 text-slate-500 text-xs font-medium">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>Lingkungan Terenkripsi</span>
            </div>
        </div>
    </div>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mode, setMode] = useState<AppMode>(AppMode.ACTION_SWAP);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  
  // If not authenticated, show Login Screen
  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  // Handlers for child components
  const handleProcessingStart = () => {
    setIsProcessing(true);
    setResultImage(null);
  };

  const handleProcessingEnd = (result: string | null, error?: string) => {
    setIsProcessing(false);
    if (result) {
      setResultImage(result);
    } else if (error) {
      alert(error); // Simple alert for now
    }
  };

  const closeResult = () => {
    setResultImage(null);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center pb-20 animate-in fade-in duration-700 font-sans selection:bg-cyan-500/30">
      {/* Spectacular Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] bg-indigo-900/10 rounded-full blur-[130px] mix-blend-screen" />
        <div className="absolute top-[20%] right-[0%] w-[50%] h-[60%] bg-cyan-900/10 rounded-full blur-[130px] mix-blend-screen" />
        <div className="absolute bottom-[0%] left-[20%] w-[60%] h-[50%] bg-fuchsia-900/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150"></div>
      </div>

      {/* Header */}
      <header className="w-full max-w-6xl mx-auto pt-10 pb-8 px-6 z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 group cursor-default">
          <div className="bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-3 rounded-2xl shadow-xl shadow-blue-500/20 group-hover:rotate-12 transition-transform duration-500">
            <Layers className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
              ArtFlow AI
            </h1>
            <p className="text-[10px] text-cyan-400 font-bold tracking-[0.2em] uppercase mt-0.5">Studio Edition</p>
          </div>
        </div>
        
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="text-xs font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-all flex items-center gap-2 group"
        >
          <Lock size={12} className="group-hover:text-cyan-400 transition-colors"/>
          Kunci Sesi
        </button>
      </header>

      {/* Main Card */}
      <main className="w-full max-w-5xl px-4 z-10">
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden ring-1 ring-white/5 relative">
          
          {/* Top Glow Line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/5 bg-black/20">
            <button
              onClick={() => setMode(AppMode.ACTION_SWAP)}
              className={`flex-1 flex items-center justify-center gap-3 py-6 text-sm font-bold tracking-wide transition-all relative overflow-hidden group ${
                mode === AppMode.ACTION_SWAP
                  ? 'text-cyan-400' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.7)] transition-transform duration-300 ${mode === AppMode.ACTION_SWAP ? 'translate-y-0' : 'translate-y-full'}`} />
              <PlayCircle size={20} className={mode === AppMode.ACTION_SWAP ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : ''}/>
              Ganti Aksi
            </button>
            <button
              onClick={() => setMode(AppMode.GENERAL_EDIT)}
              className={`flex-1 flex items-center justify-center gap-3 py-6 text-sm font-bold tracking-wide transition-all relative overflow-hidden group ${
                mode === AppMode.GENERAL_EDIT
                  ? 'text-fuchsia-400' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.7)] transition-transform duration-300 ${mode === AppMode.GENERAL_EDIT ? 'translate-y-0' : 'translate-y-full'}`} />
              <Sparkles size={20} className={mode === AppMode.GENERAL_EDIT ? 'drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]' : ''}/>
              Editor Ajaib
            </button>
          </div>

          {/* Content Area */}
          <div className="p-8 md:p-12 min-h-[550px] bg-gradient-to-b from-transparent to-black/30">
            {mode === AppMode.ACTION_SWAP ? (
              <div key="action-swap" className="animate-in slide-in-from-right-8 fade-in duration-500">
                <div className="mb-10 text-center">
                  <h2 className="text-3xl text-white font-bold mb-2 tracking-tight">Ubah Aktivitas Subjek</h2>
                  <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
                    Unggah foto dan beri tahu AI apa yang seharusnya dilakukan oleh orang dalam foto tersebut.
                  </p>
                </div>
                <ActionEditor 
                  onProcessingStart={handleProcessingStart} 
                  onProcessingEnd={handleProcessingEnd} 
                />
              </div>
            ) : (
              <div key="general-edit" className="animate-in slide-in-from-left-8 fade-in duration-500">
                <div className="mb-10 text-center">
                  <h2 className="text-3xl text-white font-bold mb-2 tracking-tight">Editor Ajaib</h2>
                  <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
                    Jelaskan perubahan visual apa pun yang Anda inginkan, dan AI akan mewujudkannya.
                  </p>
                </div>
                <GeneralEditor 
                  onProcessingStart={handleProcessingStart} 
                  onProcessingEnd={handleProcessingEnd} 
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Result Overlay */}
      <ResultView 
        resultImage={resultImage} 
        isLoading={isProcessing} 
        onClose={closeResult} 
      />
    </div>
  );
};

export default App;