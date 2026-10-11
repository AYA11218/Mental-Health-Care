import React from 'react';
import { Star, Building2, Video, Phone, UserCheck, Calendar, ArrowRight, Award } from 'lucide-react';
import { Psychiatrist, Review } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface PsychiatristCardProps {
  psychiatrist: Psychiatrist;
  extraReviews?: Review[];
  onViewProfile: (psychiatrist: Psychiatrist) => void;
  onBookSession: (psychiatrist: Psychiatrist) => void;
}

export const PsychiatristCard: React.FC<PsychiatristCardProps> = ({
  psychiatrist,
  extraReviews = [],
  onViewProfile,
  onBookSession,
}) => {
  const { language, t } = useLanguage();

  // Dynamic rating and count
  const allReviews = [...extraReviews, ...psychiatrist.reviews];
  const totalCount = psychiatrist.reviewCount + extraReviews.length;
  const avgRating = extraReviews.length > 0
    ? (
        (psychiatrist.rating * psychiatrist.reviewCount +
          extraReviews.reduce((sum, r) => sum + r.rating, 0)) /
        totalCount
      )
    : psychiatrist.rating;

  const name = psychiatrist.name[language];
  const title = psychiatrist.title[language];
  const credentials = psychiatrist.credentials[language];
  const hospital = psychiatrist.hospitalAffiliation[language];
  const specializations = psychiatrist.specializations[language];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Top Info Banner */}
        <div className="p-5 sm:p-6 pb-4">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <img
                src={psychiatrist.avatar}
                alt={name}
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white shadow-md shadow-slate-200"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full ring-2 ring-emerald-500/20" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-800 border border-teal-200/60">
                  <Award className="w-3 h-3 text-teal-600" />
                  {credentials.split(',')[0]}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {psychiatrist.experienceYears} {t.cardExperience}
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors tracking-tight line-clamp-1">
                {name}
              </h4>
              <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">
                {title}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-500 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                  {avgRating.toFixed(2)}
                </div>
                <span className="text-slate-300 text-xs">•</span>
                <span className="text-slate-500 text-xs font-medium">
                  {totalCount} {t.cardReviews}
                </span>
              </div>
            </div>
          </div>

          {/* Hospital Affiliation */}
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
            <Building2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span className="truncate">{hospital}</span>
          </div>

          {/* Specialization Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {specializations.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200/60"
              >
                {spec}
              </span>
            ))}
            {specializations.length > 3 && (
              <span className="text-[11px] font-semibold text-teal-700 bg-teal-50/80 px-2 py-1 rounded-lg">
                +{specializations.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer & Actions */}
      <div className="p-5 sm:p-6 pt-3 bg-slate-50/70 border-t border-slate-100 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-400">
            {psychiatrist.consultationModes.includes('video') && (
              <span title="Video session available" className="p-1 bg-white rounded-md border border-slate-200 shadow-2xs">
                <Video className="w-3.5 h-3.5 text-teal-600" />
              </span>
            )}
            {psychiatrist.consultationModes.includes('in_person') && (
              <span title="In-person clinic available" className="p-1 bg-white rounded-md border border-slate-200 shadow-2xs">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              </span>
            )}
            {psychiatrist.consultationModes.includes('phone') && (
              <span title="Phone session available" className="p-1 bg-white rounded-md border border-slate-200 shadow-2xs">
                <Phone className="w-3.5 h-3.5 text-cyan-600" />
              </span>
            )}
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block -mb-0.5">
              {t.cardFee}
            </span>
            <span className="text-sm font-bold text-slate-900">
              {psychiatrist.hourlyRateETB.toLocaleString()} ETB
            </span>
            <span className="text-[11px] text-slate-400 ml-1">
              (${psychiatrist.hourlyRateUSD})
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onViewProfile(psychiatrist)}
            className="w-full py-2.5 px-3 text-xs font-semibold text-slate-700 hover:text-teal-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-2xs text-center"
          >
            {t.cardViewProfile}
          </button>
          <button
            onClick={() => onBookSession(psychiatrist)}
            className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-xs shadow-teal-600/20 transition-all flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.cardBookSlot}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
