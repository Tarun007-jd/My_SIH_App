import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a fallback storage since AsyncStorage module is missing
const MemoryStorage = {
  data: {},
  setItem: (key, value) => {
    console.log(`[MemoryStorage] Setting ${key} to ${value}`);
    MemoryStorage.data[key] = value;
    return Promise.resolve();
  },
  getItem: (key) => {
    console.log(`[MemoryStorage] Getting ${key}: ${MemoryStorage.data[key] || 'not found'}`);
    return Promise.resolve(MemoryStorage.data[key] || null);
  },
  removeItem: (key) => {
    delete MemoryStorage.data[key];
    return Promise.resolve();
  }
};

// Use MemoryStorage instead of AsyncStorage
const Storage = MemoryStorage;

// Create the language context
const LanguageContext = createContext();

// Define available languages with expanded Indian languages
const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'bn', name: 'বাংলা (Bengali)' },
  { code: 'te', name: 'తెలుగు (Telugu)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'mr', name: 'मराठी (Marathi)' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ml', name: 'മലയാളം (Malayalam)' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)' },
  { code: 'as', name: 'অসমীয়া (Assamese)' },
  { code: 'ur', name: 'اردو (Urdu)' },
  { code: 'sa', name: 'संस्कृतम् (Sanskrit)' },
];

