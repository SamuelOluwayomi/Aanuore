import React, { useState, useEffect } from 'react';
import { 
  LockKey, 
  ShieldCheck, 
  ShieldWarning, 
  Eye, 
  EyeSlash, 
  Sparkle,
  ArrowRight
} from '@phosphor-icons/react';
import { 
  verifyPassword, 
  getLockoutStatus
} from '../services/security';

export default function LockScreen({ onAuthenticated }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Rate-limiting Lockout countdown
  const [lockout, setLockout] = useState(getLockoutStatus());

  useEffect(() => {
    let timer;
    if (lockout.isLocked) {
      timer = setInterval(() => {
        const current = getLockoutStatus();
        setLockout(current);
        if (!current.isLocked) clearInterval(timer);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [lockout.isLocked]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const success = await verifyPassword(password);
      if (success) {
        onAuthenticated();
      } else {
        const status = getLockoutStatus();
        setLockout(status);
        if (status.isLocked) {
          setErrorMsg(`Too many failed attempts. Locked out for ${Math.ceil(status.remainingSecs / 60)} minutes.`);
        } else {
          setErrorMsg(`Incorrect password. Please verify credentials.`);
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication error');
    } finally {
      setIsLoading(false);
      setPassword('');
    }
  };

  const formatLockoutTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#ede9df] text-ink flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Architectural Checkered Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-80">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="lockCheckeredGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(10,10,10,0.12)" strokeWidth="1.2" />
              <path d="M 40 0 L 40 80 M 0 40 L 80 40" fill="none" stroke="rgba(10,10,10,0.08)" strokeWidth="1" />
              <path d="M 37 40 L 43 40 M 40 37 L 40 43" stroke="rgba(10,10,10,0.25)" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lockCheckeredGrid)" />
        </svg>
      </div>

      {/* Decorative Stickers & SVGs */}
      <div className="absolute top-10 left-10 pointer-events-none opacity-40 hidden sm:block">
        <img src="/sparkles.svg" alt="" className="w-16 h-16 animate-pulse" />
      </div>
      <div className="absolute bottom-10 right-10 pointer-events-none opacity-30 hidden sm:block">
        <img src="/twist.svg" alt="" className="w-16 h-16" />
      </div>

      {/* Main Neo-brutalist Glass Card */}
      <div className="w-full max-w-md bg-white border-2 border-black rounded-3xl p-6 sm:p-9 shadow-xl relative z-10 hover-glow transition-all">
        
        {/* Floating Camera Badge on top-right of card */}
        <div className="absolute -top-4 -right-3 pointer-events-none drop-shadow-md z-20">
          <div className="bg-accent-yellow border-2 border-black p-1.5 rounded-2xl shadow-sm rotate-6">
            <img src="/camera3.svg" alt="" className="w-8 h-8 object-contain" />
          </div>
        </div>

        {/* Top Header Badge */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img src="/aanuore-logo.png" alt="Aanuore" className="h-7 w-auto object-contain" />
            <span className="font-bold text-xl text-ink font-display-title">
              aanuore
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-accent-yellow border-2 border-black px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider text-ink mb-2 -rotate-1 shadow-2xs">
            <Sparkle size={11} weight="fill" className="text-accent-purple" />
            <span>SECURE STUDIO MANAGER</span>
          </div>

          <h1 className="font-condensed text-3xl sm:text-4xl text-ink uppercase tracking-tight leading-none mt-1">
            Studio Authentication
          </h1>
          <p className="text-xs text-ink-muted mt-1.5 max-w-xs mx-auto">
            Enter your master credentials to update photographs and live catalog.
          </p>
        </div>

        {/* Lockout Warning Banner */}
        {lockout.isLocked && (
          <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border-2 border-red-500 text-red-600 text-xs flex items-center gap-2.5 shadow-2xs">
            <ShieldWarning size={22} weight="fill" className="shrink-0" />
            <div>
              <span className="font-bold block">Access Temporarily Suspended</span>
              <span className="text-[11px]">
                Too many failed attempts. Try again in: <strong>{formatLockoutTime(lockout.remainingSecs)}</strong>
              </span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10.5px] font-mono font-bold uppercase tracking-widest text-ink-muted mb-1.5">
              // MASTER PASSWORD //
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                disabled={lockout.isLocked || isLoading}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-[#faf8f2] border-2 rounded-2xl px-4 py-3 text-xs sm:text-sm text-ink focus:outline-none transition-all ${
                  errorMsg ? 'border-red-500' : 'border-black'
                } ${lockout.isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-black transition-colors cursor-pointer"
              >
                {showPassword ? <EyeSlash size={16} weight="bold" /> : <Eye size={16} weight="bold" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 bg-red-50 border-2 border-red-500 rounded-xl text-red-600 text-xs font-bold text-center">
              {errorMsg}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={lockout.isLocked || isLoading}
            className={`w-full py-3.5 bg-black hover:bg-accent-purple text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border-2 border-black active:scale-95 ${
              lockout.isLocked || isLoading ? 'opacity-40 cursor-not-allowed' : ''
            }`}
          >
            <span>{isLoading ? 'Verifying...' : 'Unlock Studio'}</span>
            <ArrowRight size={15} weight="bold" />
          </button>
        </form>

        {/* Security Footer Note */}
        <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between text-[10.5px] font-mono font-bold text-ink-muted">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} weight="bold" className="text-accent-purple" />
            <span>SHA-256 ENCRYPTED</span>
          </div>
          <span>SESSION: 60 MIN</span>
        </div>

      </div>

    </div>
  );
}
