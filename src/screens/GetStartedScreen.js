import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  Dimensions,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Add this package for gradients
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const { width, height } = Dimensions.get('window');

export default function GetStartedScreen({ navigation }) {
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const [imageError, setImageError] = useState(false);

  // Configure status bar with theme colors
  useEffect(() => {
    StatusBar.setBarStyle(theme.statusBar.barStyle, true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(theme.statusBar.backgroundColor);
      StatusBar.setTranslucent(false);
    }
  }, [theme]);

  const onGetStarted = () => {
    navigation.navigate('Login');
  };

  // Handle image loading error
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <LinearGradient
      colors={theme.mode === 'dark'
        ? ['#232526', '#414345']
        : ['#e0eafc', '#cfdef3']}
      style={styles.gradient}
    >
      <SafeAreaView style={[styles.safe, { backgroundColor: 'transparent' }]}>
        <StatusBar 
          barStyle={theme.statusBar.barStyle}
          backgroundColor={theme.statusBar.backgroundColor}
          translucent={false}
        />
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[styles.container]}>
            <Image 
              source={require('../../images/Newlogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            
            <Text style={[styles.title, { color: theme.primary }]}>{getText('common', 'welcome')}</Text>
            
            <Text style={[styles.subtitle, { color: theme.text }]}>
              SafeVoyage - {getText('welcome', 'subtitle')}
            </Text>
            
            <View style={styles.featureContainer}>
              {[{
                title: getText('welcome', 'touristId'),
                desc: getText('welcome', 'touristIdDesc'),
                icon: '🆔'
              }, {
                title: getText('welcome', 'safeZones'),
                desc: getText('welcome', 'safeZonesDesc'),
                icon: '🛡️'
              }, {
                title: getText('welcome', 'travelInfo'),
                desc: getText('welcome', 'travelInfoDesc'),
                icon: '🗺️'
              }].map((item, idx) => (
                <View key={idx} style={styles.glassCard}>
                  <Text style={styles.featureIcon}>{item.icon}</Text>
                  <Text style={[styles.featureTitle, { color: theme.primary }]}>{item.title}</Text>
                  <Text style={[styles.featureText, { color: theme.text }]}>{item.desc}</Text>
                </View>
              ))}
            </View>
            
            
            <TouchableOpacity 
              style={styles.button}
              activeOpacity={0.85}
              onPress={onGetStarted}
            >
              <LinearGradient
                colors={['#0055A4', '#00c6fb']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.buttonText}>{getText('common', 'getStarted')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === 'ios' ? 30 : 15,
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.45,
    height: width * 0.45,
    marginBottom: 18,
    borderRadius: width * 0.225,
    borderWidth: 4,
    borderColor: '#00c6fb',
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#00c6fb',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 1.5,
    textShadowColor: '#00c6fb33',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 28,
    paddingHorizontal: 16,
    lineHeight: 26,
    fontWeight: '500',
    color: '#0055A4',
  },
  featureContainer: {
    width: '100%',
    marginVertical: 12,
    gap: 12,
  },
  glassCard: {
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderRadius: 20,
    padding: 18,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: '#e0eafc',
    alignItems: 'center',
    shadowColor: '#00c6fb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 10,
    ...Platform.select({
      android: { elevation: 5 },
    }),
    backdropFilter: 'blur(8px)', // For web, ignored on native
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 6,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  featureText: {
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    width: '100%',
    borderRadius: 18,
    marginTop: 18,
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
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1.2,
    textShadowColor: '#0055A444',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  animationContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
    height: height * 0.22,
  },
  introAnimation: {
    width: '80%',
    height: '100%',
    borderRadius: 18,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#00c6fb',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