// Define comprehensive translations for all languages
const translations = {
  // English translations
  en: {
    common: {
      welcome: 'Welcome',
      getStarted: 'Get Started',
      login: 'Login',
      logout: 'Logout',
      generateId: 'Generate ID',
      goToMap: 'Go to Map',
      goToHome: 'Go to Home',
      next: 'Next',
      back: 'Back',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      close: 'Close',
      open: 'Open',
      submit: 'Submit',
    },
    welcome: {
      subtitle: 'Your Safe Travel Companion',
      touristId: 'Tourist ID',
      touristIdDesc: 'Get a unique tourist ID for your safe travel',
      safeZones: 'Safe Zones',
      safeZonesDesc: 'Get alerts about safe and restricted areas',
      travelInfo: 'Travel Information',
      travelInfoDesc: 'Know about the best tourist places',
    },
    login: {
      title: 'Login',
      name: 'Name',
      namePlaceholder: 'Enter your full name',
      email: 'Email',
      emailPlaceholder: 'Enter your email address',
      phone: 'Phone Number',
      phonePlaceholder: 'Enter your phone number',
      age: 'Age',
      agePlaceholder: 'Enter your age',
      nationality: 'Nationality',
      indian: 'Indian',
      other: 'Other',
      proceed: 'Proceed',
    },
    verification: {
      title: 'Verification',
      nationality: 'Nationality',
      aadhaarId: 'Aadhaar ID',
      aadhaarPlaceholder: 'Enter your 12-digit Aadhaar number',
      address: 'Address',
      addressPlaceholder: 'Enter your current address',
      placesToVisit: 'Places to Visit',
      placesToVisitPlaceholder: 'List the places you plan to visit',
      numberOfDays: 'Number of Days',
      numberOfDaysPlaceholder: 'How many days will you stay?',
      visaId: 'Visa ID',
      visaIdPlaceholder: 'Enter your visa number',
      visaValidity: 'Visa Validity',
      visaValidityPlaceholder: 'Enter visa expiry date (YYYY-MM-DD)',
      travelPlan: 'Travel Plan',
      travelPlanPlaceholder: 'Describe your travel itinerary',
    },
    idGeneration: {
      title: 'Tourist ID',
      touristId: 'Your Tourist ID',
      validity: 'Validity',
    },
    map: {
      title: 'Map View',
      loading: 'Loading map...',
      legend: 'Zone Legend',
      safe: 'Safe',
      restricted: 'Restricted',
      currentZone: 'Current',
      currentLocation: 'You are here',
      center: 'Center',
    },
    profile: {
      title: 'Profile',
      personalInfo: 'Personal Information',
      verification: 'Verification Details',
      touristId: 'Tourist ID Details',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      age: 'Age',
      nationality: 'Nationality',
      aadhaar_id: 'Aadhaar ID',
      visa_id: 'Visa ID',
      address: 'Address',
      places_to_visit: 'Places to Visit',
      number_of_days: 'Number of Days',
      visa_validity: 'Visa Validity',
      travel_plan: 'Travel Plan',
      tourist_id: 'Tourist ID',
      validity: 'Validity',
    },
    settings: {
      title: 'Settings',
      language: 'Language',
      darkTheme: 'Dark Theme',
      majorLanguages: 'Major Languages',
      southIndian: 'South Indian Languages',
      northIndian: 'North Indian Languages',
      eastIndian: 'East Indian Languages',
      selectLanguage: 'Select Language',
      appInfo: 'App Information',
      version: 'Version',
    },
  },
  
  // Hindi translations
  hi: {
    common: {
      welcome: 'स्वागत है',
      getStarted: 'शुरू करें',
      login: 'लॉगिन',
      logout: 'लॉगआउट',
      generateId: 'आईडी जनरेट करें',
      goToMap: 'नक्शे पर जाएं',
      goToHome: 'होम पर जाएं',
      next: 'अगला',
      back: 'वापस',
      cancel: 'रद्द करें',
      confirm: 'पुष्टि करें',
      save: 'सहेजें',
      close: 'बंद करें',
      open: 'खोलें',
      submit: 'जमा करें',
    },
    welcome: {
      subtitle: 'आपका सुरक्षित यात्रा साथी',
      touristId: 'पर्यटक आईडी',
      touristIdDesc: 'अपनी सुरक्षित यात्रा के लिए एक अद्वितीय पर्यटक आईडी प्राप्त करें',
      safeZones: 'सुरक्षित क्षेत्र',
      safeZonesDesc: 'सुरक्षित और प्रतिबंधित क्षेत्रों के बारे में अलर्ट प्राप्त करें',
      travelInfo: 'यात्रा जानकारी',
      travelInfoDesc: 'सर्वोत्तम पर्यटक स्थलों के बारे में जानें',
    },
    login: {
      title: 'लॉगिन',
      name: 'नाम',
      namePlaceholder: 'अपना पूरा नाम दर्ज करें',
      email: 'ईमेल',
      emailPlaceholder: 'अपना ईमेल पता दर्ज करें',
      phone: 'फोन नंबर',
      phonePlaceholder: 'अपना फोन नंबर दर्ज करें',
      age: 'उम्र',
      agePlaceholder: 'अपनी उम्र दर्ज करें',
      nationality: 'राष्ट्रीयता',
      indian: 'भारतीय',
      other: 'अन्य',
      proceed: 'आगे बढ़ें',
    },
    verification: {
      title: 'सत्यापन',
      nationality: 'राष्ट्रीयता',
      aadhaarId: 'आधार आईडी',
      aadhaarPlaceholder: 'अपना 12 अंकों का आधार नंबर दर्ज करें',
      address: 'पता',
      addressPlaceholder: 'अपना वर्तमान पता दर्ज करें',
      placesToVisit: 'घूमने के स्थान',
      placesToVisitPlaceholder: 'आप जिन स्थानों पर जाना चाहते हैं उनकी सूची बनाएं',
      numberOfDays: 'दिनों की संख्या',
      numberOfDaysPlaceholder: 'आप कितने दिन रहेंगे?',
      visaId: 'वीज़ा आईडी',
      visaIdPlaceholder: 'अपना वीज़ा नंबर दर्ज करें',
      visaValidity: 'वीज़ा वैधता',
      visaValidityPlaceholder: 'वीज़ा समाप्ति तिथि दर्ज करें (YYYY-MM-DD)',
      travelPlan: 'यात्रा योजना',
      travelPlanPlaceholder: 'अपनी यात्रा कार्यक्रम का वर्णन करें',
    },
    idGeneration: {
      title: 'पर्यटक आईडी',
      touristId: 'आपकी पर्यटक आईडी',
      validity: 'वैधता',
    },
    map: {
      title: 'नक्शा देखें',
      loading: 'नक्शा लोड हो रहा है...',
      legend: 'क्षेत्र लेजेंड',
      safe: 'सुरक्षित',
      restricted: 'प्रतिबंधित',
      currentZone: 'वर्तमान',
      currentLocation: 'आप यहां हैं',
      center: 'केंद्र',
    },
    profile: {
      title: 'प्रोफ़ाइल',
      personalInfo: 'व्यक्तिगत जानकारी',
      verification: 'सत्यापन विवरण',
      touristId: 'पर्यटक आईडी विवरण',
      name: 'नाम',
      email: 'ईमेल',
      phone: 'फोन',
      age: 'उम्र',
      nationality: 'राष्ट्रीयता',
      aadhaar_id: 'आधार आईडी',
      visa_id: 'वीज़ा आईडी',
      address: 'पता',
      places_to_visit: 'घूमने के स्थान',
      number_of_days: 'दिनों की संख्या',
      visa_validity: 'वीज़ा वैधता',
      travel_plan: 'यात्रा योजना',
      tourist_id: 'पर्यटक आईडी',
      validity: 'वैधता',
    },
    settings: {
      title: 'सेटिंग्स',
      language: 'भाषा',
      darkTheme: 'डार्क थीम',
      majorLanguages: 'प्रमुख भाषाएँ',
      southIndian: 'दक्षिण भारतीय भाषाएँ',
      northIndian: 'उत्तर भारतीय भाषाएँ',
      eastIndian: 'पूर्वी भारतीय भाषाएँ',
      selectLanguage: 'भाषा चुनें',
      appInfo: 'ऐप जानकारी',
      version: 'संस्करण',
    },
  },
  
  // Bengali translations
  bn: {
    common: {
      welcome: 'স্বাগতম',
      getStarted: 'শুরু করুন',
      login: 'লগইন',
      logout: 'লগআউট',
      generateId: 'আইডি তৈরি করুন',
      goToMap: 'মানচিত্রে যান',
      goToHome: 'হোমে যান',
      next: 'পরবর্তী',
      back: 'পিছনে',
      cancel: 'বাতিল',
      confirm: 'নিশ্চিত করুন',
      save: 'সংরক্ষণ করুন',
      close: 'বন্ধ করুন',
      open: 'খুলুন',
      submit: 'জমা দিন',
    },
    welcome: {
      subtitle: 'আপনার নিরাপদ ভ্রমণ সঙ্গী',
      touristId: 'পর্যটক আইডি',
      touristIdDesc: 'আপনার নিরাপদ ভ্রমণের জন্য একটি অনন্য পর্যটক আইডি পান',
      safeZones: 'নিরাপদ অঞ্চল',
      safeZonesDesc: 'নিরাপদ এবং সীমিত অঞ্চল সম্পর্কে সতর্কতা পান',
      travelInfo: 'ভ্রমণ তথ্য',
      travelInfoDesc: 'সেরা পর্যটন স্থান সম্পর্কে জানুন',
    },
    login: {
      title: 'লগইন',
      name: 'নাম',
      namePlaceholder: 'আপনার পূর্ণ নাম লিখুন',
      email: 'ইমেল',
      emailPlaceholder: 'আপনার ইমেইল ঠিকানা লিখুন',
      phone: 'ফোন নম্বর',
      phonePlaceholder: 'আপনার ফোন নম্বর লিখুন',
      age: 'বয়স',
      agePlaceholder: 'আপনার বয়স লিখুন',
      nationality: 'জাতীয়তা',
      indian: 'ভারতীয়',
      other: 'অন্যান্য',
      proceed: 'এগিয়ে যান',
    },
    verification: {
      title: 'যাচাইকরণ',
      nationality: 'জাতীয়তা',
      aadhaarId: 'আধার আইডি',
      aadhaarPlaceholder: 'আপনার 12-অঙ্কের আধার নম্বর লিখুন',
      address: 'ঠিকানা',
      addressPlaceholder: 'আপনার বর্তমান ঠিকানা লিখুন',
      placesToVisit: 'ভ্রমণের স্থান',
      placesToVisitPlaceholder: 'আপনি যেসব স্থানে ভ্রমণ করতে চান সেগুলোর তালিকা করুন',
      numberOfDays: 'দিনের সংখ্যা',
      numberOfDaysPlaceholder: 'আপনি কত দিন থাকবেন?',
      visaId: 'ভিসা আইডি',
      visaIdPlaceholder: 'আপনার ভিসা নম্বর লিখুন',
      visaValidity: 'ভিসা বৈধতা',
      visaValidityPlaceholder: 'ভিসা শেষ হওয়ার তারিখ লিখুন (YYYY-MM-DD)',
      travelPlan: 'ভ্রমণ পরিকল্পনা',
      travelPlanPlaceholder: 'আপনার ভ্রমণের পরিকল্পনা বর্ণনা করুন',
    },
    idGeneration: {
      title: 'পর্যটক আইডি',
      touristId: 'আপনার পর্যটক আইডি',
      validity: 'বৈধতা',
    },
    map: {
      title: 'মানচিত্র দেখুন',
      loading: 'মানচিত্র লোড হচ্ছে...',
      legend: 'জোন সূচি',
      safe: 'নিরাপদ',
      restricted: 'নিষিদ্ধ',
      currentZone: 'বর্তমান',
      currentLocation: 'আপনি এখানে আছেন',
      center: 'কেন্দ্র',
    },
    profile: {
      title: 'প্রোফাইল',
      personalInfo: 'ব্যক্তিগত তথ্য',
      verification: 'যাচাইকরণ বিস্তারিত',
      touristId: 'পর্যটক আইডি বিস্তারিত',
      name: 'নাম',
      email: 'ইমেইল',
      phone: 'ফোন',
      age: 'বয়স',
      nationality: 'জাতীয়তা',
      aadhaar_id: 'আধার আইডি',
      visa_id: 'ভিসা আইডি',
      address: 'ঠিকানা',
      places_to_visit: 'ভ্রমণের স্থান',
      number_of_days: 'দিনের সংখ্যা',
      visa_validity: 'ভিসা বৈধতা',
      travel_plan: 'ভ্রমণ পরিকল্পনা',
      tourist_id: 'পর্যটক আইডি',
      validity: 'বৈধতা',
    },
    settings: {
      title: 'সেটিংস',
      language: 'ভাষা',
      darkTheme: 'ডার্ক থিম',
      majorLanguages: 'প্রধান ভাষাসমূহ',
      southIndian: 'দক্ষিণ ভারতীয় ভাষাসমূহ',
      northIndian: 'উত্তর ভারতীয় ভাষাসমূহ',
      eastIndian: 'পূর্ব ভারতীয় ভাষাসমূহ',
    },
  },
  
  // Telugu translations
  te: {
    common: {
      welcome: 'స్వాగతం',
      getStarted: 'ప్రారంభించండి',
      login: 'లాగిన్',
      logout: 'లాగౌట్',
      generateId: 'ఐడి సృష్టించండి',
      goToMap: 'మ్యాప్‌కు వెళ్లండి',
      goToHome: 'హోమ్‌కు వెళ్లండి',
      next: 'తదుపరి',
      back: 'వెనుకకు',
      cancel: 'రద్దు',
      confirm: 'నిర్ధారించండి',
      save: 'సేవ్ చేయండి',
      close: 'మూసివేయండి',
      open: 'తెరవండి',
      submit: 'సమర్పించండి',
    },
    map: {
      title: 'నకశా వీక్షణ',
      loading: 'నకశా లోడ్ అవుతోంది...',
      legend: 'జోన్ సూచిక',
      safe: 'సురక్షితం',
      restricted: 'నిషేధిత',
      currentLocation: 'మీరు ఇక్కడ ఉన్నారు',
      center: 'మధ్యలో',
    },
    settings: {
      title: 'సెట్టింగ్‌లు',
      language: 'భాష',
      darkTheme: 'డార్క్ థీమ్',
      majorLanguages: 'ప్రధాన భాషలు',
      southIndian: 'దక్షిణ భారతీయ భాషలు',
      northIndian: 'ఉత్తర భారతీయ భాషలు',
      eastIndian: 'తూర్పు భారతీయ భాషలు',
    },
  },
  
  // Tamil translations
  ta: {
    common: {
      welcome: 'வரவேற்கிறோம்',
      getStarted: 'தொடங்குங்கள்',
      login: 'உள்நுழையவும்',
      logout: 'வெளியேறு',
      generateId: 'ஐடி உருவாக்கவும்',
      goToMap: 'வரைபடத்திற்கு செல்லவும்',
      goToHome: 'முகப்புக்கு செல்லவும்',
      next: 'அடுத்தது',
      back: 'மீண்டும்',
      cancel: 'ரத்து செய்க',
      confirm: 'உறுதிப்படுத்தவும்',
      save: 'சேமிக்கவும்',
      close: 'மூடவும்',
      open: 'திறக்கவும்',
      submit: 'சமர்ப்பிக்கவும்',
    },
    map: {
      title: 'வரைபடம் காட்சி',
      loading: 'வரைபடம் ஏற்றப்படுகிறது...',
      legend: 'மண்டல விளக்கம்',
      safe: 'பாதுகாப்பானது',
      restricted: 'தடைசெய்யப்பட்ட',
      currentLocation: 'நீங்கள் இங்கே இருக்கிறீர்கள்',
      center: 'மையம்',
    },
    settings: {
      title: 'அமைப்புகள்',
      language: 'மொழி',
      darkTheme: 'இருண்ட நிறம்',
      majorLanguages: 'முக்கிய மொழிகள்',
      southIndian: 'தெற்கு இந்திய மொழிகள்',
      northIndian: 'வடக்கு இந்திய மொழிகள்',
      eastIndian: 'கிழக்கு இந்திய மொழிகள்',
    },
  },
  
  // Marathi translations
  mr: {
    common: {
      welcome: 'स्वागत आहे',
      getStarted: 'सुरू करा',
      login: 'लॉगिन',
      logout: 'लॉगआउट',
      generateId: 'आयडी तयार करा',
      goToMap: 'नकाशाकडे जा',
      goToHome: 'होमकडे जा',
      next: 'पुढील',
      back: 'मागे',
      cancel: 'रद्द करा',
      confirm: 'पुष्टी करा',
      save: 'जतन करा',
      close: 'बंद करा',
      open: 'उघडा',
      submit: 'सबमिट करा',
    },
    map: {
      title: 'नकाशा दृश्य',
      loading: 'नकाशा लोड करत आहे...',
      legend: 'झोन लिजेंड',
      safe: 'सुरक्षित',
      restricted: 'प्रतिबंधित',
      currentLocation: 'आपण येथे आहात',
      center: 'मध्य',
    },
    settings: {
      title: 'सेटिंग्ज',
      language: 'भाषा',
      darkTheme: 'डार्क थीम',
      majorLanguages: 'प्रमुख भाषा',
      southIndian: 'दक्षिण भारतीय भाषा',
      northIndian: 'उत्तर भारतीय भाषा',
      eastIndian: 'पूर्व भारतीय भाषा',
    },
  },
  
  // Gujarati translations
  gu: {
    common: {
      welcome: 'સ્વાગત છે',
      getStarted: 'શરૂ કરો',
      login: 'લોગિન',
      logout: 'લોગઆઉટ',
      generateId: 'આઈડી બનાવો',
      goToMap: 'નકશા પર જાઓ',
      goToHome: 'હોમ પર જાઓ',
      next: 'આગળ',
      back: 'પાછળ',
      cancel: 'રદ કરો',
      confirm: 'પુષ્ટિ કરો',
      save: 'સાચવો',
      close: 'બંધ કરો',
      open: 'ખોલો',
      submit: 'સબમિટ કરો',
    },
    map: {
      title: 'નકશો દૃશ્ય',
      loading: 'નકશો લોડ થઈ રહ્યું છે...',
      legend: 'વિસ્તાર કથા',
      safe: 'સુરક્ષિત',
      restricted: 'પ્રતિબંધિત',
      currentLocation: 'તમે અહીં છો',
      center: 'મધ્ય',
    },
    settings: {
      title: 'સેટિંગ્સ',
      language: 'ભાષા',
      darkTheme: 'ડાર્ક થીમ',
      majorLanguages: 'મુખ્ય ભાષાઓ',
      southIndian: 'દક્ષિણ ભારતીય ભાષાઓ',
      northIndian: 'ઉત્તર ભારતીય ભાષાઓ',
      eastIndian: 'પૂર્વ ભારતીય ભાષાઓ',
    },
  },
  
  // Kannada translations
  kn: {
    common: {
      welcome: 'ಸ್ವಾಗತ',
      getStarted: 'ಪ್ರಾರಂಭಿಸಿ',
      login: 'ಲಾಗಿನ್',
      logout: 'ಲಾಗೌಟ್',
      generateId: 'ಐಡಿ ರಚಿಸಿ',
      goToMap: 'ನಕ್ಷೆ ಗೆ ಹೋಗಿ',
      goToHome: 'ಮನೆ ಗೆ ಹೋಗಿ',
      next: 'ಮುಂದೆ',
      back: 'ಹಿಂದೆ',
      cancel: 'ರದ್ದು ಮಾಡಿ',
      confirm: 'ದೃಢೀಕರಿಸಿ',
      save: 'ಉಳಿಸಿ',
      close: 'ಮುಚ್ಚಿ',
      open: 'ತೆರೆಯಿರಿ',
      submit: 'ಸಮರ್ಪಿಸಿ',
    },
    map: {
      title: 'ನಕ್ಷೆ ನೋಟ',
      loading: 'ನಕ್ಷೆ ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      legend: 'ವಲಯ ಪಾಠ್ಯಕ್ರಮ',
      safe: 'ಸುರಕ್ಷಿತ',
      restricted: 'ನಿರ್ಬಂಧಿತ',
      currentLocation: 'ನೀವು ಇಲ್ಲಿದ್ದೀರಿ',
      center: 'ಕೇಂದ್ರ',
    },
    settings: {
      title: 'ಸೆಟಿಂಗ್‌ಗಳು',
      language: 'ಭಾಷೆ',
      darkTheme: 'ಕಪ್ಪು ಥೀಮ್',
      majorLanguages: 'ಮುಖ್ಯ ಭಾಷೆಗಳು',
      southIndian: 'ದಕ್ಷಿಣ ಭಾರತೀಯ ಭಾಷೆಗಳು',
      northIndian: 'ಉತ್ತರ ಭಾರತೀಯ ಭಾಷೆಗಳು',
      eastIndian: 'ಕೂರ್ಚು ಭಾರತೀಯ ಭಾಷೆಗಳು',
    },
  },
  
  // Malayalam translations
  ml: {
    common: {
      welcome: 'സ്വാഗതം',
      getStarted: 'ആരംഭിക്കുക',
      login: 'ലോഗിൻ',
      logout: 'ലോഗ് ഔട്ട്',
      generateId: 'ഐഡി സൃഷ്ടിക്കുക',
      goToMap: 'മാപ്പിലേക്ക് പോകുക',
      goToHome: 'മുകപ്പിലേക്ക് പോകുക',
      next: 'അടുത്തത്',
      back: 'മുമ്പത്തെത്',
      cancel: 'റദ്ദാക്കുക',
      confirm: 'സ്ഥിരീകരിക്കുക',
      save: 'സംരക്ഷിക്കുക',
      close: 'അടയ്ക്കുക',
      open: 'തുറക്കുക',
      submit: 'സമർപ്പിക്കുക',
    },
    map: {
      title: 'മാപ്പ് കാഴ്ച',
      loading: 'മാപ്പ് ലോഡ് ചെയ്യുന്നു...',
      legend: 'പ്രദേശത്തിന്റെ വിവരണം',
      safe: 'സുരക്ഷിതം',
      restricted: 'നിയന്ത്രിതം',
      currentLocation: 'നിങ്ങൾ ഇവിടെയുണ്ട്',
      center: 'കേന്ദ്രം',
    },
    settings: {
      title: 'സെറ്റിംഗുകൾ',
      language: 'ഭാഷ',
      darkTheme: 'ഡാർക്ക് തീം',
      majorLanguages: 'പ്രധാന ഭാഷകൾ',
      southIndian: 'ദക്ഷിണ ഇന്ത്യൻ ഭാഷകൾ',
      northIndian: 'ഉത്തര ഇന്ത്യൻ ഭാഷകൾ',
      eastIndian: 'കിഴക്ക് ഇന്ത്യൻ ഭാഷകൾ',
    },
  },
  
  // Punjabi translations - fixed apostrophe issues
  pa: {
    common: {
      welcome: "ਜੀ ਆਇਆਂ ਨੂੰ",
      getStarted: "ਸ਼ੁਰੂ ਕਰੋ",
      login: "ਲੌਗਇਨ",
      logout: "ਲੌਗਆਉਟ",
      generateId: "ਆਈਡੀ ਬਣਾਓ",
      goToMap: "ਨਕਸ਼ੇ ਤੇ ਜਾਓ",
      goToHome: "ਹੋਮ ਤੇ ਜਾਓ",
      next: "ਅੱਗੇ",
      back: "ਪਿੱਛੇ",
      cancel: "ਰੱਦ ਕਰੋ",
      confirm: "ਪੁਸ਼ਟੀ ਕਰੋ",
      save: "ਸੇਵ ਕਰੋ",
      close: "ਬੰਦ ਕਰੋ",
      open: "ਖੋਲ੍ਹੋ",
      submit: "ਜਮ੍ਹਾਂ ਕਰੋ"
    },
    map: {
      title: "ਨਕਸ਼ਾ ਦ੍ਰਿਸ਼",
      loading: "ਨਕਸ਼ਾ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
      legend: "ਜ਼ੋਨ ਲੀਜੈਂਡ",
      safe: "ਸੁਰੱਖਿਅਤ",
      restricted: "ਪ੍ਰਤਿਬੰਧਿਤ",
      currentLocation: "ਤੁਸੀਂ ਇੱਥੇ ਹੋ",
      center: "ਕੇਂਦਰ"
    },
    settings: {
      title: "ਸੈਟਿੰਗਾਂ",
      language: "ਭਾਸ਼ਾ",
      darkTheme: "ਡਾਰਕ ਥੀਮ",
      majorLanguages: "ਮੁੱਖ ਭਾਸ਼ਾਵਾਂ",
      southIndian: "ਦੱਖਣੀ ਭਾਰਤੀ ਭਾਸ਼ਾਵਾਂ",
      northIndian: "ਉੱਤਰੀ ਭਾਰਤੀ ਭਾਸ਼ਾਵਾਂ",
      eastIndian: "ਪੂਰਬੀ ਭਾਰਤੀ ਭਾਸ਼ਾਵਾਂ"
    }
  },
  
  // Odia translations
  or: {
    common: {
      welcome: 'ସ୍ୱାଗତମ',
      getStarted: 'ଆରମ୍ଭ କରନ୍ତୁ',
      login: 'ଲଗଇନ',
      logout: 'ଲଗଆଉଟ',
      generateId: 'ଆଇଡି ସୃଷ୍ଟି କରନ୍ତୁ',
      goToMap: 'ମାନଚିତ୍ରକୁ ଯାଆନ୍ତୁ',
      goToHome: 'ହୋମକୁ ଯାଆନ୍ତୁ',
      next: 'ପରବର୍ତ୍ତୀ',
      back: 'ପଛକୁ',
      cancel: 'ବାତିଲ୍',
      confirm: 'ନିଶ୍ଚିତ କରନ୍ତୁ',
      save: 'ସଞ୍ଚୟ କରନ୍ତୁ',
      close: 'ବନ୍ଦ କରନ୍ତୁ',
      open: 'ଖୋଲନ୍ତୁ',
      submit: 'ଦାଖଲ କରନ୍ତୁ',
    },
    map: {
      title: 'ମାନଚିତ୍ର ଭ୍ୟୁ',
      loading: 'ମାନଚିତ୍ର ଲୋଡ୍ ହେଉଛି...',
      legend: 'ଜୋନ୍ ଲେଜେଣ୍ଡ',
      safe: 'ସୁରକ୍ଷିତ',
      restricted: 'ପ୍ରତିବନ୍ଧିତ',
      currentLocation: 'ଆପଣ ଏଠାରେ ଅଛନ୍ତି',
      center: 'କେନ୍ଦ୍ର',
    },
    settings: {
      title: 'ସେଟିଂ',
      language: 'ଭାଷା',
      darkTheme: 'ଡାର୍କ ଥିମ',
      majorLanguages: 'ପ୍ରମୁଖ ଭାଷାଗୁଡିକ',
      southIndian: 'ଦକ୍ଷିଣ ଭାରତୀୟ ଭାଷାଗୁଡିକ',
      northIndian: 'ଉତ୍ତର ଭାରତୀୟ ଭାଷାଗୁଡିକ',
      eastIndian: 'ପୂର୍ବ ଭାରତୀୟ ଭାଷାଗୁଡିକ',
    },
  },
  
  // Assamese translations
  as: {
    common: {
      welcome: 'স্বাগতম',
      getStarted: 'আৰম্ভ কৰক',
      login: 'লগইন',
      logout: 'লগআউট',
      generateId: 'আইডি সৃষ্টি কৰক',
      goToMap: 'মানচিত্ৰলৈ যাওক',
      goToHome: 'হোমলৈ যাওক',
      next: 'পৰবৰ্তী',
      back: 'পিছলৈ',
      cancel: 'বাতিল কৰক',
      confirm: 'নিশ্চিত কৰক',
      save: 'সংৰক্ষণ কৰক',
      close: 'বন্ধ কৰক',
      open: 'খোলক',
      submit: 'দাখিল কৰক',
    },
    map: {
      title: 'মানচিত্ৰ ভিউ',
      loading: 'মানচিত্ৰ লোড হৈ আছে...',
      legend: 'জোন লিজেণ্ড',
      safe: 'সুৰক্ষিত',
      restricted: 'সীমিত',
      currentLocation: 'আপুনি ইয়াত আছে',
      center: 'কেন্দ্ৰ',
    },
    settings: {
      title: 'ছেটিংছ',
      language: 'ভাষা',
      darkTheme: 'ডাৰ্ক থিম',
      majorLanguages: 'প্ৰধান ভাষাসমূহ',
      southIndian: 'দক্ষিণ ভাৰতীয় ভাষাসমূহ',
      northIndian: 'উত্তৰ ভাৰতীয় ভাষাসমূহ',
      eastIndian: 'পূৰ্ব ভারতীয় ভাষাসমূহ',
    },
  },
  
  // Urdu translations
  ur: {
    common: {
      welcome: 'خوش آمدید',
      getStarted: 'شروع کریں',
      login: 'لاگ ان',
      logout: 'لاگ آؤٹ',
      generateId: 'آئی ڈی بنائیں',
      goToMap: 'نقشے پر جائیں',
      goToHome: 'ہوم پر جائیں',
      next: 'اگلا',
      back: 'پیچھے',
      cancel: 'منسوخ کریں',
      confirm: 'تصدیق کریں',
      save: 'محفوظ کریں',
      close: 'بند کریں',
      open: 'کھولیں',
      submit: 'جمع کرائیں',
    },
    map: {
      title: 'نقشہ',
      loading: 'نقشہ لوڈ ہو رہا ہے...',
      legend: 'زون لیجنڈ',
      safe: 'محفوظ',
      restricted: 'ممنوعہ',
      currentLocation: 'آپ یہاں ہیں',
      center: 'مرکز',
    },
    settings: {
      title: 'ترتیبات',
      language: 'زبان',
      darkTheme: 'ڈارک تھیم',
      majorLanguages: 'اہم زبانیں',
      southIndian: 'جنوبی ہندوستانی زبانیں',
      northIndian: 'شمالی ہندوستانی زبانیں',
      eastIndian: 'مشرقی ہندوستانی زبانیں',
    },
  },
  
  // Sanskrit translations
  sa: {
    common: {
      welcome: 'स्वागतम्',
      getStarted: 'प्रारभ्यताम्',
      login: 'प्रवेशः',
      logout: 'निर्गमः',
      generateId: 'परिचयपत्रं सृज्यताम्',
      goToMap: 'मानचित्रं गम्यताम्',
      goToHome: 'गृहपृष्ठं गम्यताम्',
      next: 'अग्रिमम्',
      back: 'पूर्वम्',
      cancel: 'रद्द्यताम्',
      confirm: 'पुष्टिकरोतु',
      save: 'रक्ष्यताम्',
      close: 'पिधीयताम्',
      open: 'उद्घाट्यताम्',
      submit: 'प्रस्तुयताम्',
    },
    map: {
      title: 'मानचित्रम्',
      loading: 'मानचित्रं प्रतीक्षताम्...',
      legend: 'क्षेत्रसूची',
      safe: 'सुरक्षितम्',
      restricted: 'निषिद्धम्',
      currentLocation: 'भवान् अत्र अस्ति',
      center: 'मध्यम्',
    },
    settings: {
      title: 'व्यवस्थाः',
      language: 'भाषा',
      darkTheme: 'कृष्णवर्णस्य विषयः',
      majorLanguages: 'प्रमुखभाषाः',
      southIndian: 'दक्षिणभारतस्य भाषाः',
      northIndian: 'उत्तरभारतस्य भाषाः',
      eastIndian: 'पूर्वभारतस्य भाषाः',
    },
  },
};

