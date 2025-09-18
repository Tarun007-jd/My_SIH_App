import React, { createContext, useContext, useState, useMemo } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [basic, setBasic] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    nationality: 'Indian',
  });

  const [verification, setVerification] = useState({
    // Indian fields
    aadhaarId: '',
    address: '',
    placesToVisit: '',
    numberOfDays: '',
    // Foreigner fields
    visaId: '',
    visaValidity: '', // e.g., YYYY-MM-DD
    travelPlan: '',
    foreignerDays: '',
  });

  const [touristId, setTouristId] = useState('');
  const [validity, setValidity] = useState(''); // human-readable validity string

  const resetAll = () => {
    setBasic({
      name: '',
      email: '',
      phone: '',
      age: '',
      nationality: 'Indian',
    });
    setVerification({
      aadhaarId: '',
      address: '',
      placesToVisit: '',
      numberOfDays: '',
      visaId: '',
      visaValidity: '',
      travelPlan: '',
      foreignerDays: '',
    });
    setTouristId('');
    setValidity('');
  };

  const value = useMemo(
    () => ({
      basic,
      setBasic,
      verification,
      setVerification,
      touristId,
      setTouristId,
      validity,
      setValidity,
      resetAll,
    }),
    [basic, verification, touristId, validity]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}