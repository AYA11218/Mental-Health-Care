import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, AlertCircle, CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'register' | 'forgot';
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onSuccess,
}) => {
  const { t, language } = useLanguage();
  const { logIn, signUp, signInWithGoogle, resetPassword } = useAuth();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync mode if initialMode changes
  React.useEffect(() => {
    setMode(initialMode);
    setErrorMsg('');
    setSuccessMsg('');
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const getFriendlyError = (err: any): string => {
    const code = err?.code || err?.message || '';
    if (code.includes('user-not-found') || code.includes('wrong-password') || code.includes('invalid-credential')) {
      return language === 'am' ? 'የተሳሳተ ኢሜይል ወይም የይለፍ ቃል አስገብተዋል።' : 'Invalid email or password. Please try again.';
    }
    if (code.includes('email-already-in-use')) {
      return language === 'am' ? 'ይህ የኢሜይል አድራሻ አስቀድሞ ተመዝግቧል። እባክዎ ይግቡ።' : 'This email address is already in use. Please sign in instead.';
    }
    if (code.includes('weak-password')) {
      return language === 'am' ? 'የይለፍ ቃሉ ጠንካራ አይደለም። ቢያንስ 6 ፊደላት ይጠቀሙ።' : 'Password is too weak. Please use at least 6 characters.';
    }
    if (code.includes('invalid-email')) {
      return language === 'am' ? 'እባክዎ ትክክለኛ የኢሜይል አድራሻ ያስገቡ።' : 'Please provide a valid email address.';
    }
    return err?.message || (language === 'am' ? 'ስህተት ተከስቷል። እባክዎ እንደገና ይሞክሩ።' : 'An unexpected error occurred. Please try again.');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      await logIn(email.trim(), password);
      setSuccessMsg(t.loginSuccess);
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 700);
    } catch (err: any) {
      setErrorMsg(getFriendlyError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (password.length < 6) {
      setErrorMsg(t.passwordRequirements);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg(t.passwordMismatch);
      return;
    }

    setLoading(true);
    try {
      await signUp(email.trim(), password, displayName.trim() || email.split('@')[0], phone.trim());
      setSuccessMsg(t.registerSuccess);
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 800);
    } catch (err: any) {
      setErrorMsg(getFriendlyError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg(language === 'am' ? 'እባክዎ ኢሜይልዎን ያስገቡ።' : 'Please enter your email address.');
      return;
    }
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      await resetPassword(email.trim());
      setSuccessMsg(t.resetSentSuccess);
    } catch (err: any) {
      setErrorMsg(getFriendlyError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);
    try {
      await signInWithGoogle();
      setSuccessMsg(t.loginSuccess);
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 600);
    } catch (err: any) {
      setErrorMsg(getFriendlyError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-emerald-900 text-white p-6 sm:p-7">
          {mode === 'forgot' ? (
            <div>
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className="flex items-center gap-1.5 text-xs text-teal-200 hover:text-white mb-2 font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {t.backToLogin}
              </button>
              <h3 className="text-xl font-bold tracking-tight">{t.authModalTitleForgot}</h3>
              <p className="text-xs text-teal-100/90 mt-1">{t.authModalSubtitleForgot}</p>
            </div>
          ) : (
            <div>
              <div className="flex space-x-1 bg-teal-950/40 p-1 rounded-xl mb-4 border border-teal-600/40">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    mode === 'login'
                      ? 'bg-white text-teal-900 shadow-xs'
                      : 'text-teal-200 hover:text-white'
                  }`}
                >
                  {t.tabLogin}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    mode === 'register'
                      ? 'bg-white text-teal-900 shadow-xs'
                      : 'text-teal-200 hover:text-white'
                  }`}
                >
                  {t.tabRegister}
                </button>
              </div>
              <h3 className="text-xl font-bold tracking-tight">
                {mode === 'login' ? t.authModalTitleLogin : t.authModalTitleRegister}
              </h3>
              <p className="text-xs text-teal-100/90 mt-1">
                {mode === 'login' ? t.authModalSubtitleLogin : t.authModalSubtitleRegister}
              </p>
            </div>
          )}
        </div>

        {/* Body Form */}
        <div className="p-6 sm:p-7 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {mode === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.emailLabel}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-semibold text-sm rounded-xl shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{t.resetBtn}</span>
              </button>
            </form>
          )}

          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.emailLabel}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    {t.passwordLabel}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setErrorMsg('');
                      setSuccessMsg('');
                    }}
                    className="text-xs font-medium text-teal-600 hover:text-teal-800 hover:underline"
                  >
                    {t.forgotPasswordLink}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.passwordPlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-semibold text-sm rounded-xl shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{t.loginBtn}</span>
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-slate-400">{t.orDivider}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-3"
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
                <span>{t.googleSignIn}</span>
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-slate-500 mr-1.5">{t.dontHaveAccount}</span>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className="text-xs font-semibold text-teal-700 hover:underline"
                >
                  {t.tabRegister}
                </button>
              </div>
            </form>
          )}

          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.fullNameLabel}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder={t.fullNamePlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.emailLabel}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.phoneLabel}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+251 91 123 4567"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.passwordLabel}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.passwordPlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.confirmPasswordLabel}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t.confirmPasswordPlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 mt-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:opacity-60 text-white font-semibold text-sm rounded-xl shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{t.registerBtn}</span>
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-slate-500 mr-1.5">{t.alreadyHaveAccount}</span>
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className="text-xs font-semibold text-teal-700 hover:underline"
                >
                  {t.tabLogin}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
