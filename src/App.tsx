import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { EmergencyBanner } from './components/EmergencyBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PsychiatristCard } from './components/PsychiatristCard';
import { PsychiatristProfileView } from './components/PsychiatristProfileView';
import { CalendarScheduler } from './components/CalendarScheduler';
import { MyAppointmentsModal } from './components/MyAppointmentsModal';
import { AuthModal } from './components/AuthModal';
import { ReviewModal } from './components/ReviewModal';
import { PaymentWalletModal } from './components/PaymentWalletModal';
import { CopingStrategiesSection } from './components/CopingStrategiesSection';
import { Footer } from './components/Footer';
import { initialPsychiatrists } from './data/psychiatristsData';
import { Appointment, Psychiatrist, Review } from './types';
import {
  subscribeToUserAppointments,
  fetchUserAppointments,
} from './services/appointmentService';
import {
  fetchPsychiatristReviews,
  subscribeToPsychiatristReviews,
} from './services/reviewService';
import { Filter, SearchX, CheckCircle2 } from 'lucide-react';

function MainContent() {
  const { language, t } = useLanguage();
  const { currentUser } = useAuth();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedMode, setSelectedMode] = useState<string>('all');

  // Modal visibility states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [selectedDoctorForProfile, setSelectedDoctorForProfile] = useState<Psychiatrist | null>(null);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Psychiatrist | null>(null);
  const [appointmentsModalOpen, setAppointmentsModalOpen] = useState(false);

  // Review modal state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewPsychiatrist, setReviewPsychiatrist] = useState<Psychiatrist | null>(null);
  const [reviewAppointment, setReviewAppointment] = useState<Appointment | null>(null);

  // Payment Wallet modal state (+251944692238 Telebirr & CBE Birr)
  const [paymentWalletOpen, setPaymentWalletOpen] = useState(false);
  const [paymentAppointment, setPaymentAppointment] = useState<Appointment | null>(null);

  // User appointments list
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showToast, setShowToast] = useState<string | null>(null);

  // Dynamic reviews map (psychiatristId -> Review[])
  const [reviewsMap, setReviewsMap] = useState<Record<string, Review[]>>({});

  // Fetch reviews for all initial psychiatrists
  const loadReviews = useCallback(async () => {
    const map: Record<string, Review[]> = {};
    for (const doc of initialPsychiatrists) {
      const revs = await fetchPsychiatristReviews(doc.id);
      map[doc.id] = revs;
    }
    setReviewsMap(map);
  }, []);

  useEffect(() => {
    loadReviews();

    // Setup realtime listeners for reviews
    const unsubscribes = initialPsychiatrists.map((doc) =>
      subscribeToPsychiatristReviews(doc.id, (revs) => {
        setReviewsMap((prev) => ({ ...prev, [doc.id]: revs }));
      })
    );

    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }, [loadReviews]);

  // Subscribe to real-time appointments when user is logged in
  useEffect(() => {
    if (!currentUser) {
      setAppointments([]);
      return;
    }

    // Initial fetch
    fetchUserAppointments(currentUser.uid).then(setAppointments);

    // Realtime sync
    const unsubscribe = subscribeToUserAppointments(currentUser.uid, (updated) => {
      setAppointments(updated);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Derive unique specialties for the active language
  const specialtyList = useMemo(() => {
    const set = new Set<string>();
    initialPsychiatrists.forEach((doc) => {
      doc.specializations[language].forEach((spec) => set.add(spec));
    });
    return Array.from(set).slice(0, 5);
  }, [language]);

  // Filtered psychiatrists
  const filteredDoctors = useMemo(() => {
    return initialPsychiatrists.filter((doc) => {
      const name = doc.name[language].toLowerCase();
      const title = doc.title[language].toLowerCase();
      const credentials = doc.credentials[language].toLowerCase();
      const hospital = doc.hospitalAffiliation[language].toLowerCase();
      const specs = doc.specializations[language].map((s) => s.toLowerCase());

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        name.includes(query) ||
        title.includes(query) ||
        credentials.includes(query) ||
        hospital.includes(query) ||
        specs.some((s) => s.includes(query));

      const matchesSpecialty =
        !selectedSpecialty ||
        doc.specializations[language].includes(selectedSpecialty);

      const matchesMode =
        selectedMode === 'all' ||
        doc.consultationModes.includes(selectedMode as any);

      return matchesSearch && matchesSpecialty && matchesMode;
    });
  }, [searchQuery, selectedSpecialty, selectedMode, language]);

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleBookSession = (doc: Psychiatrist) => {
    setSelectedDoctorForBooking(doc);
  };

  const handleAppointmentBooked = () => {
    setShowToast(
      language === 'am'
        ? 'ቀጠሮዎ በተሳካ ሁኔታ ተይዞ ዳታቤዝ ውስጥ ተመዝግቧል!'
        : 'Appointment confirmed and stored in the database!'
    );
    setTimeout(() => setShowToast(null), 4000);
  };

  const handleOpenReview = (psychiatrist: Psychiatrist, appointment?: Appointment) => {
    if (!currentUser) {
      handleOpenAuth('login');
      return;
    }
    setReviewPsychiatrist(psychiatrist);
    setReviewAppointment(appointment || null);
    setReviewModalOpen(true);
  };

  const handleReviewSubmitted = () => {
    setShowToast(t.reviewSuccessTitle);
    setTimeout(() => setShowToast(null), 4000);
    loadReviews();
  };

  const handleOpenPayment = (apt?: Appointment | null) => {
    setPaymentAppointment(apt || null);
    setPaymentWalletOpen(true);
  };

  const handlePaymentSuccess = (updatedApt: Appointment) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === updatedApt.id ? updatedApt : a))
    );
    setShowToast(
      language === 'am'
        ? 'ክፍያዎ በቴሌብር/ሲቢኢ ብር በተሳካ ሁኔታ ተረጋግጧል!'
        : 'Payment via Telebirr / CBE Birr verified successfully!'
    );
    setTimeout(() => setShowToast(null), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
          <div className="bg-emerald-900 text-emerald-50 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-emerald-700 text-xs sm:text-sm font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{showToast}</span>
          </div>
        </div>
      )}

      {/* Emergency Crisis Line */}
      <EmergencyBanner />

      {/* Navigation */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        onOpenAppointments={() => setAppointmentsModalOpen(true)}
        onOpenWallet={() => handleOpenPayment(null)}
        onNavigateHome={() => {
          setSearchQuery('');
          setSelectedSpecialty('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onScrollToGuides={() => {
          const el = document.getElementById('coping-strategies');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        appointmentsCount={
          appointments.filter((a) => a.status === 'confirmed').length
        }
      />

      {/* Hero Section */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSpecialty={selectedSpecialty}
        onSelectSpecialty={setSelectedSpecialty}
        specialtyList={specialtyList}
      />

      {/* Main Catalog Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {language === 'am' ? 'ባለሙያ የአእምሮ ሐኪሞች' : 'Licensed Psychiatrists & Therapists'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              {language === 'am'
                ? `${filteredDoctors.length} ዝግጁ ስፔሻሊስቶች ተገኝተዋል`
                : `Showing ${filteredDoctors.length} available medical specialists`}
            </p>
          </div>

          {/* Mode Selector */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200/90 shadow-2xs">
            <Filter className="w-4 h-4 text-slate-400 ml-2 mr-1" />
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="text-xs font-semibold text-slate-700 bg-transparent pr-3 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="all">{t.allModes}</option>
              <option value="video">{t.modeVideo}</option>
              <option value="in_person">{t.modeInPerson}</option>
              <option value="phone">{t.modePhone}</option>
            </select>
          </div>
        </div>

        {/* Psychiatrists Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
            {filteredDoctors.map((psychiatrist) => (
              <PsychiatristCard
                key={psychiatrist.id}
                psychiatrist={psychiatrist}
                extraReviews={reviewsMap[psychiatrist.id] || []}
                onViewProfile={(doc) => setSelectedDoctorForProfile(doc)}
                onBookSession={handleBookSession}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8 shadow-xs">
            <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <SearchX className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">
              {t.noDoctorsFound}
            </h3>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSpecialty('');
                setSelectedMode('all');
              }}
              className="mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
            >
              {t.clearFilters}
            </button>
          </div>
        )}
      </main>

      {/* Mental Health Articles & Evidence-Based Coping Strategies */}
      <div id="coping-strategies">
        <CopingStrategiesSection
          onBookPsychiatrist={() => {
            const doctorsEl = document.querySelector('main');
            if (doctorsEl) {
              doctorsEl.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo({ top: 350, behavior: 'smooth' });
            }
          }}
        />
      </div>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
      />

      {selectedDoctorForProfile && (
        <PsychiatristProfileView
          psychiatrist={selectedDoctorForProfile}
          customReviews={reviewsMap[selectedDoctorForProfile.id] || []}
          onClose={() => setSelectedDoctorForProfile(null)}
          onBookAppointment={handleBookSession}
          onLeaveReview={(doc) => handleOpenReview(doc)}
        />
      )}

      {selectedDoctorForBooking && (
        <CalendarScheduler
          isOpen={true}
          psychiatrist={selectedDoctorForBooking}
          onClose={() => setSelectedDoctorForBooking(null)}
          onAppointmentBooked={handleAppointmentBooked}
          onRequestAuth={() => handleOpenAuth('login')}
          onPayNow={(createdApt) => {
            setSelectedDoctorForBooking(null);
            handleOpenPayment(createdApt);
          }}
        />
      )}

      <MyAppointmentsModal
        isOpen={appointmentsModalOpen}
        appointments={appointments}
        onClose={() => setAppointmentsModalOpen(false)}
        onExploreDoctors={() => {
          setAppointmentsModalOpen(false);
          window.scrollTo({ top: 300, behavior: 'smooth' });
        }}
        onOpenPayment={(apt) => {
          setAppointmentsModalOpen(false);
          handleOpenPayment(apt);
        }}
        onLeaveReviewForAppointment={(apt) => {
          const doc = initialPsychiatrists.find((d) => d.id === apt.psychiatristId);
          if (doc) {
            setAppointmentsModalOpen(false);
            handleOpenReview(doc, apt);
          }
        }}
      />

      {reviewModalOpen && reviewPsychiatrist && (
        <ReviewModal
          isOpen={true}
          psychiatrist={reviewPsychiatrist}
          appointment={reviewAppointment}
          onClose={() => setReviewModalOpen(false)}
          onReviewSubmitted={handleReviewSubmitted}
          onRequestAuth={() => {
            setReviewModalOpen(false);
            handleOpenAuth('login');
          }}
        />
      )}

      {/* Secured Payment Wallet Modal (+251944692238 Telebirr & CBE Birr) */}
      <PaymentWalletModal
        isOpen={paymentWalletOpen}
        appointment={paymentAppointment}
        allAppointments={appointments}
        onClose={() => setPaymentWalletOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        onSelectAppointment={(apt) => setPaymentAppointment(apt)}
        onBookNewAppointment={() => {
          setPaymentWalletOpen(false);
          const doctorsEl = document.querySelector('main');
          if (doctorsEl) {
            doctorsEl.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 300, behavior: 'smooth' });
          }
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
