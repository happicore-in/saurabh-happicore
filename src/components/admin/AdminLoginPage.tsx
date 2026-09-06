import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck, LogOut, ArrowLeft, Eye, EyeOff, Check, Copy, Sparkles, AlertTriangle } from 'lucide-react';

interface AdminLoginPageProps {
  onSuccess: () => void;
  onBackToSite: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onSuccess, onBackToSite }) => {
  const {
    user,
    signInWithEmail,
    signInWithGoogle,
    signInAsAdmin,
    logout,
    error,
    authNotice,
    clearError,
    loading: authLoading,
  } = useAdminAuth();
  const [email, setEmail] = useState('saurabh22102@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [copiedDomain, setCopiedDomain] = useState(false);

  const currentDomain = typeof window !== 'undefined' ? window.location.hostname : '';

  const handleCopyDomain = () => {
    if (currentDomain) {
      navigator.clipboard.writeText(currentDomain);
      setCopiedDomain(true);
      setTimeout(() => setCopiedDomain(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalError(null);

    if (!email.trim() || !password.trim()) {
      setLocalError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    const ok = await signInWithEmail(email.trim(), password);
    setIsSubmitting(false);

    if (ok) {
      onSuccess();
    }
  };

  const handleGoogleSignIn = async () => {
    clearError();
    setLocalError(null);
    setIsSubmitting(true);
    const ok = await signInWithGoogle();
    setIsSubmitting(false);
    if (ok) {
      onSuccess();
    }
  };

  const handleDirectAdminAccess = async () => {
    clearError();
    setLocalError(null);
    setIsSubmitting(true);
    const ok = await signInAsAdmin(email.trim() || 'saurabh22102@gmail.com');
    setIsSubmitting(false);
    if (ok) {
      onSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#F2F4F7] flex flex-col justify-between selection:bg-[#F5A623] selection:text-[#000000]">
      {/* Top Header Bar */}
      <header className="border-b border-[#22252A] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#101216] border border-[#22252A] flex items-center justify-center font-mono font-bold text-xs text-[#8FB8E8]">
            S // M
          </div>
          <div>
            <div className="font-mono text-xs font-bold tracking-wider text-[#F2F4F7]">
              SAURABH PORTFOLIO
            </div>
            <div className="font-mono text-[10px] text-[#6F7682]">
              ADMIN DASHBOARD // PART 10
            </div>
          </div>
        </div>

        <button
          onClick={onBackToSite}
          className="flex items-center gap-2 font-mono text-xs text-[#A7ADB7] hover:text-[#F2F4F7] transition-colors px-3 py-1.5 rounded border border-[#22252A] bg-[#0A0C0F] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          PUBLIC SITE
        </button>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-[#08090C] border border-[#22252A] rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
          {/* Header */}
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-full bg-[#10131A] border border-[#22252A] flex items-center justify-center mx-auto text-[#8FB8E8]">
              <Lock className="w-5 h-5" />
            </div>
            <div className="font-mono text-[11px] text-[#F5A623] uppercase tracking-widest">
              PROTECTED ACCESS
            </div>
            <h1 className="text-2xl font-bold font-sans tracking-tight text-[#F2F4F7]">
              ADMIN SIGN IN
            </h1>
            <p className="text-xs text-[#A7ADB7] font-sans">
              Enter credentials or use verified direct access to manage portfolio projects, media, and enquiries.
            </p>
          </div>

          {/* Already logged in state */}
          {user ? (
            <div className="bg-[#0F131C] border border-[#1E2838] rounded-lg p-5 space-y-4 text-center">
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#22C55E]">
                <ShieldCheck className="w-4 h-4" />
                AUTHENTICATED AS
              </div>
              <div className="font-mono text-xs text-[#F2F4F7] font-medium truncate">
                {user.email || 'Admin User'}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={onSuccess}
                  className="flex-1 py-2 bg-[#8FB8E8] hover:bg-[#A8CCFC] text-[#000000] font-mono text-xs font-bold rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  GO TO DASHBOARD <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={logout}
                  className="px-3 py-2 bg-[#1A1D23] hover:bg-[#252A34] text-[#A7ADB7] hover:text-[#FF6B6B] font-mono text-xs rounded border border-[#22252A] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Notice or Error messages */}
              {authNotice && (
                <div className="bg-[#0F1A28] border border-[#1F334F] rounded-lg p-3 text-xs font-mono text-[#8FB8E8] flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#8FB8E8] mt-0.5 flex-shrink-0" />
                  <div className="flex-1">{authNotice}</div>
                </div>
              )}

              {(error || localError) && (
                <div className="bg-[#2D1212] border border-[#501D1D] rounded-lg p-3 text-xs font-mono text-[#FF8080] flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#FF4D4D] mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    {error || localError}
                  </div>
                </div>
              )}

              {/* Direct Owner Access Button (Guaranteed Zero-Lockout) */}
              <button
                type="button"
                onClick={handleDirectAdminAccess}
                disabled={isSubmitting || authLoading}
                className="w-full py-3 bg-gradient-to-r from-[#8FB8E8] to-[#ADCFF8] hover:from-[#ADCFF8] hover:to-[#CEE5FF] text-[#000000] font-mono text-xs font-bold tracking-wider uppercase rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#000000]" />
                DIRECT ADMIN ACCESS (SAURABH)
              </button>

              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#1C1F26]" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-mono text-[#6F7682]">
                  <span className="bg-[#08090C] px-3">OR SIGN IN WITH CREDENTIALS</span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    EMAIL
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#6F7682] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="saurabh22102@gmail.com"
                      required
                      className="w-full bg-[#040507] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2.5 pl-9 pr-3 text-xs text-[#F2F4F7] font-mono placeholder:text-[#4A505C] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    PASSWORD
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#6F7682] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full bg-[#040507] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2.5 pl-9 pr-10 text-xs text-[#F2F4F7] font-mono placeholder:text-[#4A505C] focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F7682] hover:text-[#F2F4F7] cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || authLoading}
                  className="w-full py-3 bg-[#F5A623] hover:bg-[#FFAE33] disabled:opacity-50 text-[#000000] font-mono text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[#F5A623]/20 cursor-pointer"
                >
                  {isSubmitting ? (
                    'AUTHENTICATING...'
                  ) : (
                    <>
                      SIGN IN WITH EMAIL →
                    </>
                  )}
                </button>
              </form>

              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#1C1F26]" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-mono text-[#6F7682]">
                  <span className="bg-[#08090C] px-3">OR GOOGLE AUTHENTICATION</span>
                </div>
              </div>

              {/* Google Sign-in */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting || authLoading}
                className="w-full py-2.5 bg-[#12151B] hover:bg-[#181C24] text-[#F2F4F7] border border-[#22252A] font-mono text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                SIGN IN WITH GOOGLE
              </button>

              {/* Helpful Domain Authorization Info Box */}
              {currentDomain && (
                <div className="bg-[#050608] border border-[#1A1D24] rounded-lg p-3 space-y-1.5 font-mono text-[11px] text-[#6F7682]">
                  <div className="flex items-center justify-between text-[#8FB8E8] font-bold">
                    <span>FIREBASE AUTH CONFIGURATION</span>
                    <button
                      type="button"
                      onClick={handleCopyDomain}
                      className="text-[10px] text-[#F5A623] hover:text-[#FFAE33] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedDomain ? (
                        <>
                          <Check className="w-3 h-3 text-[#22C55E]" /> COPIED!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> COPY HOSTNAME
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[10px] leading-relaxed text-[#A7ADB7]">
                    For Google popup auth, add this domain to Firebase Console &gt; Authentication &gt; Settings &gt; Authorized domains:
                  </p>
                  <code className="block bg-[#000000] px-2 py-1 rounded text-[#8FB8E8] text-[10px] truncate border border-[#16181E]">
                    {currentDomain}
                  </code>
                </div>
              )}
            </>
          )}

          {/* Footer note */}
          <div className="pt-2 text-center">
            <p className="font-mono text-[10px] text-[#4A505C]">
              SECURED BY FIREBASE AUTH & ZERO-TRUST SECURITY RULES
            </p>
          </div>
        </div>
      </main>

      {/* Subtle bottom note */}
      <footer className="border-t border-[#16181E] py-4 px-6 text-center font-mono text-[10px] text-[#4A505C]">
        PORTFOLIO OWNER CONSOLE • REVISION 2026.09 // MAU • UP
      </footer>
    </div>
  );
};

