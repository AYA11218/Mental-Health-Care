import React from 'react';
import {
  HeartHandshake,
  Globe,
  Calendar,
  User as UserIcon,
  LogOut,
  Sparkles,
  BookOpen,
  Smartphone,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onOpenAppointments: () => void;
  onNavigateHome: () => void;
  onScrollToGuides?: () => void;
  onOpenWallet?: () => void;
  appointmentsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onOpenAppointments,
  onNavigateHome,
  onScrollToGuides,
  onOpenWallet,
  appointmentsCount,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { currentUser, userProfile, logOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={onNavigateHome}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                {t.brandName}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/60">
                MD Care
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block -mt-0.5 font-medium">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
            <Globe className="w-4 h-4 text-slate-500 ml-1.5 mr-1" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                language === 'en'
                  ? 'bg-white text-teal-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('am')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                language === 'am'
                  ? 'bg-white text-teal-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              አማርኛ
            </button>
          </div>

          {/* Coping Guides Link */}
          {onScrollToGuides && (
            <button
              onClick={onScrollToGuides}
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span>{language === 'am' ? 'የአእምሮ ጤና መመሪያዎች' : 'Coping Guides'}</span>
            </button>
          )}

          {/* Secured Payment Wallet Button */}
          {onOpenWallet && (
            <button
              onClick={onOpenWallet}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-teal-800 bg-teal-50/80 hover:bg-teal-100/90 border border-teal-200/80 rounded-xl transition-all cursor-pointer"
              title="Telebirr & CBE Birr (+251944692238)"
            >
              <Smartphone className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="hidden sm:inline">{t.navWallet}</span>
              <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-200/70 px-1.5 py-0.5 rounded-md">
                Telebirr/CBE
              </span>
            </button>
          )}

          {/* My Appointments Button */}
          {currentUser && (
            <button
              onClick={onOpenAppointments}
              className="relative flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-teal-700 bg-slate-50 hover:bg-teal-50/70 border border-slate-200 rounded-xl transition-all"
            >
              <Calendar className="w-4 h-4 text-teal-600" />
              <span className="hidden md:inline">{t.navAppointments}</span>
              {appointmentsCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-teal-600 rounded-full">
                  {appointmentsCount}
                </span>
              )}
            </button>
          )}

          {/* Auth Controls */}
          {currentUser ? (
            <div className="flex items-center gap-2 sm:gap-3 pl-1 sm:pl-2 border-l border-slate-200">
              <div className="hidden lg:flex flex-col text-right">
                <span className="text-xs text-slate-400 font-medium">
                  {t.welcomeUser}
                </span>
                <span className="text-sm font-semibold text-slate-800 truncate max-w-[140px]">
                  {userProfile?.displayName || currentUser.displayName || currentUser.email?.split('@')[0]}
                </span>
              </div>
              <div className="w-9 h-9 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-800 font-bold text-sm">
                {(userProfile?.displayName || currentUser.email || 'U')[0].toUpperCase()}
              </div>
              <button
                onClick={() => logOut()}
                title={t.navSignOut}
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3 sm:px-4 py-2 text-sm font-semibold text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-xl transition-colors"
              >
                {t.navSignIn}
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 rounded-xl shadow-xs shadow-teal-700/20 transition-all hover:shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.navSignUp}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
