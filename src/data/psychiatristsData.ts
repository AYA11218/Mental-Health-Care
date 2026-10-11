import { Psychiatrist } from '../types';

export const initialPsychiatrists: Psychiatrist[] = [
  {
    id: 'dr-yonas-alemu',
    name: {
      en: 'Dr. Yonas Alemu, MD, PhD',
      am: 'ዶ/ር ዮናስ አለሙ (MD, PhD)',
    },
    title: {
      en: 'Senior Consultant Psychiatrist & Associate Professor',
      am: 'ከፍተኛ አማካሪ የአእምሮ ሐኪም እና ተባባሪ ፕሮፌሰር',
    },
    credentials: {
      en: 'MD, PhD in Neuropsychiatry, Fellow of the Royal College of Psychiatrists (FRCPsych)',
      am: 'የሜዲሲን ዶክትሬት (MD)፣ የኒውሮሳይኪያትሪ ፒኤችዲ (PhD)፣ የሮያል ኮሌጅ ባልደረባ',
    },
    bio: {
      en: 'Dr. Yonas Alemu has over 16 years of clinical psychiatry experience specializing in severe mood disorders, adult ADHD, and complex anxiety. He served as Chief of Clinical Services at Amanuel Mental Specialized Hospital and is an international speaker on culturally adaptive psychological interventions in East Africa.',
      am: 'ዶ/ር ዮናስ አለሙ ከ16 ዓመታት በላይ በክሊኒካል ሳይኪያትሪ የካበተ ልምድ ያላቸው ሲሆን በተለይም በከፍተኛ ድብርት፣ በጭንቀት እና በአዋቂዎች ትኩረት ማጣት ችግሮች ላይ ስፔሻላይዝ አድርገዋል። በአማኑኤል የአእምሮ ስፔሻላይዝድ ሆስፒታል ውስጥ በዋና የህክምና አገልግሎቶች መሪነት አገልግለዋል።',
    },
    specializations: {
      en: ['Depression & Bipolar Disorder', 'Anxiety & Panic Disorders', 'Adult ADHD', 'Psychopharmacology', 'Post-Traumatic Stress (PTSD)'],
      am: ['የድብርት እና ባይፖላር ህመም', 'ጭንቀት እና ድንገተኛ ፍርሃት', 'የትኩረት ማጣት (ADHD)', 'የሳይኪያትሪክ መድሃኒቶች ክትትል', 'የአእምሮ ጫና እና ድንጋጤ (PTSD)'],
    },
    languages: ['English', 'Amharic (አማርኛ)'],
    rating: 4.95,
    reviewCount: 142,
    experienceYears: 16,
    hourlyRateETB: 2400,
    hourlyRateUSD: 65,
    education: {
      en: [
        'Doctor of Medicine (MD) – Addis Ababa University, Tikur Anbessa',
        'Residency in Psychiatry – Amanuel Mental Specialized Hospital',
        'PhD in Neuropsychiatry – Karolinska Institute, Sweden',
      ],
      am: [
        'የሜዲካል ዶክትሬት (MD) – አዲስ አበባ ዩኒቨርሲቲ፣ ጥቁር አንበሳ',
        'የሳይኪያትሪ ስፔሻሊቲ – አማኑኤል የአእምሮ ስፔሻላይዝድ ሆስፒታል',
        'የኒውሮሳይኪያትሪ ፒኤችዲ (PhD) – ካሮሊንስካ ኢንስቲትዩት፣ ስዊድን',
      ],
    },
    certifications: {
      en: [
        'Board Certified Psychiatrist – Ethiopian Medical Council',
        'International Fellow, World Psychiatric Association (WPA)',
        'Certified Cognitive Behavioral Therapist (Beck Institute)',
      ],
      am: [
        'የተረጋገጠ የአእምሮ ስፔሻሊስት – የኢትዮጵያ ህክምና ምክር ቤት',
        'የአለም አቀፍ ሳይኪያትሪ ማህበር (WPA) አባል',
        'የኮግኒቲቭ ቢሄቪየራል ቴራፒ (CBT) የተረጋገጠ ሰርተፍኬት',
      ],
    },
    hospitalAffiliation: {
      en: "Amanuel Mental Specialized Hospital & SelamCare Center, Addis Ababa",
      am: "አማኑኤል የአእምሮ ስፔሻላይዝድ ሆስፒታል እና ሰላም ኬር ማዕከል፣ አዲስ አበባ",
    },
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    consultationModes: ['video', 'in_person', 'phone'],
    availableDays: [1, 2, 4, 5, 6], // Mon, Tue, Thu, Fri, Sat
    timeSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'],
    reviews: [
      {
        id: 'rev-1',
        userName: 'Dawit K.',
        rating: 5,
        comment: {
          en: 'Dr. Yonas was deeply empathetic and understood my anxiety without judgment. His medication plan and grounding exercises changed my life.',
          am: 'ዶ/ር ዮናስ በጣም አዳማጭ እና ሩህሩህ ናቸው። የሰጡኝ የህክምና ምክር እና መመሪያ ጭንቀቴን ሙሉ በሙሉ ቀልብሶልኛል።',
        },
        date: '2026-09-18',
      },
      {
        id: 'rev-2',
        userName: 'Sara M.',
        rating: 5,
        comment: {
          en: 'Incredible psychiatrist. The telehealth video option was flawless and very private.',
          am: 'ድንቅ ሐኪም! በቪዲዮ የተደረገው የምክክር ክፍለ ጊዜ በጣም ምቹ እና ሚስጥራዊ ነበር።',
        },
        date: '2026-08-25',
      },
    ],
  },
  {
    id: 'dr-bethlehem-tesfaye',
    name: {
      en: 'Dr. Bethlehem Tesfaye, MD',
      am: 'ዶ/ር ቤተልሔም ተስፋዬ (MD)',
    },
    title: {
      en: 'Consultant Child, Adolescent & Family Psychiatrist',
      am: 'የህጻናት፣ ወጣቶች እና ቤተሰብ አማካሪ የአእምሮ ሐኪም',
    },
    credentials: {
      en: 'MD, Child & Adolescent Psychiatry Specialist, Member of AACAP',
      am: 'የሜዲካል ዶክተር (MD)፣ የህጻናት እና ወጣቶች ሳይኪያትሪ ስፔሻሊስት',
    },
    bio: {
      en: 'Dr. Bethlehem Tesfaye is dedicated to helping children, teenagers, and parents navigate neurodevelopmental conditions, school anxiety, behavioral challenges, and early trauma. She brings warmth, evidence-based family psychotherapy, and mindful communication to every session.',
      am: 'ዶ/ር ቤተልሔም ተስፋዬ ህጻናት፣ ወጣቶች እና ወላጆች በትምህርት ቤት ጭንቀት፣ በስነ-ልቦናዊ ለውጦች፣ እና በባህሪ መዛባት ዙሪያ ያሉ ችግሮችን በሙያዊ መንገድ እንዲፈቱ ያግዛሉ። በቤተሰብ ምክክር ከፍተኛ ልምድ አላቸው።',
    },
    specializations: {
      en: ['Child & Adolescent Psychiatry', 'Parenting & Family Dynamics', 'Autism & ADHD Management', 'Teen Depression & Self-Esteem', 'Obsessive-Compulsive Disorder (OCD)'],
      am: ['የህጻናት እና ወጣቶች ሳይኪያትሪ', 'የወላጅነት እና የቤተሰብ ምክክር', 'የኦቲዝም እና ADHD ክትትል', 'የወጣቶች ድብርት እና በራስ መተማመን', 'ተደጋጋሚ አስጨናቂ ሃሳብ (OCD)'],
    },
    languages: ['English', 'Amharic (አማርኛ)', 'Afaan Oromoo'],
    rating: 4.98,
    reviewCount: 98,
    experienceYears: 12,
    hourlyRateETB: 2200,
    hourlyRateUSD: 60,
    education: {
      en: [
        'Doctor of Medicine (MD) – Jimma University College of Public Health & Medical Sciences',
        'Specialty Fellowship in Child & Adolescent Psychiatry – University of Toronto / SPHMMC',
      ],
      am: [
        'የሜዲካል ዶክተር (MD) – ጅማ ዩኒቨርሲቲ',
        'የህጻናት እና ወጣቶች ሳይኪያትሪ ፌሎውሺፕ – ቶሮንቶ ዩኒቨርሲቲ / ቅዱስ ጳውሎስ',
      ],
    },
    certifications: {
      en: [
        'Licensed Consultant Psychiatrist (Ministry of Health Ethiopia)',
        'Certified Family Systems Therapist',
        'Parent-Child Interaction Therapy (PCIT) Accredited',
      ],
      am: [
        'ህጋዊ የአማካሪ ሳይኪያትሪስት ፈቃድ (የኢትዮጵያ ጤና ጥበቃ)',
        'የተረጋገጠ የቤተሰብ ቴራፒስት',
        'የወላጅ እና ልጅ ግንኙነት ቴራፒ (PCIT) እውቅና ያለው',
      ],
    },
    hospitalAffiliation: {
      en: "St. Paul's Hospital Millennium Medical College (SPHMMC), Addis Ababa",
      am: "ቅዱስ ጳውሎስ ሆስፒታል ሚሊኒየም ሜዲካል ኮሌጅ፣ አዲስ አበባ",
    },
    avatar: 'https://images.unsplash.com/photo-1594824813576-a49ef854eb11?auto=format&fit=crop&w=600&q=80',
    consultationModes: ['video', 'in_person', 'phone'],
    availableDays: [1, 3, 5, 6], // Mon, Wed, Fri, Sat
    timeSlots: ['09:30 AM', '11:00 AM', '02:30 PM', '04:00 PM', '05:30 PM'],
    reviews: [
      {
        id: 'rev-3',
        userName: 'Helen T.',
        rating: 5,
        comment: {
          en: 'She connected so naturally with our 14-year-old daughter who was struggling with severe exam anxiety. Highly recommended!',
          am: 'ከ14 ዓመት ልጃችን ጋር የነበራት ተግባቦት ድንቅ ነበር። የትምህርት ጭንቀቷ በከፍተኛ ሁኔታ ቀሏል። ከልብ አመሰግናለሁ!',
        },
        date: '2026-09-02',
      },
    ],
  },
  {
    id: 'dr-solomon-kebede',
    name: {
      en: 'Dr. Solomon Kebede, MD, MSc',
      am: 'ዶ/ር ሰለሞን ከበደ (MD, MSc)',
    },
    title: {
      en: 'Consultant Clinical Psychiatrist & Addiction Medicine Specialist',
      am: 'አማካሪ ክሊኒካል ሳይኪያትሪስት እና የሱስ ህክምና ስፔሻሊስት',
    },
    credentials: {
      en: 'MD, Master of Science in Addiction Studies (MSc), ISAM Certified',
      am: 'የሜዲካል ዶክትሬት (MD)፣ የሱስ ጥናት ማስተርስ (MSc)፣ የአለም አቀፍ የሱስ ህክምና ማህበር አባል',
    },
    bio: {
      en: 'Dr. Solomon Kebede is a pioneering clinician in addiction recovery, dual diagnosis (co-occurring mental health and substance dependency), and corporate stress resilience. He combines medical pharmacotherapy with motivational interviewing to guide patients toward sustained recovery.',
      am: 'ዶ/ር ሰለሞን ከበደ ከሱስ ማገገም፣ ድርብ ስነ-ልቦናዊ ችግሮች እና የስራ ቦታ ከፍተኛ የአእምሮ ውጥረት ላይ ሰፊ ልምድ ያላቸው ሐኪም ናቸው። ሳይንሳዊ የህክምና ክትትልን ከስነ-ልቦናዊ ማበረታቻ ጋር አጣምረው ይሰጣሉ።',
    },
    specializations: {
      en: ['Addiction & Substance Recovery', 'Dual Diagnosis (Depression + Addiction)', 'Workplace Burnout & Executive Stress', 'Sleep Disorders & Insomnia', 'Grief & Bereavement'],
      am: ['የሱስ እና አልኮል ማገገሚያ ህክምና', 'ድርብ ችግር (ድብርት + ሱስ)', 'የስራ ቦታ ውጥረትና ድካም', 'የእንቅልፍ እጦት ችግሮች', 'የሀዘን እና ተስፋ መቁረጥ ምክክር'],
    },
    languages: ['English', 'Amharic (አማርኛ)'],
    rating: 4.88,
    reviewCount: 76,
    experienceYears: 14,
    hourlyRateETB: 2500,
    hourlyRateUSD: 70,
    education: {
      en: [
        'MD – Addis Ababa University School of Medicine',
        'MSc in Addiction Studies – King’s College London, UK',
        'Specialist Fellowship – International Society of Addiction Medicine (ISAM)',
      ],
      am: [
        'የህክምና ዶክትሬት (MD) – አዲስ አበባ ዩኒቨርሲቲ',
        'የሱስ ጥናት ማስተርስ (MSc) – ኪንግስ ኮሌጅ ለንደን፣ እንግሊዝ',
        'ስፔሻሊስት ፌሎውሺፕ – የአለም አቀፍ ሱስ ህክምና ማህበር (ISAM)',
      ],
    },
    certifications: {
      en: [
        'International Certification in Addiction Medicine (ISAM)',
        'Certified Motivational Interviewing Practitioner',
        'Senior Clinical Preceptor – Ethiopian Psychiatric Association',
      ],
      am: [
        'የአለም አቀፍ የሱስ ህክምና ሰርተፍኬት',
        'የተረጋገጠ የማበረታቻ ምክክር ባለሙያ',
        'የኢትዮጵያ ሳይኪያትሪክ ማህበር ከፍተኛ አባል',
      ],
    },
    hospitalAffiliation: {
      en: 'Tikur Anbessa Specialized Hospital & Hope Recovery Clinic, Addis Ababa',
      am: 'ጥቁር አንበሳ ስፔሻላይዝድ ሆስፒታል እና ሆፕ ማገገሚያ ክሊኒክ፣ አዲስ አበባ',
    },
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    consultationModes: ['video', 'in_person', 'phone'],
    availableDays: [2, 3, 4, 6], // Tue, Wed, Thu, Sat
    timeSlots: ['10:00 AM', '11:30 AM', '03:00 PM', '04:30 PM', '06:00 PM'],
    reviews: [
      {
        id: 'rev-4',
        userName: 'Abebe W.',
        rating: 5,
        comment: {
          en: 'Dr. Solomon saved our family. His respectful, non-stigmatizing approach helped me regain control of my life and sleep peacefully.',
          am: 'ዶ/ር ሰለሞን ቤተሰባችንን ታድገዋል! ያለምንም መድልዎ በከፍተኛ ክብር እና ሙያዊ ብቃት የሰጡኝ ህክምና ሰላሜን አስመልሶልኛል።',
        },
        date: '2026-07-14',
      },
    ],
  },
  {
    id: 'dr-rahel-gebre',
    name: {
      en: 'Dr. Rahel Gebre, MD',
      am: 'ዶ/ር ራሔል ገብሬ (MD)',
    },
    title: {
      en: 'Consultant Women’s Mental Health & Perinatal Psychiatrist',
      am: 'የሴቶች አእምሮ ጤና እና የእርግዝና/ወሊድ አማካሪ ሳይኪያትሪስት',
    },
    credentials: {
      en: 'MD, Perinatal Mental Health Specialist, Certified Psychodynamic Psychotherapist',
      am: 'የህክምና ዶክትሬት (MD)፣ የድህረ-ወሊድ አእምሮ ጤና ስፔሻሊስት፣ የሳይኮዳይናሚክ ቴራፒስት',
    },
    bio: {
      en: 'Dr. Rahel Gebre specializes in women’s mental health through all life stages, focusing on postpartum depression, perinatal anxiety, hormonal mood changes, and trauma recovery. She creates a warm, confidential sanctuary where clients feel heard and supported.',
      am: 'ዶ/ር ራሔል ገብሬ በሴቶች አእምሮ ጤና ላይ ትኩረት አድርገው የሚሰሩ ሲሆን በተለይም በድህረ-ወሊድ ድብርት፣ በእርግዝና ወቅት ጭንቀት፣ በሆርሞን ለውጥ ሳቢያ የሚመጣ የስሜት መለዋወጥ እና የሴቶች አእምሮአዊ ጥንካሬ ላይ ያማክራሉ።',
    },
    specializations: {
      en: ['Postpartum & Perinatal Depression', 'Women’s Reproductive Mental Health', 'Trauma & Relationship Counseling', 'Panic Disorders & Phobias', 'Mindfulness-Based Stress Reduction'],
      am: ['የድህረ-ወሊድ እና እርግዝና ድብርት', 'የሴቶች ስነ-ተዋልዶ አእምሮ ጤና', 'የግንኙነት እና የትዳር ምክክር', 'ፍርሃት እና ድንገተኛ ድንጋጤ', 'የማሰላሰል እና አእምሮ ማረጋጋት ዘዴዎች'],
    },
    languages: ['English', 'Amharic (አማርኛ)', 'Tigrinya (ትግርኛ)'],
    rating: 4.97,
    reviewCount: 115,
    experienceYears: 11,
    hourlyRateETB: 2300,
    hourlyRateUSD: 60,
    education: {
      en: [
        'MD – Gondar College of Medicine & Health Sciences',
        'Postgraduate Fellowship in Perinatal Psychiatry – Johns Hopkins Medicine / Ethiopia Initiative',
      ],
      am: [
        'የህክምና ዶክትሬት (MD) – ጎንደር የህክምና እና ጤና ሳይንስ ኮሌጅ',
        'የድህረ-ወሊድ ሳይኪያትሪ ፌሎውሺፕ – ጆንስ ሆፕኪንስ ሜዲሲን',
      ],
    },
    certifications: {
      en: [
        'Fellow of the International Marcé Society for Perinatal Mental Health',
        'Certified Compassion-Focused Therapy Practitioner',
      ],
      am: [
        'የአለም አቀፍ ማርሴ የድህረ-ወሊድ አእምሮ ጤና ማህበር ባልደረባ',
        'የተረጋገጠ ርህራሄ-መር ቴራፒስት',
      ],
    },
    hospitalAffiliation: {
      en: 'Gandhi Memorial Women’s Hospital & SelamCare Center, Addis Ababa',
      am: 'ጋንዲ መታሰቢያ የሴቶች ሆስፒታል እና ሰላም ኬር ማዕከል፣ አዲስ አበባ',
    },
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    consultationModes: ['video', 'in_person', 'phone'],
    availableDays: [1, 2, 3, 5], // Mon, Tue, Wed, Fri
    timeSlots: ['09:00 AM', '10:30 AM', '01:30 PM', '03:00 PM', '04:30 PM'],
    reviews: [
      {
        id: 'rev-5',
        userName: 'Tigist A.',
        rating: 5,
        comment: {
          en: 'After giving birth to my first child, postpartum depression hit me so hard. Dr. Rahel’s calm guidance and treatment restored my joy in motherhood.',
          am: 'የመጀመሪያ ልጄን ከወለድኩ በኋላ በከፍተኛ የድህረ-ወሊድ ድብርት ተውጬ ነበር። ዶ/ር ራሔል በእርጋታ እና በፍቅር የሰጡኝ ህክምና ወደ ቀደመው ደስታዬ መልሶኛል።',
        },
        date: '2026-08-11',
      },
    ],
  },
];
