import React from 'react';
import { HeartHandshake, Shield, PhoneCall, Smartphone, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500 text-white flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                {t.brandName}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.tagline} • {t.footerDisclaimer}
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-medium pt-1">
              <Shield className="w-4 h-4" />
              <span>{t.footerPrivacy}</span>
            </div>
          </div>

          {/* Secured Payment Wallet */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.paymentWalletTitle}</span>
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-emerald-400 text-sm tracking-wide">
                  +251944692238
                </span>
                <span className="text-[10px] text-emerald-300 font-semibold bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-800">
                  Secured
                </span>
              </div>
              <div className="text-[11px] text-slate-300">
                {language === 'am' ? 'ቴሌብር (Telebirr) & ሲቢኢ ብር (CBE)' : 'Telebirr & CBE Birr (0944692238)'}
              </div>
              <div className="text-[10px] text-teal-400 flex items-center gap-1 pt-1 border-t border-slate-700">
                <ShieldCheck className="w-3 h-3 text-teal-300" />
                <span>Instant Clinical Verification</span>
              </div>
            </div>
          </div>

          {/* Crisis Hotline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.navEmergency}</span>
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
              <div className="text-sm font-bold text-amber-400 font-mono">
                {t.emergencyNumber}
              </div>
              <div className="text-[11px] text-slate-400">
                {t.emergencyConfidential}
              </div>
            </div>
          </div>

          {/* Languages & Quick Controls */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              {language === 'am' ? 'ቋንቋ ይምረጡ' : 'Select Language'}
            </h4>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('am')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  language === 'am'
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                አማርኛ
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>{t.footerCopyright}</p>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span>Addis Ababa, Ethiopia</span>
            <span>•</span>
            <span>Telehealth & In-Clinic</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
