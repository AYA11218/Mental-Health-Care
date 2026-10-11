import React from 'react';
import {
  X,
  Star,
  Award,
  Building2,
  GraduationCap,
  Calendar,
  CheckCircle,
  Video,
  UserCheck,
  Phone,
  Clock,
  Globe2,
  Languages,
  BadgeCheck,
  Shield,
  MessageSquarePlus,
} from 'lucide-react';
import { Psychiatrist, Review } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface PsychiatristProfileViewProps {
  psychiatrist: Psychiatrist | null;
  customReviews?: Review[];
  onClose: () => void;
  onBookAppointment: (psychiatrist: Psychiatrist) => void;
  onLeaveReview?: (psychiatrist: Psychiatrist) => void;
}

export const PsychiatristProfileView: React.FC<PsychiatristProfileViewProps> = ({
  psychiatrist,
  customReviews = [],
  onClose,
  onBookAppointment,
  onLeaveReview,
}) => {
  const { language, t } = useLanguage();

  if (!psychiatrist) return null;

  const name = psychiatrist.name[language];
  const title = psychiatrist.title[language];
  const credentials = psychiatrist.credentials[language];
  const bio = psychiatrist.bio[language];
  const hospital = psychiatrist.hospitalAffiliation[language];
  const specializations = psychiatrist.specializations[language];
  const education = psychiatrist.education[language];
  const certifications = psychiatrist.certifications[language];

  const dayNames = t.days;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-white/80 hover:text-white bg-slate-900/40 hover:bg-slate-900/70 rounded-full backdrop-blur-md transition-all shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          {/* Header Banner */}
          <div className="relative bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 text-white p-6 sm:p-8 pt-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative">
                <img
                  src={psychiatrist.avatar}
                  alt={name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-white/20 shadow-xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full shadow-md">
                  <BadgeCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/30 text-teal-200 border border-teal-400/30">
                    <Award className="w-3.5 h-3.5" />
                    {credentials}
                  </span>
                  <span className="text-xs bg-slate-800/80 px-2.5 py-1 rounded-full text-slate-300 font-medium">
                    {psychiatrist.experienceYears} {t.cardExperience}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {name}
                </h2>
                <p className="text-sm text-teal-200/90 font-medium mt-1">
                  {title}
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-slate-200">
                  <div className="flex items-center gap-1 text-amber-300 font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm">{psychiatrist.rating.toFixed(2)}</span>
                    <span className="text-slate-300 font-normal">
                      ({psychiatrist.reviewCount} {t.cardReviews})
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-200">
                    <Building2 className="w-4 h-4 text-teal-300" />
                    <span>{hospital}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Body Grid */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* About / Bio */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-teal-600" />
                <span>{t.profileAbout}</span>
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base bg-slate-50 p-5 rounded-2xl border border-slate-200/70">
                {bio}
              </p>
            </div>

            {/* Specializations Grid */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-teal-600" />
                <span>{t.profileSpecializations}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {specializations.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-teal-50/50 border border-teal-100 text-teal-900 text-sm font-medium"
                  >
                    <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Credentials, Education & Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Education */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <GraduationCap className="w-4 h-4 text-teal-600" />
                  <span>{t.profileEducation}</span>
                </h4>
                <ul className="space-y-2.5">
                  {education.map((edu, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                      <span className="text-teal-600 font-bold shrink-0">•</span>
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certifications */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-teal-600" />
                  <span>{t.profileCertifications}</span>
                </h4>
                <ul className="space-y-2.5">
                  {certifications.map((cert, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                      <span className="text-teal-600 font-bold shrink-0">•</span>
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Consultation Modes & Languages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-semibold text-slate-500 block mb-2">
                  {t.profileConsultationModes}
                </span>
                <div className="flex flex-wrap gap-2">
                  {psychiatrist.consultationModes.includes('video') && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-teal-800 border border-slate-200 text-xs font-medium">
                      <Video className="w-3.5 h-3.5 text-teal-600" />
                      {t.modeVideo}
                    </span>
                  )}
                  {psychiatrist.consultationModes.includes('in_person') && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-emerald-800 border border-slate-200 text-xs font-medium">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {t.modeInPerson}
                    </span>
                  )}
                  {psychiatrist.consultationModes.includes('phone') && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-cyan-800 border border-slate-200 text-xs font-medium">
                      <Phone className="w-3.5 h-3.5 text-cyan-600" />
                      {t.modePhone}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-semibold text-slate-500 block mb-2">
                  {t.profileLanguages}
                </span>
                <div className="flex flex-wrap gap-2">
                  {psychiatrist.languages.map((lang, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-slate-800 border border-slate-200 text-xs font-medium"
                    >
                      <Languages className="w-3.5 h-3.5 text-slate-500" />
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Available Days and Session Slots */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200/80">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-teal-950 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-700" />
                  <span>{t.profileAvailableSlots}</span>
                </h4>
                <span className="text-xs font-bold text-teal-800">
                  {psychiatrist.hourlyRateETB.toLocaleString()} ETB / ${psychiatrist.hourlyRateUSD}
                </span>
              </div>

              <p className="text-xs text-teal-800/80 mb-3">
                {language === 'am'
                  ? 'ይህ ሐኪም በሚከተሉት ሳምንታዊ ቀናት ለምክክር ክፍት ነው፡'
                  : 'This specialist accepts appointments on the following weekdays:'}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {psychiatrist.availableDays.map((dayNum) => (
                  <span
                    key={dayNum}
                    className="px-2.5 py-1 rounded-lg bg-white font-semibold text-teal-900 border border-teal-200 text-xs shadow-2xs"
                  >
                    {dayNames[dayNum]}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-teal-800">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {language === 'am' ? 'የቀጠሮ ሰዓቶች፡ ' : 'Regular daily slots: '}
                  {psychiatrist.timeSlots.join(' • ')}
                </span>
              </div>
            </div>

            {/* Patient Reviews Section */}
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span>{t.profileReviewsTitle}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t.reviewOnlyAfterSessionNotice}
                  </p>
                </div>

                {onLeaveReview && (
                  <button
                    type="button"
                    onClick={() => onLeaveReview(psychiatrist)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition-all shadow-2xs hover:shadow-xs"
                  >
                    <MessageSquarePlus className="w-4 h-4 text-amber-600" />
                    <span>{t.leaveReviewBtn}</span>
                  </button>
                )}
              </div>

              {/* Combined reviews list */}
              {(() => {
                const combined = [...customReviews, ...psychiatrist.reviews];
                if (combined.length === 0) {
                  return (
                    <div className="p-6 text-center bg-slate-50 border border-slate-200/80 rounded-2xl">
                      <p className="text-xs text-slate-500 italic">{t.noReviewsYet}</p>
                    </div>
                  );
                }

                return (
                  <div className="space-y-3">
                    {combined.map((rev) => {
                      const isAnon = rev.isAnonymous || rev.userName === 'Anonymous Patient';
                      const commentText = typeof rev.comment === 'string'
                        ? rev.comment
                        : (rev.comment as any)[language] || (rev.comment as any).en || '';

                      return (
                        <div
                          key={rev.id}
                          className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:bg-slate-100/60 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              {isAnon ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-200 text-slate-700">
                                  <Shield className="w-3 h-3 text-slate-500" />
                                  {t.reviewAnonymousBadge}
                                </span>
                              ) : (
                                <span className="font-semibold text-xs text-slate-900">
                                  {rev.userName}
                                </span>
                              )}

                              {rev.verifiedSession !== false && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                                  <BadgeCheck className="w-3 h-3 text-emerald-600" />
                                  {t.reviewVerifiedBadge}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center text-amber-500">
                              {Array.from({ length: rev.rating }).map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                          </div>

                          <p className="text-xs text-slate-700 leading-relaxed italic">
                            "{commentText}"
                          </p>

                          <div className="text-[10px] text-slate-400 font-medium">
                            {rev.date}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase font-semibold text-slate-400 block -mb-0.5">
              {t.cardFee}
            </span>
            <span className="text-base sm:text-lg font-extrabold text-slate-900">
              {psychiatrist.hourlyRateETB.toLocaleString()} ETB
            </span>
            <span className="text-xs text-slate-500 ml-1">
              (${psychiatrist.hourlyRateUSD})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              {t.profileClose}
            </button>
            <button
              onClick={() => {
                onBookAppointment(psychiatrist);
                onClose();
              }}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-md shadow-teal-600/20 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.profileBookNow}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
