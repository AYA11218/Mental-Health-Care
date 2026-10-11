import React, { useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  Video,
  UserCheck,
  Phone,
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Sparkles,
  Smartphone,
} from 'lucide-react';
import { Psychiatrist, SessionType, Appointment } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { bookAppointment } from '../services/appointmentService';

interface CalendarSchedulerProps {
  isOpen: boolean;
  psychiatrist: Psychiatrist | null;
  onClose: () => void;
  onAppointmentBooked?: (createdApt?: Appointment) => void;
  onRequestAuth?: () => void;
  onPayNow?: (createdApt: Appointment) => void;
}

export const CalendarScheduler: React.FC<CalendarSchedulerProps> = ({
  isOpen,
  psychiatrist,
  onClose,
  onAppointmentBooked,
  onRequestAuth,
  onPayNow,
}) => {
  const { language, t } = useLanguage();
  const { currentUser, userProfile } = useAuth();

  // Current viewed month & year
  const [currentDate, setCurrentDate] = useState(() => new Date());

  // Form states
  const [selectedDateStr, setSelectedDateStr] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [sessionType, setSessionType] = useState<SessionType>('video');
  const [notes, setNotes] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [createdApt, setCreatedApt] = useState<Appointment | null>(null);

  // Prefill phone from userProfile if available
  React.useEffect(() => {
    if (userProfile?.phone) {
      setPatientPhone(userProfile.phone);
    }
  }, [userProfile]);

  // Reset state on modal open
  React.useEffect(() => {
    if (isOpen) {
      setSuccessBooking(false);
      setErrorMessage('');
      setSelectedTimeSlot('');
      // Set initial selected date to tomorrow or next available day
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const iso = tomorrow.toISOString().split('T')[0];
      setSelectedDateStr(iso);
    }
  }, [isOpen, psychiatrist]);

  if (!isOpen || !psychiatrist) return null;

  const doctorName = psychiatrist.name[language];
  const doctorTitle = psychiatrist.title[language];

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if a given day is available for this psychiatrist
  const isDayAvailable = (dayNumber: number) => {
    const target = new Date(year, month, dayNumber);
    target.setHours(0, 0, 0, 0);
    if (target < today) return false;
    const dayOfWeek = target.getDay();
    return psychiatrist.availableDays.includes(dayOfWeek);
  };

  const handleSelectDay = (dayNumber: number) => {
    if (!isDayAvailable(dayNumber)) return;
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const dateStr = `${year}-${pad(month + 1)}-${pad(dayNumber)}`;
    setSelectedDateStr(dateStr);
    setSelectedTimeSlot('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onRequestAuth?.();
      return;
    }

    if (!selectedDateStr || !selectedTimeSlot) {
      setErrorMessage(
        language === 'am'
          ? 'እባክዎ የቀጠሮ ቀን እና ሰዓት ይምረጡ።'
          : 'Please select both an appointment date and time slot.'
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const patientName = userProfile?.displayName || currentUser.displayName || currentUser.email?.split('@')[0] || 'Patient';
      const patientEmail = currentUser.email || '';

      const created = await bookAppointment({
        userId: currentUser.uid,
        psychiatristId: psychiatrist.id,
        psychiatristName: doctorName,
        patientName,
        patientEmail,
        patientPhone: patientPhone.trim(),
        sessionDate: selectedDateStr,
        startTime: selectedTimeSlot,
        endTime: '',
        sessionType,
        notes: notes.trim(),
        status: 'confirmed',
        paymentStatus: 'unpaid',
        paidAmountETB: psychiatrist.hourlyRateETB,
      });

      setCreatedApt(created);
      setSuccessBooking(true);
      onAppointmentBooked?.(created);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Could not schedule appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Formatted date string for display (computed directly without hooks)
  let formattedSelectedDate = '';
  if (selectedDateStr) {
    const [y, m, d] = selectedDateStr.split('-').map(Number);
    if (y && m && d) {
      const dateObj = new Date(y, m - 1, d);
      const dayName = t.days[dateObj.getDay()] || '';
      const monthName = t.months[dateObj.getMonth()] || '';
      formattedSelectedDate = `${dayName}, ${monthName} ${d}, ${y}`;
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-700 bg-white/90 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 to-emerald-800 text-white p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <img
              src={psychiatrist.avatar}
              alt={doctorName}
              className="w-12 h-12 rounded-xl object-cover border-2 border-white/30 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-500/40 text-teal-100">
                  {t.scheduleTitle}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mt-0.5">
                {doctorName}
              </h3>
              <p className="text-xs text-teal-100/80">{doctorTitle}</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-7">
          {successBooking ? (
            <div className="text-center py-8 px-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {t.bookingSuccessTitle}
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                {t.bookingSuccessMsg}
              </p>

              {/* Appointment Card Summary */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-md mx-auto text-left space-y-2 mb-6">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">{t.doctorSelected}:</span>
                  <span className="font-semibold text-slate-800">{doctorName}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">{t.appointmentDate}:</span>
                  <span className="font-semibold text-slate-800">{formattedSelectedDate}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">{t.appointmentTime}:</span>
                  <span className="font-semibold text-teal-700">{selectedTimeSlot}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">{t.consultationType}:</span>
                  <span className="font-semibold text-slate-800 capitalize">
                    {sessionType === 'video' ? t.modeVideo : sessionType === 'in_person' ? t.modeInPerson : t.modePhone}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center max-w-md mx-auto">
                <button
                  type="button"
                  onClick={() => {
                    if (createdApt && onPayNow) {
                      onPayNow(createdApt);
                    } else {
                      onClose();
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-teal-600/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-teal-200" />
                  <span>
                    {language === 'am'
                      ? 'አሁን በቴሌብር / ሲቢኢ ብር ክፈል (+251944692238)'
                      : 'Pay via Telebirr / CBE Birr (+251944692238)'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
                >
                  {language === 'am' ? 'ተጠናቀቀ / በኋላ እከፍላለሁ' : 'Done / Pay Later'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Step 1: Calendar Date Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4 text-teal-600" />
                    <span>{t.calendarMonth}</span>
                  </label>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <span>
                      {t.months[month]} {year}
                    </span>
                    <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                      <button
                        type="button"
                        onClick={prevMonth}
                        className="p-1 hover:bg-white rounded transition-colors text-slate-600"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={nextMonth}
                        className="p-1 hover:bg-white rounded transition-colors text-slate-600"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Calendar Days Table */}
                <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-3 sm:p-4">
                  {/* Days of week header */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-500 mb-2">
                    {t.daysShort.map((dayName, idx) => (
                      <div key={idx} className="py-1">
                        {dayName}
                      </div>
                    ))}
                  </div>

                  {/* Days grid */}
                  <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                    {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
                      <div key={`empty-${idx}`} className="h-9 sm:h-10" />
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, idx) => {
                      const dayNum = idx + 1;
                      const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
                      const dateKey = `${year}-${pad(month + 1)}-${pad(dayNum)}`;
                      const isAvailable = isDayAvailable(dayNum);
                      const isSelected = selectedDateStr === dateKey;

                      return (
                        <button
                          key={dateKey}
                          type="button"
                          disabled={!isAvailable}
                          onClick={() => handleSelectDay(dayNum)}
                          className={`h-9 sm:h-10 rounded-xl text-xs sm:text-sm font-semibold transition-all relative flex flex-col items-center justify-center ${
                            isSelected
                              ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 font-bold scale-105 z-10'
                              : isAvailable
                              ? 'bg-white hover:bg-teal-50 text-slate-800 hover:text-teal-700 border border-slate-200 hover:border-teal-300 shadow-2xs cursor-pointer'
                              : 'bg-slate-100/50 text-slate-300 cursor-not-allowed border border-transparent'
                          }`}
                        >
                          <span>{dayNum}</span>
                          {isAvailable && !isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 2: Available Time Slots */}
              <div>
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>
                    {t.availableSlotsFor} {formattedSelectedDate || t.selectTimeSlot}
                  </span>
                </label>

                {selectedDateStr ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {psychiatrist.timeSlots.map((slot) => {
                      const isSelected = selectedTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all text-center flex items-center justify-center gap-1.5 ${
                            isSelected
                              ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                              : 'bg-white hover:bg-teal-50/70 border-slate-200 text-slate-700 hover:border-teal-300'
                          }`}
                        >
                          <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-teal-200' : 'text-slate-400'}`} />
                          <span>{slot}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl border border-slate-200">
                    {t.noSlotsForDay}
                  </p>
                )}
              </div>

              {/* Step 3: Session Format */}
              <div>
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2.5">
                  {t.sessionFormat}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div
                    onClick={() => setSessionType('video')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      sessionType === 'video'
                        ? 'bg-teal-50/80 border-teal-500 ring-1 ring-teal-500'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Video className="w-4 h-4 text-teal-600" />
                      <span className="text-xs font-bold text-slate-900">{t.modeVideo}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">{t.modeVideoDesc}</p>
                  </div>

                  <div
                    onClick={() => setSessionType('in_person')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      sessionType === 'in_person'
                        ? 'bg-emerald-50/80 border-emerald-500 ring-1 ring-emerald-500'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <UserCheck className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-slate-900">{t.modeInPerson}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">{t.modeInPersonDesc}</p>
                  </div>

                  <div
                    onClick={() => setSessionType('phone')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      sessionType === 'phone'
                        ? 'bg-cyan-50/80 border-cyan-500 ring-1 ring-cyan-500'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Phone className="w-4 h-4 text-cyan-600" />
                      <span className="text-xs font-bold text-slate-900">{t.modePhone}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">{t.modePhoneDesc}</p>
                  </div>
                </div>
              </div>

              {/* Step 4: Patient Notes and Contact */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    {t.patientPhone}
                  </label>
                  <input
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="+251 91 123 4567"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    {t.patientNotes}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t.patientNotesPlaceholder}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Auth Prompt or Confirmation Action */}
              {!currentUser ? (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-amber-900">
                    <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>{t.mustSignInToBook}</span>
                  </div>
                  <button
                    type="button"
                    onClick={onRequestAuth}
                    className="px-4 py-2 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-xs transition-all shrink-0"
                  >
                    {t.signInToBookBtn}
                  </button>
                </div>
              ) : (
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !selectedDateStr || !selectedTimeSlot}
                    className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving to database...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>{t.confirmBookingBtn}</span>
                        <span className="text-teal-200 text-xs ml-1 font-normal">
                          ({psychiatrist.hourlyRateETB.toLocaleString()} ETB)
                        </span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
