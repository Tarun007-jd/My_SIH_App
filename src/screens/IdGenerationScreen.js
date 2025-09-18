import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  StatusBar, 
  Platform, 
  Image, 
  Animated 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function IdGenerationScreen({ navigation }) {
  const { touristId, validity } = useUser();
  const { theme } = useTheme();
  const { getText } = useLanguage();

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;
  const buttonFadeAnim = React.useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    StatusBar.setBarStyle(theme.statusBar.barStyle, true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }
    
    // Animations sequence
    Animated.sequence([
      // First animate the ID card
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      // Then animate the buttons
      Animated.timing(buttonFadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [theme]);

  const onProceed = () => {
    navigation.navigate('Map');
  };

  const onGoHome = () => {
    // Navigate to the Home tab
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

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
        <View style={styles.container}>
          <View style={[
            styles.headerContainer, 
            { borderBottomColor: theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 85, 164, 0.1)' }
          ]}>
            <Image 
              source={require('../../images/Newlogo.png')} 
              style={styles.logo}
              resizeMode="cover"
            />
            <Text style={[styles.title, { color: theme.primary }]}>{getText('idGeneration', 'title')}</Text>
          </View>
          
          <Animated.View 
            style={[
              styles.card, 
              { 
                backgroundColor: theme.mode === 'dark' ? 'rgba(45, 55, 72, 0.85)' : 'rgba(255, 255, 255, 0.85)', 
                borderColor: theme.border,
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            <Text style={[styles.label, { color: theme.primary }]}>{getText('idGeneration', 'touristId')}</Text>
            <Text style={[styles.value, { color: theme.text }]}>{touristId || 'N/A'}</Text>
            <Text style={[styles.label, { marginTop: 12, color: theme.primary }]}>{getText('idGeneration', 'validity')}</Text>
            <Text style={[styles.value, { color: theme.text }]}>{validity || 'N/A'}</Text>
          </Animated.View>
          
          <Animated.View style={{ opacity: buttonFadeAnim, width: '100%' }}>
            <TouchableOpacity 
              style={styles.buttonContainer}
              onPress={onProceed}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={['#0055A4', '#00c6fb']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.buttonText}>{getText('common', 'goToMap')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
          
          <Animated.View style={{ opacity: buttonFadeAnim, width: '100%', marginTop: 16 }}>
            <TouchableOpacity 
              style={[
                styles.secondaryButtonContainer, 
                { borderColor: theme.primary }
              ]} 
              onPress={onGoHome}
              activeOpacity={0.85}
            >
              <View style={[
                styles.secondaryButton,
                { backgroundColor: theme.mode === 'dark' ? '#333' : '#F0F0F0' }
              ]}>
                <Text style={[styles.secondaryButtonText, { color: theme.primary }]}>
                  {getText('common', 'goToHome')}
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
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
    flex: 1, 
    padding: 20, // Standardized padding
    gap: 16, // Standardized gap
    justifyContent: 'center',
    paddingBottom: 80, // Consistent bottom padding
    backgroundColor: '#FFFFFF',
  },
  title: { 
    fontSize: 26, 
    fontWeight: '700', 
    marginBottom: 0, // Remove bottom margin
    color: '#0055A4',
    textAlign: 'center',
    letterSpacing: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24, // Standardized margin
    marginTop: 10,
    paddingBottom: 16, // Add consistent padding
    borderBottomWidth: 1, // Add border line
    borderBottomColor: 'rgba(0, 85, 164, 0.1)', // Matching Profile screen
  },
  card: {
    borderWidth: 1.5, // Standardized border width
    borderColor: '#0055A4',
    borderRadius: 16, 
    padding: 20,
    backgroundColor: '#F8F9FA',
    gap: 8,
    marginVertical: 16,
    // Standardized shadow
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  label: { 
    fontWeight: '600', 
    color: '#0055A4', // Navy blue
    fontSize: 16,
    marginBottom: 6,
  },
  value: { 
    fontSize: 18,
    color: '#333333', // Dark gray
    marginBottom: 16,
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 18,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#00c6fb',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.22,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // White
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    padding: 12,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#0055A4',
    // Standardized shadow
    shadowColor: '#0055A4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  secondaryButtonContainer: {
    width: '100%',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1.5,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 85, 164, 0.3)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  secondaryButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 14,
    marginTop: 16,
  },
  secondaryButtonText: {
    color: '#0055A4',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    padding: 12,
  },
});