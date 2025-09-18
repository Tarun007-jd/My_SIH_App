import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  StatusBar, 
  Platform, 
  Image, 
  Animated 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

// Utility function to mask sensitive data
const maskValue = (value) => {
  if (!value) return '—';
  if (typeof value !== 'string') value = String(value);
  
  // Keep first and last characters visible, replace middle with stars
  if (value.length <= 2) return value;
  
  const firstChar = value.charAt(0);
  const lastChar = value.charAt(value.length - 1);
  const maskedPart = '*'.repeat(value.length - 2);
  
  return `${firstChar}${maskedPart}${lastChar}`;
};

// AnimatedCard component with spring animation
const AnimatedCard = ({ children, style, index = 0 }) => {
  const scaleAnim = React.useRef(new Animated.Value(0.95)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    const delay = index * 100; // Stagger animation
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        delay,
        useNativeDriver: true,
      })
    ]).start();
  }, []);
  
  return (
    <Animated.View 
      style={[
        styles.card, 
        style, 
        { 
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default function ProfileScreen() {
  const { basic, verification, touristId, validity } = useUser();
  const { theme } = useTheme();
  const { getText } = useLanguage();
  
  // Configure status bar with theme colors
  useEffect(() => {
    StatusBar.setBarStyle(theme.statusBar.barStyle, true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }
  }, [theme]);

  return (
    <LinearGradient
      colors={theme.mode === 'dark' 
        ? ['#1A202C', '#2D3748']
        : ['#E0EAFC', '#CFDEF3']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safe}>
        <StatusBar 
          barStyle={theme.statusBar.barStyle}
          backgroundColor="transparent"
          translucent={true}
        />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={[
            styles.headerContainer, 
            { borderBottomColor: theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 85, 164, 0.1)' }
          ]}>
            <Image 
              source={require('../../images/Newlogo.png')} 
              style={styles.logo}
              resizeMode="cover"
            />
            <Text style={[styles.title, { color: theme.primary }]}>{getText('profile', 'title')}</Text>
          </View>
          
          <Text style={[styles.subtitle, { color: theme.primary }]}>{getText('profile', 'personalInfo')}</Text>
          <AnimatedCard 
            style={{ 
              backgroundColor: theme.mode === 'dark' 
                ? 'rgba(45, 55, 72, 0.8)' 
                : 'rgba(255, 255, 255, 0.85)',
              borderColor: theme.border,
            }}
            index={0}
          >
            <Row label="name" value={basic.name} />
            <Row label="email" value={basic.email} />
            <Row label="phone" value={basic.phone} />
            <Row label="age" value={basic.age} />
            <Row label="nationality" value={basic.nationality} />
          </AnimatedCard>

          <Text style={[styles.subtitle, { color: theme.primary }]}>{getText('profile', 'verification')}</Text>
          <AnimatedCard 
            style={{ 
              backgroundColor: theme.mode === 'dark' 
                ? 'rgba(45, 55, 72, 0.8)' 
                : 'rgba(255, 255, 255, 0.85)',
              borderColor: theme.border,
            }}
            index={1}
          >
            {basic.nationality === 'Indian' ? (
              <>
                <Row label="aadhaar_id" value={verification.aadhaarId} isSensitive={true} />
                <Row label="address" value={verification.address} />
                <Row label="places_to_visit" value={verification.placesToVisit} />
                <Row label="number_of_days" value={verification.numberOfDays} />
              </>
            ) : (
              <>
                <Row label="visa_id" value={verification.visaId} isSensitive={true} />
                <Row label="visa_validity" value={verification.visaValidity} />
                <Row label="travel_plan" value={verification.travelPlan} />
                <Row label="number_of_days" value={verification.foreignerDays} />
              </>
            )}
          </AnimatedCard>

          <Text style={[styles.subtitle, { color: theme.primary }]}>{getText('profile', 'touristId')}</Text>
          <AnimatedCard 
            style={{ 
              backgroundColor: theme.mode === 'dark' 
                ? 'rgba(45, 55, 72, 0.8)' 
                : 'rgba(255, 255, 255, 0.85)',
              borderColor: theme.border,
            }}
            index={2}
          >
            <Row label="tourist_id" value={touristId} />
            <Row label="validity" value={validity} />
          </AnimatedCard>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

// Update Row component to use translated labels
function Row({ label, value, isSensitive = false }) {
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const displayValue = isSensitive ? maskValue(value) : value;
  
  // Get translation for the label or use the original label if no translation
  const translatedLabel = getText('profile', label.toLowerCase().replace(/\s+/g, '_')) || label;
  
  return (
    <View style={[styles.row, { borderBottomColor: theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 85, 164, 0.1)' }]}>
      <Text style={[styles.label, { color: theme.primary }]}>{translatedLabel}</Text>
      <Text style={[styles.value, { color: theme.text }]}>{displayValue || '—'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safe: { 
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: { 
    padding: 20,
    paddingBottom: 80,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    marginTop: 10,
    // Remove paddingTop as it's handled by safe area padding
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 85, 164, 0.1)',
  },
  title: { 
    fontSize: 26,
    fontWeight: '700',
    color: '#0055A4',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 0,
  },
  subtitle: { 
    fontSize: 24, 
    fontWeight: '700', 
    marginTop: 24, // Standardized margin
    marginBottom: 16, // Standardized margin
    color: '#0055A4',
    paddingHorizontal: 8,
    letterSpacing: 1.5,
  },
  card: {
    borderWidth: 1.5,
    borderColor: '#0055A4',
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginVertical: 12,
    // Standardized shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 6,
    borderBottomWidth: 2, // Reduced to be consistent
    borderRightWidth: 2, // Reduced to be consistent
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 85, 164, 0.1)',
    paddingVertical: 14,
    alignItems: 'center',
  },
  label: { 
    fontWeight: '700', 
    color: '#0055A4', // Navy blue
    fontSize: 16,
    letterSpacing: 0.5,
  },
  value: { 
    maxWidth: '60%',
    color: '#333333', // Dark gray
    textAlign: 'right',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#0055A4',
    shadowColor: '#0055A4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
});