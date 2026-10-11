import React from 'react';
import { PhoneCall, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const EmergencyBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-amber-600 text-amber-50 px-4 py-2.5 text-xs sm:text-sm font-medium shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-200 animate-pulse" />
          <span>{t.emergencyNotice}:</span>
          <span className="font-bold underline tracking-wide text-white bg-amber-700/60 px-2 py-0.5 rounded">
            {t.emergencyNumber}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-amber-100 text-xs">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>{t.emergencyConfidential}</span>
        </div>
      </div>
    </div>
  );
};
