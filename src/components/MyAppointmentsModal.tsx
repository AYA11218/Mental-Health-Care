import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Video,
  UserCheck,
  Phone,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Ban,
  CalendarDays,
  Star,
  CheckCircle2,
  Smartphone,
  Receipt,
  ShieldCheck,
} from 'lucide-react';
import { Appointment } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { cancelAppointment, completeAppointment } from '../services/appointmentService';

interface MyAppointmentsModalProps {
  isOpen: boolean;
  appointments: Appointment[];
  onClose: () => void;
  onExploreDoctors: () => void;
  onLeaveReviewForAppointment?: (apt: Appointment) => void;
  onOpenPayment?: (apt: Appointment) => void;
}

export const MyAppointmentsModal: React.FC<MyAppointmentsModalProps> = ({
  isOpen,
  appointments,
  onClose,
  onExploreDoctors,
  onLeaveReviewForAppointment,
  onOpenPayment,
}) => {
  const { language, t } = useLanguage();
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  const upcomingList = appointments.filter(
    (a) => a.status === 'confirmed' && a.sessionDate >= todayStr
  );
  const pastList = appointments.filter(
    (a) => a.status !== 'confirmed' || a.sessionDate < todayStr
  );

  const displayList = tab === 'upcoming' ? upcomingList : pastList;

  const handleCancel = async (aptId: string) => {
    try {
      await cancelAppointment(aptId);
      setCancellingId(null);
      setActionSuccess(t.appointmentCancelledSuccess);
      setTimeout(() => setActionSuccess(null), 3000);
    } catch {
      alert('Failed to cancel appointment');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-500/20 text-teal-300 rounded-2xl border border-teal-500/30">
              <CalendarDays className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-white">
                {t.myAppointmentsTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.myAppointmentsSubtitle}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 mt-5 bg-slate-800/80 p-1 rounded-xl">
            <button
              onClick={() => setTab('upcoming')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                tab === 'upcoming'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.tabUpcoming} ({upcomingList.length})
            </button>
            <button
              onClick={() => setTab('past')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                tab === 'past'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.tabPast} ({pastList.length})
            </button>
          </div>
        </div>

        {/* Body list */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-4">
          {actionSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{actionSuccess}</span>
            </div>
          )}

          {displayList.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-7 h-7" />
              </div>
              <p className="text-sm font-semibold text-slate-700 mb-1">
                {tab === 'upcoming' ? t.noUpcoming : t.noPast}
              </p>
              {tab === 'upcoming' && (
                <button
                  onClick={() => {
                    onClose();
                    onExploreDoctors();
                  }}
                  className="mt-3 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
                >
                  {t.noUpcomingBtn}
                </button>
              )}
            </div>
          ) : (
            displayList.map((apt) => (
              <div
                key={apt.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                      ID: {apt.id.substring(0, 10)}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-1">
                      {apt.psychiatristName}
                    </h4>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {apt.paymentStatus === 'paid' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>{t.paymentStatusPaid}</span>
                      </span>
                    ) : apt.status === 'confirmed' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                        <Smartphone className="w-3 h-3 text-amber-600" />
                        <span>{t.paymentStatusUnpaid}</span>
                      </span>
                    ) : null}

                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        apt.status === 'confirmed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : apt.status === 'completed'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {apt.status === 'confirmed'
                        ? t.statusConfirmed
                        : apt.status === 'completed'
                        ? t.statusCompleted
                        : t.statusCancelled}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-medium text-slate-800">{apt.sessionDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-medium text-slate-800">{apt.startTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {apt.sessionType === 'video' ? (
                      <Video className="w-3.5 h-3.5 text-teal-600" />
                    ) : apt.sessionType === 'in_person' ? (
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Phone className="w-3.5 h-3.5 text-cyan-600" />
                    )}
                    <span className="capitalize">
                      {apt.sessionType === 'video'
                        ? t.modeVideo
                        : apt.sessionType === 'in_person'
                        ? t.modeInPerson
                        : t.modePhone}
                    </span>
                  </div>
                  {apt.patientPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{apt.patientPhone}</span>
                    </div>
                  )}
                </div>

                {apt.notes && (
                  <p className="text-xs text-slate-500 italic bg-amber-50/50 p-2.5 rounded-lg border border-amber-100">
                    "{apt.notes}"
                  </p>
                )}

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    {apt.status === 'confirmed' && apt.sessionType === 'video' && (
                      <a
                        href={apt.meetingLink || '#'}
                        onClick={(e) => {
                          e.preventDefault();
                          setActionSuccess(
                            language === 'am'
                              ? `የቪዲዮ ምክክር ክፍል በመዘጋጀት ላይ ነው፡ ${apt.psychiatristName} በቀጠሮው ሰዓት ይቀላቀላሉ።`
                              : `Secure Telehealth Room ready: ${apt.psychiatristName} will join at the scheduled time.`
                          );
                          setTimeout(() => setActionSuccess(null), 4000);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-all"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>{t.btnJoinVideo}</span>
                        <ExternalLink className="w-3 h-3 text-teal-200" />
                      </a>
                    )}

                    {/* Mark session completed */}
                    {apt.status === 'confirmed' && (
                      <button
                        onClick={async () => {
                          await completeAppointment(apt.id);
                          if (onLeaveReviewForAppointment) {
                            onLeaveReviewForAppointment(apt);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold transition-all"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{t.reviewMarkCompletedBtn}</span>
                      </button>
                    )}

                    {/* Payment Wallet Action (Telebirr & CBE Birr) */}
                    {apt.status === 'confirmed' && apt.paymentStatus !== 'paid' && onOpenPayment && (
                      <button
                        onClick={() => onOpenPayment(apt)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-lg text-xs font-bold shadow-2xs transition-all cursor-pointer"
                      >
                        <Smartphone className="w-3.5 h-3.5 text-teal-200" />
                        <span>{t.payNowBtn}</span>
                      </button>
                    )}

                    {/* View Digital Receipt */}
                    {apt.paymentStatus === 'paid' && onOpenPayment && (
                      <button
                        onClick={() => onOpenPayment(apt)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                      >
                        <Receipt className="w-3.5 h-3.5 text-teal-600" />
                        <span>{t.viewReceiptBtn}</span>
                      </button>
                    )}

                    {/* If completed, leave review CTA */}
                    {apt.status === 'completed' && onLeaveReviewForAppointment && (
                      <button
                        onClick={() => onLeaveReviewForAppointment(apt)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition-all shadow-2xs shadow-amber-500/20"
                      >
                        <Star className="w-3.5 h-3.5 fill-white text-white" />
                        <span>{t.reviewLeaveAfterSession}</span>
                      </button>
                    )}
                  </div>

                  {apt.status === 'confirmed' && (
                    <div>
                      {cancellingId === apt.id ? (
                        <div className="flex items-center gap-2 animate-in fade-in">
                          <button
                            onClick={() => handleCancel(apt.id)}
                            className="px-2.5 py-1 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-2xs"
                          >
                            {t.yesCancel}
                          </button>
                          <button
                            onClick={() => setCancellingId(null)}
                            className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 rounded-lg"
                          >
                            {t.keepAppointment}
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setCancellingId(apt.id)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-lg transition-colors"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          <span>{t.btnCancelAppointment}</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
