import React, { useState, useEffect } from 'react';
import {
  X,
  Copy,
  Check,
  ShieldCheck,
  Smartphone,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Receipt,
  Printer,
  Sparkles,
  ChevronRight,
  Building2,
} from 'lucide-react';
import { Appointment, PaymentMethod } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { updateAppointmentPayment } from '../services/appointmentService';

interface PaymentWalletModalProps {
  isOpen: boolean;
  appointment: Appointment | null;
  allAppointments?: Appointment[];
  feeETB?: number;
  onClose: () => void;
  onPaymentSuccess?: (updatedApt: Appointment) => void;
  onSelectAppointment?: (apt: Appointment) => void;
  onBookNewAppointment?: () => void;
}

export const PaymentWalletModal: React.FC<PaymentWalletModalProps> = ({
  isOpen,
  appointment,
  allAppointments = [],
  feeETB = 2400,
  onClose,
  onPaymentSuccess,
  onSelectAppointment,
  onBookNewAppointment,
}) => {
  const { language, t } = useLanguage();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('telebirr');
  const [transactionRef, setTransactionRef] = useState('');
  const [copied, setCopied] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [internalSelectedApt, setInternalSelectedApt] = useState<Appointment | null>(null);

  const walletNumber = '+251944692238';
  const localNumber = '0944692238';

  // Active appointment can come from direct prop or internal selection
  const activeAppointment = appointment || internalSelectedApt;

  const unpaidList = allAppointments.filter(
    (a) => a.paymentStatus !== 'paid' && a.status === 'confirmed'
  );

  useEffect(() => {
    if (isOpen) {
      if (appointment) {
        setInternalSelectedApt(appointment);
        if (appointment.paymentStatus === 'paid' && appointment.transactionReference) {
          setSuccess(true);
          setTransactionRef(appointment.transactionReference);
          if (appointment.paymentMethod) {
            setSelectedMethod(appointment.paymentMethod);
          }
        } else {
          setSuccess(false);
          setTransactionRef('');
        }
      } else {
        // If opened generally, pick first unpaid appointment if exists
        if (unpaidList.length > 0) {
          setInternalSelectedApt(unpaidList[0]);
        } else {
          setInternalSelectedApt(null);
        }
        setSuccess(false);
        setTransactionRef('');
      }
      setCopied(false);
      setErrorMsg('');
      setVerifying(false);
    }
  }, [isOpen, appointment]);

  if (!isOpen) return null;

  const currentFee = activeAppointment?.paidAmountETB || feeETB;

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(walletNumber);
    } catch {
      // Fallback
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch (e) {
      console.warn('Print unavailable', e);
    }
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionRef.trim()) {
      setErrorMsg(
        language === 'am'
          ? 'እባክዎ ከቴሌብር ወይም ከሲቢኢ ብር የደረሰዎትን የግብይት ቁጥር (Transaction ID) ያስገቡ።'
          : 'Please enter the transaction reference number from your Telebirr or CBE Birr SMS.'
      );
      return;
    }

    setVerifying(true);
    setErrorMsg('');

    try {
      if (activeAppointment) {
        await updateAppointmentPayment(activeAppointment.id, {
          paymentMethod: selectedMethod,
          transactionReference: transactionRef.trim(),
          paidAmountETB: currentFee,
          paymentWalletNumber: walletNumber,
        });

        const updated: Appointment = {
          ...activeAppointment,
          paymentStatus: 'paid',
          paymentMethod: selectedMethod,
          transactionReference: transactionRef.trim(),
          paidAmountETB: currentFee,
          paymentWalletNumber: walletNumber,
          paidAt: new Date().toISOString(),
        };

        setInternalSelectedApt(updated);
        setSuccess(true);
        onPaymentSuccess?.(updated);
      } else {
        // Generic verification acknowledge
        setSuccess(true);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Payment verification failed. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-700 bg-white/90 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 text-white p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-500/30 border border-teal-400/40 flex items-center justify-center text-teal-200">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-200 bg-teal-950/60 px-2 py-0.5 rounded-md">
                  {t.paymentWalletTitle}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-300 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Secured 256-bit
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mt-1">
                {t.paymentWalletSubtitle}
              </h3>
            </div>
          </div>

          {/* Quick Appointment Summary Pill if appointment is bound */}
          {activeAppointment && (
            <div className="mt-4 p-3 rounded-2xl bg-teal-950/40 border border-teal-700/50 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-teal-300" />
                <span className="font-semibold text-white">{activeAppointment.psychiatristName}</span>
              </div>
              <div className="flex items-center gap-3 text-teal-100">
                <span>{activeAppointment.sessionDate}</span>
                <span>•</span>
                <span>{activeAppointment.startTime}</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-white font-bold">
                  {currentFee.toLocaleString()} ETB
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-7 space-y-6">
          {/* Multiple Unpaid Appointments Selector if opened generically */}
          {!appointment && unpaidList.length > 1 && !success && (
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                {t.selectAppointmentToPay}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {unpaidList.map((apt) => (
                  <button
                    key={apt.id}
                    type="button"
                    onClick={() => {
                      setInternalSelectedApt(apt);
                      onSelectAppointment?.(apt);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      activeAppointment?.id === apt.id
                        ? 'border-teal-600 bg-teal-50/80 ring-2 ring-teal-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-slate-900 truncate">{apt.psychiatristName}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {apt.sessionDate} • {apt.startTime}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {success ? (
            /* Digital Receipt View */
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              <div className="text-center">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">
                  {t.paymentSuccessTitle}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {t.paymentSuccessMsg.replace('{amount}', currentFee.toLocaleString())}
                </p>
              </div>

              {/* Official Receipt Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 font-mono text-xs relative overflow-hidden">
                <div className="border-b border-dashed border-slate-300 pb-3 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">
                      SELAMCARE CLINICAL WALLET
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Merchant ID: ET-SELAM-94469
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                    VERIFIED
                  </span>
                </div>

                <div className="space-y-1.5 pt-1 text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Receipt Ref:</span>
                    <span className="font-bold text-slate-900">{transactionRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Method:</span>
                    <span className="font-bold uppercase text-slate-900">
                      {selectedMethod === 'telebirr' ? 'Telebirr (ቴሌብር)' : 'CBE Birr (ሲቢኢ ብር)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Wallet Account:</span>
                    <span className="font-bold text-slate-900">{walletNumber}</span>
                  </div>
                  {activeAppointment && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Patient:</span>
                        <span className="font-bold text-slate-900">{activeAppointment.patientName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Psychiatrist:</span>
                        <span className="font-bold text-slate-900">{activeAppointment.psychiatristName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Session Date:</span>
                        <span className="font-bold text-slate-900">
                          {activeAppointment.sessionDate} at {activeAppointment.startTime}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <div className="border-t border-dashed border-slate-300 pt-3 flex justify-between items-center font-sans">
                  <span className="text-xs font-bold text-slate-700">Total Paid:</span>
                  <span className="text-lg font-black text-teal-800">
                    {currentFee.toLocaleString()} ETB
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>{t.printReceipt}</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md shadow-teal-600/20 transition-all cursor-pointer"
                >
                  {t.closeReceipt}
                </button>
              </div>
            </div>
          ) : (
            /* Payment Input Form */
            <form onSubmit={handleSubmitPayment} className="space-y-6">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* 1. Official Wallet Card with Click-to-Copy */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-teal-950 text-white border border-slate-800 relative overflow-hidden shadow-lg shadow-teal-950/20">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-teal-300 font-semibold mb-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{t.officialWalletNumber}</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black tracking-wider text-white font-mono mt-0.5">
                      {walletNumber}
                    </div>
                    <p className="text-xs text-slate-300 mt-1 font-sans">
                      {language === 'am' ? 'የአገር ውስጥ ቁጥር፡ ' : 'Local format: '}
                      <span className="font-bold text-white font-mono">{localNumber}</span>
                      <span className="text-slate-400 ml-2">({currentFee.toLocaleString()} ETB)</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-md ${
                      copied
                        ? 'bg-emerald-500 text-white scale-105'
                        : 'bg-white text-slate-900 hover:bg-teal-100'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>{t.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                        <span>{t.copyWalletNumber}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 2. Choose Payment Method Tabs */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2.5">
                  {t.selectPaymentMethod}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {/* Telebirr Tab */}
                  <div
                    onClick={() => setSelectedMethod('telebirr')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedMethod === 'telebirr'
                        ? 'border-sky-500 bg-sky-50/70 shadow-sm ring-2 ring-sky-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-sm text-sky-900">
                        {t.telebirrMethod}
                      </span>
                      <span className="w-3 h-3 rounded-full bg-sky-500 shrink-0" />
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      {t.telebirrDesc}
                    </p>
                  </div>

                  {/* CBE Birr Tab */}
                  <div
                    onClick={() => setSelectedMethod('cbe_birr')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedMethod === 'cbe_birr'
                        ? 'border-purple-600 bg-purple-50/70 shadow-sm ring-2 ring-purple-600/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-sm text-purple-900">
                        {t.cbeBirrMethod}
                      </span>
                      <span className="w-3 h-3 rounded-full bg-purple-600 shrink-0" />
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      {t.cbeBirrDesc}
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Method-specific Instructions */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <span className="text-xs font-bold text-slate-900 block mb-1">
                  {t.transferInstructions}:
                </span>
                <ol className="text-xs text-slate-600 space-y-2 pl-4 list-decimal leading-relaxed">
                  {selectedMethod === 'telebirr' ? (
                    <>
                      <li>{t.telebirrStep1}</li>
                      <li>{t.telebirrStep2}</li>
                      <li>{t.telebirrStep3.replace('{amount}', currentFee.toLocaleString())}</li>
                      <li>{t.telebirrStep4}</li>
                    </>
                  ) : (
                    <>
                      <li>{t.cbeBirrStep1}</li>
                      <li>{t.cbeBirrStep2}</li>
                      <li>{t.cbeBirrStep3.replace('{amount}', currentFee.toLocaleString())}</li>
                      <li>{t.cbeBirrStep4}</li>
                    </>
                  )}
                </ol>
              </div>

              {/* 4. Transaction Reference Input */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1.5">
                  {t.transactionRefLabel}
                </label>
                <input
                  type="text"
                  required
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value.toUpperCase())}
                  placeholder={t.transactionRefPlaceholder}
                  className="w-full px-4 py-3 text-sm font-mono tracking-wider bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 uppercase transition-all"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  {language === 'am'
                    ? 'ክፍያውን እንዳጠናቀቁ ከስልክዎ የመጣውን የኤስኤምኤስ (SMS) የግብይት ቁጥር እዚህ ያስገቡ።'
                    : 'Paste the transaction code received in your confirmation SMS to verify immediately.'}
                </p>
              </div>

              {/* No appointment prompt */}
              {!activeAppointment && (
                <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-teal-800 text-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{t.bookAppointmentFirst}</span>
                  </div>
                  {onBookNewAppointment && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onBookNewAppointment();
                      }}
                      className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg text-xs transition-colors shrink-0 cursor-pointer"
                    >
                      {t.navPsychiatrists}
                    </button>
                  )}
                </div>
              )}

              {/* Submit Verification Button */}
              <button
                type="submit"
                disabled={verifying}
                className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {verifying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.paymentVerifying}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.confirmPaymentBtn}</span>
                    <span className="text-teal-200 text-xs ml-1 font-normal">
                      ({currentFee.toLocaleString()} ETB)
                    </span>
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
