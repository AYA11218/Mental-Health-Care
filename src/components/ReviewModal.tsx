import React, { useState } from 'react';
import {
  X,
  Star,
  Shield,
  CheckCircle2,
  AlertCircle,
  Loader2,
  HeartHandshake,
  UserCheck,
} from 'lucide-react';
import { Psychiatrist, Appointment } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { submitReview } from '../services/reviewService';

interface ReviewModalProps {
  isOpen: boolean;
  psychiatrist: Psychiatrist | null;
  appointment?: Appointment | null;
  onClose: () => void;
  onReviewSubmitted?: () => void;
  onRequestAuth?: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  psychiatrist,
  appointment,
  onClose,
  onReviewSubmitted,
  onRequestAuth,
}) => {
  const { language, t } = useLanguage();
  const { currentUser } = useAuth();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true); // Default to anonymous for health confidentiality
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setRating(5);
      setHoverRating(0);
      setComment('');
      setIsAnonymous(true);
      setErrorMsg('');
      setSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen || !psychiatrist) return null;

  const docName = psychiatrist.name[language];

  const ratingDescriptions: Record<number, { en: string; am: string }> = {
    1: { en: 'Needs Improvement', am: 'መሻሻል ያለበት' },
    2: { en: 'Fair', am: 'መካከለኛ' },
    3: { en: 'Good', am: 'ጥሩ' },
    4: { en: 'Very Good', am: 'በጣም ጥሩ' },
    5: { en: 'Exceptional & Empathetic', am: 'ድንቅ እና ሩህሩህ' },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onRequestAuth?.();
      return;
    }

    if (!comment.trim()) {
      setErrorMsg(
        language === 'am'
          ? 'እባክዎ ስለ ክፍለ-ጊዜው ያለዎትን አስተያየት በአጭሩ ይጻፉ።'
          : 'Please provide a brief comment describing your consultation experience.'
      );
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      await submitReview({
        psychiatristId: psychiatrist.id,
        rating,
        comment: comment.trim(),
        isAnonymous,
        appointmentId: appointment?.id,
        verifiedSession: true,
      });

      setSuccess(true);
      onReviewSubmitted?.();
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 to-emerald-800 text-white p-6 sm:p-7">
          <div className="flex items-center gap-3.5">
            <img
              src={psychiatrist.avatar}
              alt={docName}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-white/30 shadow-md"
            />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-200 bg-teal-900/50 px-2 py-0.5 rounded-md">
                {t.reviewVerifiedBadge}
              </span>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mt-1">
                {t.reviewModalTitle}
              </h3>
              <p className="text-xs text-teal-100/90 font-medium">
                {docName}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 overflow-y-auto flex-1">
          {success ? (
            <div className="text-center py-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">
                {t.reviewSuccessTitle}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto mb-6 leading-relaxed">
                {t.reviewSuccessMsg}
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-teal-600/20"
              >
                {language === 'am' ? 'ተጠናቀቀ / ዝጋ' : 'Done & Close'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Star Rating Selector */}
              <div className="text-center bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  {t.reviewRatingLabel}
                </label>
                <div className="flex items-center justify-center gap-2 mb-1.5">
                  {[1, 2, 3, 4, 5].map((starVal) => {
                    const activeVal = hoverRating || rating;
                    const isFilled = starVal <= activeVal;
                    return (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setRating(starVal)}
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-slate-300 hover:scale-125 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            isFilled
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs font-bold text-teal-800">
                  {rating} / 5 • {ratingDescriptions[rating]?.[language]}
                </p>
              </div>

              {/* Comment text area */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  {t.reviewCommentLabel}
                </label>
                <textarea
                  rows={3}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t.reviewCommentPlaceholder}
                  className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all placeholder-slate-400"
                />
              </div>

              {/* Anonymous Checkbox Card */}
              <div
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isAnonymous
                    ? 'bg-teal-50/70 border-teal-300 ring-1 ring-teal-400'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 mt-0.5 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                      <Shield className="w-3.5 h-3.5 text-teal-600" />
                      <span>{t.reviewAnonymousCheck}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      {t.reviewAnonymousNote}
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Session Notice */}
              <div className="flex items-center gap-2 p-3 bg-emerald-50/70 border border-emerald-200/60 rounded-xl text-[11px] text-emerald-800 font-medium">
                <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {language === 'am'
                    ? 'የተጠናቀቀ ክፍለ-ጊዜ የተረጋገጠ ባጅ በግምገማዎ ላይ ይካተታል።'
                    : 'A verified completed consultation badge will be displayed with this review.'}
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.reviewSubmitting}</span>
                  </>
                ) : (
                  <>
                    <Star className="w-4 h-4 fill-white" />
                    <span>{t.reviewSubmitBtn}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