// Save language preference to storage
const saveLanguagePreference = async (lang) => {
  try {
    await Storage.setItem('@language_preference', lang);
    console.log(`Language preference saved: ${lang}`);
  } catch (error) {
    console.error('Error saving language preference:', error);
  }
};

// Load language preference from storage
const loadLanguagePreference = async () => {
  try {
    const lang = await Storage.getItem('@language_preference');
    console.log(`Language preference loaded: ${lang || 'none (defaulting to en)'}`);
    return lang !== null ? lang : 'en';
  } catch (error) {
    console.error('Error loading language preference:', error);
    return 'en';
  }
};

// Language provider component
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  // Load saved language preference on mount
  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await loadLanguagePreference();
      setCurrentLanguage(savedLanguage);
      setIsLoading(false);
    };
    
    loadLanguage();
  }, []);

  // Update language and save preference
  const setLanguage = (languageCode) => {
    if (languageCode !== currentLanguage) {
      setCurrentLanguage(languageCode);
      saveLanguagePreference(languageCode);
      console.log(`Language changed to: ${languageCode}`);
    }
  };

  // Function to get translated text with fallback to English
  const getText = (section, key) => {
    try {
      // Check if translation exists in current language
      if (
        translations[currentLanguage] &&
        translations[currentLanguage][section] &&
        translations[currentLanguage][section][key]
      ) {
        return translations[currentLanguage][section][key];
      }
      
      // Fallback to English if translation not found
      if (translations.en && translations.en[section] && translations.en[section][key]) {
        return translations.en[section][key];
      }
      
      // Return key as last resort
      return key;
    } catch (error) {
      console.warn(`Translation error for ${section}.${key}:`, error);
      return key;
    }
  };

  // If still loading, return nothing (or a loading indicator)
  if (isLoading) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      setLanguage,
      getText,
      languages,
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
