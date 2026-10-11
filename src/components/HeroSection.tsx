import React from 'react';
import { Search, Sparkles, ShieldCheck, HeartHandshake, Users, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedSpecialty: string;
  onSelectSpecialty: (specialty: string) => void;
  specialtyList: string[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  selectedSpecialty,
  onSelectSpecialty,
  specialtyList,
}) => {
  const { t, language } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20 bg-gradient-to-b from-teal-50/60 via-slate-50 to-white">
      {/* Decorative blurred background aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-teal-200/25 to-emerald-200/25 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/70 text-teal-800 text-xs font-semibold border border-teal-200/80 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>{t.heroBadge}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {t.heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center bg-white rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-200 p-1.5 focus-within:ring-2 focus-within:ring-teal-500/30 focus-within:border-teal-500 transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-3.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t.heroSearchPlaceholder}
                className="w-full px-3 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="px-2.5 py-1 text-xs text-slate-400 hover:text-slate-600 font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Quick Specialty Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2">
            <button
              onClick={() => onSelectSpecialty('')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedSpecialty === ''
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {t.allSpecializations}
            </button>
            {specialtyList.map((spec) => (
              <button
                key={spec}
                onClick={() => onSelectSpecialty(spec)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedSpecialty === spec
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>

          {/* Secured Payment Wallet Trust Badge */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs shadow-md border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300">
                {language === 'am' ? 'የተረጋገጠ የክፍያ ቦርሳ፡' : 'Secured Payment Wallet:'}
              </span>
              <span className="font-mono font-bold text-emerald-300">
                +251944692238
              </span>
              <span className="text-[10px] text-teal-200 bg-teal-950 px-2 py-0.5 rounded-md font-semibold border border-teal-800">
                Telebirr & CBE Birr
              </span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 sm:mt-16 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/80 shadow-2xs text-center">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-2">
              <Users className="w-4 h-4" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">100%</div>
            <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
              {t.statDoctors}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/80 shadow-2xs text-center">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">3,400+</div>
            <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
              {t.statAppointments}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/80 shadow-2xs text-center">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">4.9 / 5.0</div>
            <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
              {t.statSatisfaction}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/80 shadow-2xs text-center">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">
              {language === 'am' ? '24/7 ቀጠሮ' : 'Online / Clinic'}
            </div>
            <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
              {t.statAvailability}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
