import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useUser } from '../context/UserContext';

function sanitizeDigits(v) {
  return (v || '').replace(/[^0-9]/g, '');
}

function isIsoDateLike(v) {
  // Basic check for YYYY-MM-DD or parseable date string
  if (!v) return false;
  const iso = /^\d{4}-\d{2}-\d{2}$/;
  if (iso.test(v)) return true;
  const d = new Date(v);
  return !isNaN(d.getTime());
}

function generateTouristId() {
  // Simple, readable ID: TST-<timestamp>-<base36>
  const stamp = Date.now().toString(36).slice(-5);
  const rnd = Math.random().toString(36).substring(2, 7);
  return `TST-${stamp}-${rnd}`.toUpperCase();
}

export default function VerificationScreen({ navigation }) {
  const { basic, verification, setVerification, setTouristId, setValidity } = useUser();
  const isIndian = basic?.nationality === 'Indian';

  // Local form state (mirroring context for controlled inputs)
  const [aadhaarId, setAadhaarId] = useState(verification.aadhaarId || '');
  const [address, setAddress] = useState(verification.address || '');
  const [placesToVisit, setPlacesToVisit] = useState(verification.placesToVisit || '');
  const [numberOfDays, setNumberOfDays] = useState(verification.numberOfDays || '');

  const [visaId, setVisaId] = useState(verification.visaId || '');
  const [visaValidity, setVisaValidity] = useState(verification.visaValidity || '');
  const [travelPlan, setTravelPlan] = useState(verification.travelPlan || '');
  const [foreignerDays, setForeignerDays] = useState(verification.foreignerDays || '');

  // Push local state to global verification object
  useEffect(() => {
    setVerification({
      aadhaarId,
      address,
      placesToVisit,
      numberOfDays,
      visaId,
      visaValidity,
      travelPlan,
      foreignerDays,
    });
  }, [
    aadhaarId,
    address,
    placesToVisit,
    numberOfDays,
    visaId,
    visaValidity,
    travelPlan,
    foreignerDays,
    setVerification,
  ]);

  const computeValidity = () => {
    if (isIndian) {
      const days = parseInt(numberOfDays || '0', 10);
      if (!days || days <= 0) return null;
      const start = new Date();
      const end = new Date(start);
      end.setDate(end.getDate() + days);
      return `Valid for ${days} day(s) until ${end.toDateString()}`;
    }
    if (!visaValidity || !isIsoDateLike(visaValidity)) return null;
    const end = new Date(visaValidity);
    if (isNaN(end.getTime())) return `Visa valid until: ${visaValidity}`;
    return `Visa valid until ${end.toDateString()}`;
  };

  const validateIndian = () => {
    const a = sanitizeDigits(aadhaarId);
    if (!a || a.length < 12) {
      Alert.alert('Invalid Aadhaar', 'Aadhaar should be 12 digits.');
      return false;
    }
    if (!address?.trim()) {
      Alert.alert('Missing Address', 'Please enter your address.');
      return false;
    }
    const days = parseInt(numberOfDays || '0', 10);
    if (!days || days <= 0) {
      Alert.alert('Invalid Duration', 'Number of days must be greater than 0.');
      return false;
    }
    return true;
  };

  const validateForeigner = () => {
    if (!visaId?.trim()) {
      Alert.alert('Missing Visa ID', 'Please enter your Visa ID.');
      return false;
    }
    if (!visaValidity?.trim() || !isIsoDateLike(visaValidity)) {
      Alert.alert('Invalid Visa Validity', 'Enter a valid date (e.g., YYYY-MM-DD).');
      return false;
    }
    const days = parseInt(foreignerDays || '0', 10);
    if (!days || days <= 0) {
      Alert.alert('Invalid Duration', 'Number of days must be greater than 0.');
      return false;
    }
    return true;
  };

  const onGenerate = () => {
    if (isIndian ? !validateIndian() : !validateForeigner()) return;

    const id = generateTouristId();
    const validity = computeValidity();

    if (!validity) {
      Alert.alert('Cannot Compute Validity', 'Please check your duration/visa validity details.');
      return;
    }

    setTouristId(id);
    setValidity(validity);
    navigation.navigate('IdGeneration');
  };

  // Configure status bar with black background and dark text
  useEffect(() => {
    StatusBar.setBarStyle('dark-content', true); // Change to dark text
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#000000');
      StatusBar.setTranslucent(false);
    }
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar 
        barStyle="dark-content" // Change to dark text
        backgroundColor="#000000"
        translucent={false}
      />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerContainer}>
            <Image 
              source={require('../../images/Newlogo.png')} 
              style={styles.logo}
              resizeMode="cover"
            />
            <Text style={styles.title}>Verification</Text>
          </View>
          <Text style={styles.caption}>
            Nationality: <Text style={styles.bold}>{isIndian ? 'Indian' : 'Other'}</Text>
          </Text>

          {isIndian ? (
            <View style={styles.section}>
              <Text style={styles.label}>Aadhaar ID</Text>
              <TextInput
                style={styles.input}
                placeholder="12-digit Aadhaar"
                placeholderTextColor="#7e7e7e"
                value={aadhaarId}
                onChangeText={(t) => setAadhaarId(sanitizeDigits(t))}
                keyboardType="number-pad"
                maxLength={12}
              />

              <Text style={styles.label}>Address</Text>
              <TextInput
                style={[styles.input, styles.multiline]}
                placeholder="Enter your address"
                placeholderTextColor="#7e7e7e"
                value={address}
                onChangeText={setAddress}
                multiline
              />

              <Text style={styles.label}>Places to Visit (comma separated)</Text>
              <TextInput
                style={[styles.input, styles.multiline]}
                placeholder="e.g., Agra, Jaipur, Delhi"
                placeholderTextColor="#7e7e7e"
                value={placesToVisit}
                onChangeText={setPlacesToVisit}
                multiline
              />

              <Text style={styles.label}>Number of Days</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 5"
                placeholderTextColor="#7e7e7e"
                value={numberOfDays}
                onChangeText={(t) => setNumberOfDays(sanitizeDigits(t))}
                keyboardType="number-pad"
              />
            </View>
          ) : (
            <View style={styles.section}>
              <Text style={styles.label}>Visa ID</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Visa ID"
                placeholderTextColor="#7e7e7e"
                value={visaId}
                onChangeText={setVisaId}
                autoCapitalize="characters"
              />

              <Text style={styles.label}>Visa Validity (YYYY-MM-DD)</Text>
              <TextInput
                style={styles.input}
                placeholder="2025-12-31"
                placeholderTextColor="#7e7e7e"
                value={visaValidity}
                onChangeText={setVisaValidity}
                autoCapitalize="none"
                keyboardType="numbers-and-punctuation"
              />

              <Text style={styles.label}>Day-wise Travel Plan</Text>
              <TextInput
                style={[styles.input, styles.multiline]}
                placeholder="Day 1: Delhi; Day 2: Jaipur; ..."
                placeholderTextColor="#7e7e7e"
                value={travelPlan}
                onChangeText={setTravelPlan}
                multiline
              />

              <Text style={styles.label}>Number of Days</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 7"
                placeholderTextColor="#7e7e7e"
                value={foreignerDays}
                onChangeText={(t) => setForeignerDays(sanitizeDigits(t))}
                keyboardType="number-pad"
              />
            </View>
          )}

          <TouchableOpacity style={styles.button} onPress={onGenerate}>
            <Text style={styles.buttonText}>Generate Tourist ID</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: '#FFFFFF',
    // Adjust for the status bar height specifically
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
  },
  flex: { 
    flex: 1, 
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 20, // Standardized padding
    paddingBottom: 80, // Consistent bottom padding for all screens
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24, // Standardized margin
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 0, // Remove bottom margin
    color: '#0055A4',
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  caption: {
    color: '#0055A4', // Navy blue
    textAlign: 'center',
    marginBottom: 18,
    fontSize: 18,
    letterSpacing: 0.8,
  },
  bold: {
    fontWeight: '800',
    color: '#0055A4', // Navy blue
    textDecorationLine: 'underline',
  },
  section: {
    gap: 16,
    borderWidth: 1.5, // Standardized border width
    borderColor: '#0055A4',
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#F8F9FA',
    marginTop: 16,
    // Standardized shadow
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  label: {
    fontWeight: '700',
    marginBottom: 8,
    color: '#0055A4', // Navy blue
    fontSize: 16,
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#0055A4', // Navy blue
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    color: '#333333', // Dark gray
    backgroundColor: '#FFFFFF', // White
    marginBottom: 6,
    fontSize: 16,
  },
  multiline: { 
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  button: {
    backgroundColor: '#0055A4',
    borderRadius: 14,
    marginTop: 24,
    // Standardized shadow
    elevation: 6,
    shadowColor: '#0055A4',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  buttonText: {
    color: '#FFFFFF', // White text
    fontWeight: '800',
    fontSize: 20,
    textAlign: 'center',
    padding: 16,
    letterSpacing: 1,
  },
  logo: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 14,
    borderWidth: 2,
    borderColor: '#0055A4',
    // Standardized shadow
    shadowColor: '#0055A4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
});