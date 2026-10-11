import { MentalHealthArticle } from '../types';

export const mentalHealthArticles: MentalHealthArticle[] = [
  {
    id: 'art-54321-grounding',
    topic: 'anxiety',
    title: {
      en: 'The 5-4-3-2-1 Sensory Grounding Technique: Halt Acute Anxiety',
      am: 'የ 5-4-3-2-1 የስሜት ህዋሳት ማረጋጊያ ዘዴ፡ ድንገተኛ ጭንቀትን ማቆም',
    },
    summary: {
      en: 'A rapid, neuroscience-supported somatic tool to disengage the brain’s amygdala fight-or-flight alarm and anchor your nervous system back in the present moment.',
      am: 'ድንገተኛ ፍርሃት እና ጭንቀት ሲሰማ የአእምሮን የማንቂያ ደወል በማረጋጋት ሰውነትን ወደ መረጋጋት እና ወደ አሁን ጊዜ የሚመልስ ሳይንሳዊ ዘዴ።',
    },
    readTime: '4 min read',
    evidenceBase: {
      en: 'Somatic Sensory Reorientation / CBT Protocol',
      am: 'የስሜት ህዋሳት ማረጋጊያ እና የኮግኒቲቭ ቢሄቪየራል ቴራፒ (CBT) ዘዴ',
    },
    medicalReviewer: 'Dr. Yonas Alemu, MD, PhD (Neuropsychiatrist)',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    keyTakeaway: {
      en: 'When panic strikes, your cortex is hijacked. Forcing sensory observation redirects blood flow back to executive decision-making networks.',
      am: 'ድንገተኛ ፍርሃት ሲከሰት የስሜት ህዋሳትን ወደ ተጨባጭ ነገሮች ማዞር አእምሮን በደቂቃዎች ውስጥ ወደ ተፈጥሯዊ መረጋጋቱ ይመልሰዋል።',
    },
    actionableSteps: {
      en: [
        'Notice 5 things you can SEE around you (e.g., patterns on the wall, a tree branch, the curve of a chair).',
        'Acknowledge 4 things you can physically TOUCH or FEEL (e.g., your feet against the floor, fabric of your shirt).',
        'Identify 3 distinct sounds you can HEAR (e.g., distant traffic, humming refrigerator, birds outside).',
        'Notice 2 things you can SMELL right now (e.g., coffee aroma, fresh air, paper, soap).',
        'Focus on 1 thing you can TASTE (e.g., sip of cool water, lingering mint, or the roof of your mouth).',
      ],
      am: [
        'በዙሪያዎ ማየት የሚችሏቸውን 5 ነገሮች በጥሞና ይመልከቱ (ለምሳሌ የግድግዳ ቀለም፣ የዛፍ ቅጠል፣ የወንበሩ ቅርጽ)።',
        'በእጅዎ ወይም በሰውነትዎ የሚሰማዎትን 4 ነገሮች ይንኩ/ያስተውሉ (ለምሳሌ እግርዎ መሬት ላይ ያለው ስሜት፣ የልብስዎ ቅጥነት)።',
        'የሚሰሙትን 3 የተለያዩ ድምፆች ለይተው ያድምጡ (ለምሳሌ የመኪና ድምፅ፣ የሰዓት እንቅስቃሴ፣ የአእዋፍ ጩኸት)።',
        'ማሽተት የሚችሏቸውን 2 ሽታዎች ልብ ይበሉ (ለምሳሌ የቡና መዓዛ፣ ንጹህ አየር፣ የሳሙና ሽታ)።',
        'በአፍዎ ውስጥ ያለውን 1 ጣዕም ያስተውሉ (ለምሳሌ የቀዘቀዘ ውሃ ፉት ማለት ወይም የሻይ ጣዕም)።',
      ],
    },
    fullContent: {
      en: `When overwhelming panic strikes, the amygdala fires rapid signals that flood your system with cortisol and adrenaline. The 5-4-3-2-1 method works because sensory processing requires the active involvement of your prefrontal cortex, which dampens the physiological alarm loop.

Practice taking slow diaphragmatic breaths throughout each step. You don't have to rush through the list—spend 10-15 seconds immersed in each sensory cue. This breaks dissociative loops and reminds your brain that in this exact second, you are physically safe.`,
      am: `ድንገተኛ የፍርሃት ስሜት ሲመጣ የአእምሯችን መከላከያ ክፍል ሰውነታችንን በጭንቀት ሆርሞኖች ይሞላዋል። የ 5-4-3-2-1 ዘዴ የስሜት ህዋሳቶቻችንን በቀጥታ ከተጨባጭ አለም ጋር በማገናኘት የፍርሃቱን ደወል ያበርዳል።

በእያንዳንዱ ደረጃ ወቅት ረጋ ብለው ከሆድዎ በጥልቀት ይተንፍሱ። መቸኮል አያስፈልግም፤ በእያንዳንዱ የስሜት ህዋሳት ላይ ከ10 እስከ 15 ሰከንድ በማሳለፍ አእምሮዎ አሁን ባሉበት ቦታ ላይ ሙሉ በሙሉ ሰላም መሆኑን እንዲያውቅ ያድርጉ።`,
    },
  },
  {
    id: 'art-cognitive-reframing',
    topic: 'depression',
    title: {
      en: 'Cognitive Reframing: Breaking Free from Depressive Thought Spirals',
      am: 'የአስተሳሰብ ለውጥ (Cognitive Reframing)፡ ተደጋጋሚ ጨለምተኛ ሃሳቦችን ማፍረስ',
    },
    summary: {
      en: 'Learn how to identify cognitive distortions like catastrophizing and all-or-nothing thinking, and replace them with objective, balanced perspectives.',
      am: 'ሁሉንም ነገር እንደ ተበላሸ ወይም ተስፋ እንደሌለው አድርገው የሚያሳዩ የተሳሳቱ የአእምሮ ድምፆችን ለይቶ በማወቅ በተጨባጭ ሚዛናዊ እውነታዎች መተካት።',
    },
    readTime: '6 min read',
    evidenceBase: {
      en: 'Beck Institute Cognitive Behavioral Therapy (CBT)',
      am: 'የቤክ ኢንስቲትዩት የኮግኒቲቭ ቢሄቪየራል ቴራፒ (CBT) ማዕቀፍ',
    },
    medicalReviewer: 'Dr. Solomon Kebede, MD, MSc (Clinical Psychiatrist)',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
    keyTakeaway: {
      en: 'Thoughts are mental events, not immutable facts. By putting automatic thoughts on trial, emotional heaviness lifts significantly.',
      am: 'የአእምሮ ሃሳቦች የጭንቅላት ፈጠራ እንጂ ሁልጊዜ ትክክለኛ እውነታዎች አይደሉም። ሃሳቦችን በሚዛን በመመርመር የስሜት ጫናን በእጅጉ ማቅለል ይቻላል።',
    },
    actionableSteps: {
      en: [
        'Catch the Trigger: Write down the exact phrase your mind just generated (e.g., "I will never succeed at this").',
        'Identify the Distortion: Is this "All-or-Nothing", "Mind Reading", or "Fortune Telling"?',
        'Examine the Evidence: What factual, court-admissible proof supports this? What proof contradicts it?',
        'Craft a Balanced Counter-Thought: Not toxic positivity, but realistic truth (e.g., "This is difficult today, but I have resolved setbacks before").',
      ],
      am: [
        'የቀሰቀሰውን ሃሳብ ያዙ፡ በአእምሮዎ ውስጥ የመጣውን ትክክለኛ ዓረፍተ ነገር ይጻፉ (ለምሳሌ "እኔ ምንም አልችልም" ወይም "ሁሉ ነገር አብቅቶለታል")።',
        'የስህተቱን ዓይነት ይለዩ፡ ሃሳቡ "ጥቁር ወይም ነጭ ብቻ" (All-or-nothing) ነው ወይስ የወደፊት መጥፎ ትንበያ?።',
        'ማስረጃውን ይመርምሩ፡ ይህንን ሃሳብ የሚያረጋግጥ ምን ተጨባጭ እውነት አለ? የሚቃወመውስ ምን መልካም ተሞክሮ አለ?።',
        'ሚዛናዊ እውነታን ይቅረጹ፡ አላስፈላጊ የውሸት ደስታ ሳይሆን ተጨባጭ እውነት (ለምሳሌ "ዛሬ ከባድ ሊሆን ይችላል፣ ነገር ግን ከዚህ በፊት ብዙ ፈተናዎችን አልፌያለሁ")።',
      ],
    },
    fullContent: {
      en: `Depression has a megaphone that distorts reality, making temporary pain feel permanent and personal mistakes feel catastrophic. Cognitive Reframing is not about pretending everything is fine. It is about demanding strict evidence for the harsh narratives your brain manufactures.

When you practice the "Catch it, Check it, Change it" cycle over two weeks, functional MRI studies show physical reorganization in emotional regulation centers.`,
      am: `ድብርት ጊዜያዊ ችግሮችን እንደ ዘላቂ ጥፋት፣ ትናንሽ ስህተቶችን ደግሞ እንደ ሙሉ ውድቀት አድርጎ የሚያጋንን አታላይ ድምፅ አለው። የአስተሳሰብ ለውጥ (Cognitive Reframing) ማለት ችግሮችን መካድ ሳይሆን አእምሯችን ለሚያመነጫቸው አስጨናቂ ሃሳቦች ተጨባጭ ማስረጃ መጠየቅ ነው።

ሃሳብን የመያዝ፣ የመመርመር እና ወደ ሚዛናዊ እውነት የመቀየር ልምምድን በቋሚነት ሲተገብሩ የአእምሮ ስነ-ስርዓት ወደ ተረጋጋ የህይወት እይታ ይለወጣል።`,
    },
  },
  {
    id: 'art-sleep-hygiene-protocol',
    topic: 'sleep',
    title: {
      en: 'The 4-7-8 Parasympathetic Protocol: Overcoming Midnight Insomnia',
      am: 'የ 4-7-8 ጥልቅ የአተነፋፈስ ዘዴ፡ የእንቅልፍ እጦትንና ሌሊት መንቃትን ማሸነፍ',
    },
    summary: {
      en: 'A natural tranquilizer for the nervous system designed by sleep clinicians to reduce heart rate and trigger restorative delta-wave sleep.',
      am: 'የልብ ምትን በማረጋጋት፣ የጡንቻ ውጥረትን በማስወገድ እና የተረጋጋ ጥልቅ እንቅልፍ እንዲመጣ የሚያደርግ ሳይንሳዊ የአተነፋፈስ ህክምና።',
    },
    readTime: '5 min read',
    evidenceBase: {
      en: 'CBT-I (Cognitive Behavioral Therapy for Insomnia) Protocol',
      am: 'የእንቅልፍ እጦት የኮግኒቲቭ ቢሄቪየራል ቴራፒ (CBT-I) መመሪያ',
    },
    medicalReviewer: 'Dr. Bethlehem Tesfaye, MD (Consultant Psychiatrist)',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    keyTakeaway: {
      en: 'Holding your breath for 7 seconds allows red blood cells to oxygenate fully while lowering arterial blood pressure.',
      am: 'ትንፋሽን ለ7 ሰከንድ መያዝ የደም ግፊትንና የልብ ምትን በማረጋጋት ሰውነት ወደ እንቅልፍ እንዲገባ ያደርጋል።',
    },
    actionableSteps: {
      en: [
        'Empty your lungs completely through your mouth with a soft whoosh sound.',
        'Close your mouth and inhale quietly through your nose for a mental count of 4.',
        'Hold your breath comfortably for a count of 7.',
        'Exhale completely through your mouth, making a whoosh sound for 8 seconds.',
        'Repeat this cycle for 4 full rounds before bedtime or when waking up in the middle of the night.',
      ],
      am: [
        'በአፍዎ ሙሉ ትንፋሽዎን ቀስ ብለው ወደ ውጭ ያስወጡ።',
        'አፍዎን ዘግተው በአፍንጫዎ ቀስ ብለው እየቆጠሩ ለ4 ሰከንድ አየር ወደ ውስጥ ይሳቡ።',
        'የሳቡትን አየር ሳያስወጡ ለ7 ሰከንድ ያህል ይያዙት።',
        'በአፍዎ ረጋ ብለው እየቆጠሩ ለ8 ሰከንድ ሙሉ አየሩን ወደ ውጭ ያስወጡ።',
        'ይህን ዑደት ለ4 ጊዜ ያህል ከመተኛትዎ በፊት ወይም በሌሊት ሲነቁ ይድገሙት።',
      ],
    },
    fullContent: {
      en: `When you lie awake staring at the clock, anxiety about not sleeping triggers sympathetic nervous system arousal. This makes sleep neurochemically impossible. The 4-7-8 breathing method mimics the breathing pattern of deep sleep, tricking the brain into activating the vagus nerve.

Combine this with the 20-minute stimulus control rule: if you are still awake after 20 minutes, get out of bed into dim light, read something calm, and only return when eyelids feel heavy.`,
      am: `መተኛት አቅቷችሁ ሰዓት ስትመለከቱ "እንቅልፍ አልወሰደኝም" የሚለው ጭንቀት ራሱ እንቅልፍ እንዳይመጣ ያደርጋል። የ 4-7-8 አተነፋፈስ ሰውነታችን በጥልቅ እንቅልፍ ውስጥ እያለ የሚተነፍሰውን አይነት ምት ስለሚፈጥር አእምሮ በደቂቃዎች ውስጥ ወደ እረፍት እንዲገባ ያስገድዳል።

ይህንን ከ20 ደቂቃ ህግ ጋር ያጣምሩት፡ በአልጋ ላይ ተኝተው ለ20 ደቂቃ እንቅልፍ ካልመጣ ከአልጋ ውጡ፣ ደብዛዛ ብርሃን ወዳለው ክፍል ሄዳችሁ ረጋ ያለ መጽሐፍ አንብቡ፣ ዓይናችሁ ሲከብድ ብቻ ወደ አልጋ ተመለሱ።`,
    },
  },
  {
    id: 'art-workplace-burnout',
    topic: 'stress',
    title: {
      en: 'The Boundary Audit: Protecting Yourself from Chronic Burnout',
      am: 'ጤናማ ድንበር ማበጀት (Boundaries)፡ ራስን ከስራና ከህይወት ከፍተኛ ድካም መጠበቅ',
    },
    summary: {
      en: 'Practical scripts and emotional boundary strategies to stop overcommitting, overcome people-pleasing guilt, and restore vital energy.',
      am: 'ለሌሎች "እሺ" በማለት ራስን ከማድከም መውጣት፣ የጥፋተኝነት ስሜት ሳይሰማን ድንበር ማስከበር እና ህይወትን ማደስ።',
    },
    readTime: '5 min read',
    evidenceBase: {
      en: 'Occupational Health Psychology & Acceptance Commitment Therapy (ACT)',
      am: 'የስራ ቦታ ስነ-ልቦና እና የተግባር ቁርጠኝነት ቴራፒ (ACT)',
    },
    medicalReviewer: 'Dr. Solomon Kebede, MD, MSc',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    keyTakeaway: {
      en: 'Burnout is not a personal failure of resilience; it is a lack of recovery buffers. "No" is a complete sentence that protects your mental health.',
      am: 'ከፍተኛ ድካም የጥንካሬ ማነስ ሳይሆን የሰውነት እረፍት ማጣት ውጤት ነው። "አይሆንም/አይመቸኝም" ማለት የአእምሮ ጤናን የሚጠብቅ ሙሉ ውሳኔ ነው።',
    },
    actionableSteps: {
      en: [
        'The 24-Hour Decision Buffer: Never accept non-urgent requests instantly. Say: "Let me check my priorities and get back to you by tomorrow."',
        'Identify Energy Drains vs. Energy Fillers: Catalog tasks that leave you physically exhausted.',
        'Protect Digital Sunset: Turn off work messaging apps 90 minutes before bed.',
        'Practice Guilt Toleration: Understand that healthy boundaries feel uncomfortable initially, but prevent depression long term.',
      ],
      am: [
        'የ24 ሰዓት የውሳኔ ማቆያ፡ አዳዲስ ጥያቄዎች ሲመጡ ወዲያውኑ "እሺ" አይበሉ፤ "ፕሮግራሜን አይቼ ነገ መልስ እሰጥሃለሁ/ሻለሁ" ይበሉ።',
        'ጉልበትዎን የሚያሟጡ ነገሮችን ይለዩ፡ ከአቅም በላይ ጫና የሚፈጥሩብዎትን ስራዎች በግልጽ ይመዝግቡ።',
        'የዲጂታል ስልክ እረፍት፡ ከመኝታ ሰዓት 90 ደቂቃ በፊት የስራ መልዕክቶችንና ማህበራዊ ሚዲያዎችን ያጥፉ።',
        'ጊዜያዊ የጥፋተኝነት ስሜትን መቋቋም፡ ድንበር ማበጀት መጀመሪያ ላይ የጥፋተኝነት ስሜት ሊፈጥር ይችላል፤ ነገር ግን ዘላቂ የአእምሮ ሰላም ይሰጣል።',
      ],
    },
    fullContent: {
      en: `Chronic stress dysregulates the hypothalamic-pituitary-adrenal (HPA) axis, leading to memory fog, irritability, and immune depletion. When we say "yes" out of guilt, we are silently saying "no" to our physical health, sleep, and relationships.

Setting boundaries is not selfish—it is the prerequisite for being dependable in the long term.`,
      am: `የማያቋርጥ ከፍተኛ ውጥረት የአእምሮ ትኩረትን ይቀንሳል፣ ስሜታዊ ያደርጋል እንዲሁም የሰውነትን በሽታ የመከላከል አቅም ያዳክማል። በሰው ፊት በማፈር ወይም በመፍራት "እሺ" ስንል ለራሳችን ጤና እና ሰላም "አይሆንም" እያልን ነው።

ለራስ ጤናማ ድንበር መወሰን ራስ ወዳድነት ሳይሆን ለረጅም ጊዜ በጤና ለመኖር የግድ አስፈላጊ ነው።`,
    },
  },
  {
    id: 'art-somatic-body-scan',
    topic: 'mindfulness',
    title: {
      en: 'Somatic Body Scan: Releasing Trauma & Unconscious Muscular Armor',
      am: 'የሰውነት ውጥረት ማራገፊያ (Somatic Body Scan)፡ በአካል ውስጥ የተከማቸ ጫናን ማፍሰስ',
    },
    summary: {
      en: 'A guided mindfulness exercise to locate where stress is physically stored in your jaw, shoulders, and chest, and consciously release it.',
      am: 'ጭንቀት በመንጋጋ፣ በትከሻ እና በደረት ላይ የሚያስቀምጠውን ጥብቅ ውጥረት በመለየት ዘና የሚያደርግ ጥልቅ የማሰላሰል ልምምድ።',
    },
    readTime: '6 min read',
    evidenceBase: {
      en: 'Mindfulness-Based Stress Reduction (MBSR) & Somatic Experiencing',
      am: 'የአእምሮ ማረጋጋትና ውጥረት ማስታገሻ (MBSR) ዘዴ',
    },
    medicalReviewer: 'Dr. Rahel Gebre, MD (Perinatal & Women’s Psychiatrist)',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    keyTakeaway: {
      en: 'The body keeps the score of emotional distress. Muscular relaxation directly signals psychological safety to the brain.',
      am: 'ሰውነታችን ስሜታዊ ጫናዎችን በጡንቻዎች ውስጥ ይይዛል። ጡንቻዎችን ማላላት ለአእምሯችን የደህንነት እና የሰላም መልእክት በቀጥታ ያስተላልፋል።',
    },
    actionableSteps: {
      en: [
        'Find a comfortable posture, seated or lying down. Close your eyes or soften your gaze.',
        'Unclench the Jaw: Part your teeth slightly and allow your tongue to rest off the roof of your mouth.',
        'Drop the Shoulders: Inhale deeply, roll your shoulders up toward your ears, then exhale with a sigh and drop them 2 inches lower.',
        'Soften the Abdomen: Release the habit of pulling your stomach in; let your belly rise naturally with each breath.',
        'Scan Down to the Feet: Release tightness in your hips, calves, and toes.',
      ],
      am: [
        'ምቹ በሆነ አቀማመጥ ይቀመጡ ወይም ይተኛሉ። ዓይኖችዎን ቀስ አድርገው ይዝጉ።',
        'መንጋጋዎን ያላሉ፡ ጥርሶችዎን ፈታ ያድርጉ፣ ምላስዎ ከአፍዎ ጣሪያ ላይ እረፍት እንዲያደርግ ይፍቀዱ።',
        'ትከሻዎን ዘና ያድርጉ፡ በጥልቀት ይተንፍሱ፣ ትከሻዎን ወደ ጆሮዎ ከፍ ያድርጉ፣ ከዚያም በረጅሙ እየተነፈሱ ሙሉ በሙሉ ወደ ታች ዝቅ ያድርጉት።',
        'ሆድዎን ያላሉ፡ ሆድዎን ወደ ውስጥ የመሳብ ልምድን ይተው፤ በሚተነፍሱበት ጊዜ ሆድዎ በተፈጥሮው ወደ ውጭ እንዲወጣ ይፍቀዱ።',
        'ወደ እግሮችዎ ይውረዱ፡ በወገብዎ፣ በጭኖችዎና በእግር ጣቶችዎ ውስጥ ያለውን ውጥረት ሙሉ በሙሉ ይልቀቁ።',
      ],
    },
    fullContent: {
      en: `Most people carry chronic muscular bracing without realizing it—furrowed brows, locked jaws, shallow chest breathing. This physical tension continually sends feedback loops to the brain signaling: "Danger is present."

By methodically releasing each muscle group, you reverse the feedback loop, creating deep physiological calm.`,
      am: `አብዛኛው ሰው ሳያውቀው ቀኑን ሙሉ ፊቱን አኮሳትሮ፣ መንጋጋውን አግጥጦ፣ ትከሻውን አወጣጥሮ ይውላል። ይህ አካላዊ ጥንካሬ ለአእምሯችን ያለማቋረጥ "አደጋ አለ" የሚል የተሳሳተ መልዕክት ይልካል።

በእያንዳንዱ የሰውነት ክፍል ውስጥ ያለውን ጥብቅ ውጥረት አንድ በአንድ በማላላት አእምሮ ሙሉ በሙሉ እንዲረጋጋ ማድረግ ይቻላል።`,
    },
  },
  {
    id: 'art-healthy-relationships',
    topic: 'relationships',
    title: {
      en: 'Nonviolent Communication: De-escalating Conflict in Relationships',
      am: 'ገንቢ ተግባቦት (Nonviolent Communication)፡ በትዳርና በቤተሰብ ውስጥ አለመግባባትን ማርገብ',
    },
    summary: {
      en: 'Evidence-based communication blueprint using "Observation, Feeling, Need, Request" instead of blame and defensiveness.',
      am: 'በወቀሳ እና በክርክር ፈንታ "ምልከታ፣ ስሜት፣ ፍላጎት እና ጥያቄ" ላይ የተመሰረተ ሰላማዊ እና ፍቅር የተሞላበት ተግባቦት።',
    },
    readTime: '5 min read',
    evidenceBase: {
      en: 'Gottman Method Relationship Therapy & Emotionally Focused Therapy (EFT)',
      am: 'የጎትማን ጥንዶች ቴራፒ እና የስሜት-ተኮር ህክምና (EFT) ማዕቀፍ',
    },
    medicalReviewer: 'Dr. Bethlehem Tesfaye, MD',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    keyTakeaway: {
      en: 'Replace "You always..." with "When X happened, I felt Y, because I need Z. Would you be open to W?"',
      am: '"አንተ/አንቺ ሁልጊዜ..." የሚለውን የክስ ቃል በ "ይህ በሆነ ጊዜ እኔ እንዲህ ተሰማኝ ምክንያቱም ይህ ያስፈልገኛል" በሚል ገንቢ ቋንቋ መተካት።',
    },
    actionableSteps: {
      en: [
        'State the Observation without Judgment: Describe what happened like a camera recording it (not "You were rude", but "When you walked away during our discussion").',
        'Express Vulnerable Feeling: Name your core emotion (hurt, scared, overwhelmed—avoid pseudo-feelings like "attacked").',
        'Identify the Underlying Need: (e.g., "I need connection, emotional safety, or respect").',
        'Make an Actionable, Positive Request: Ask for what you want, not what you don\'t want (e.g., "Could we sit together for 10 minutes without screens tonight?").',
      ],
      am: [
        'ያለ ክስ ምልከታን መግለጽ፡ የሆነውን ነገር እንደ ካሜራ ምስል ያብራሩ ("ክብር አትሰጠኝም" ከማለት ይልቅ "እየተነጋገርን ሳለ ጥለኸኝ/ሽኝ ስትሄድ/ጂ")።',
        'እውነተኛ ስሜትዎን ይግለጹ፡ ("ተጎዳሁ፣ ብቸኝነት ተሰማኝ፣ ፈራሁ")።',
        'ውስጣዊ ፍላጎትዎን ያብራሩ፡ ("የአንተ/አንቺ ቅርርብና አብሮነት ያስፈልገኛል")።',
        'ግልጽና ተግባራዊ ጥያቄ ያቅርቡ፡ የማይፈልጉትን ሳይሆን የሚፈልጉትን ይጠይቁ ("ዛሬ ማታ ስልክ ሳናይ ለ10 ደቂቃ ብቻ ቁጭ ብለን ማውራት እንችላለን?")።',
      ],
    },
    fullContent: {
      en: `Dr. John Gottman's 40-year marital research found that criticism and contempt are the #1 predictors of relationship breakdown. When humans feel blamed, the brain activates defensive withdrawal (stonewalling) or counter-attack.

Transforming conversations by leading with vulnerable needs instead of accusations disarms defenses and opens the door to genuine emotional intimacy.`,
      am: `የዶ/ር ጆን ጎትማን የ40 ዓመታት ጥናት እንደሚያሳየው ወቀሳ እና ንቀት ግንኙነቶችን የሚያፈርሱ ዋነኛ ምክንያቶች ናቸው። ሰው ክስ ሲሰማው ወይ ራሱን ይከላከላል አልያም ዝምታን በመምረጥ ይሸሻል።

በወቀሳ ፋንታ ከልብ የመነጨ ፍላጎትንና ስሜትን በቅንነት ማካፈል የሌላውን ሰው ልብ ያረጋጋል፤ የፍቅርና የመተሳሰብ ድልድይ ይፈጥራል።`,
    },
  },
];
