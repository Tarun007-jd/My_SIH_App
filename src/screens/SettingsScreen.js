import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  StatusBar, 
  Platform, 
  Image, 
  Switch, 
  FlatList,
  Animated
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function SettingsScreen({ navigation }) {
  const { resetAll } = useUser();
  const { theme, toggleTheme } = useTheme();
  const { currentLanguage, setLanguage, languages, getText } = useLanguage();
  const isDarkMode = theme.mode === 'dark';

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;
  
  // Configure status bar with current theme
  useEffect(() => {
    StatusBar.setBarStyle(theme.statusBar.barStyle, true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }
    
    // Run animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [theme]);

  const onLogout = () => {
    resetAll();
    navigation.navigate('Home', { screen: 'Login' });
  };

  // Grouped languages for better UI organization
  const groupedLanguages = [
    {
      title: getText('settings', 'majorLanguages') || 'Major Languages',
      data: languages.filter(lang => ['en', 'hi'].includes(lang.code))
    },
    {
      title: getText('settings', 'southIndian') || 'South Indian Languages',
      data: languages.filter(lang => ['te', 'ta', 'kn', 'ml'].includes(lang.code))
    },
    {
      title: getText('settings', 'northIndian') || 'North Indian Languages',
      data: languages.filter(lang => ['mr', 'gu', 'pa', 'or', 'as', 'ur', 'sa'].includes(lang.code))
    },
    {
      title: getText('settings', 'eastIndian') || 'East Indian Languages',
      data: languages.filter(lang => ['bn'].includes(lang.code))
    }
  ];

  const renderLanguageSection = ({ item: group }) => (
    <View style={[styles.languageSection, { borderBottomColor: theme.border }]}>
      <Text style={[styles.languageSectionTitle, { color: theme.primary }]}>
        {group.title}
      </Text>
      <View style={styles.languageGroup}>
        {group.data.map(language => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageItem, 
              { 
                backgroundColor: currentLanguage === language.code ? theme.primary : 'transparent',
                borderColor: theme.border
              }
            ]}
            onPress={() => setLanguage(language.code)}
          >
            <Text 
              style={{ 
                color: currentLanguage === language.code ? '#FFFFFF' : theme.text,
                fontWeight: currentLanguage === language.code ? '700' : '400',
                fontSize: 14,
              }}
              numberOfLines={1}
            >
              {language.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

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
            <Text style={[styles.title, { color: theme.primary }]}>SafeVoyage</Text>
          </View>

          {/* Language Card */}
          <Animated.View style={[
            styles.card, 
            { 
              backgroundColor: theme.mode === 'dark' ? 'rgba(45, 55, 72, 0.85)' : 'rgba(255, 255, 255, 0.85)', 
              borderColor: theme.border,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}>
            <Text style={[styles.sectionTitle, { color: theme.primary }]}>
              {getText('settings', 'language')}
            </Text>
            
            <FlatList
              data={groupedLanguages}
              renderItem={renderLanguageSection}
              keyExtractor={(item) => item.title}
              showsVerticalScrollIndicator={false}
              style={styles.languageList}
            />
          </Animated.View>

          {/* Dark Mode Toggle */}
          <Animated.View style={[
            styles.card, 
            { 
              backgroundColor: theme.mode === 'dark' ? 'rgba(45, 55, 72, 0.85)' : 'rgba(255, 255, 255, 0.85)', 
              borderColor: theme.border,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              marginTop: 16
            }
          ]}>
            <View style={styles.themeRow}>
              <Text style={[styles.label, { color: theme.primary }]}>{getText('settings', 'darkTheme')}</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#0077CC" }}
                thumbColor={isDarkMode ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleTheme}
                value={isDarkMode}
              />
            </View>
          </Animated.View>

          {/* Logout Button */}
          <Animated.View style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            width: '100%',
            marginTop: 24
          }}>
            <TouchableOpacity 
              style={styles.buttonContainer}
              onPress={onLogout}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={['#0055A4', '#00c6fb']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.buttonText}>{getText('common', 'logout')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* App Info Section */}
          <Animated.View style={[
            styles.card, 
            { 
              backgroundColor: theme.mode === 'dark' ? 'rgba(45, 55, 72, 0.85)' : 'rgba(255, 255, 255, 0.85)', 
              borderColor: theme.border,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              marginTop: 16
            }
          ]}>
            <Text style={[styles.sectionTitle, { color: theme.primary }]}>
              {getText('settings', 'appInfo') || 'App Information'}
            </Text>
            <View style={styles.themeRow}>
              <Text style={[styles.label, { color: theme.primary }]}>App Name</Text>
              <Text style={{ color: theme.text }}>SafeVoyage</Text>
            </View>
            <View style={styles.themeRow}>
              <Text style={[styles.label, { color: theme.primary }]}>
                {getText('settings', 'version') || 'Version'}
              </Text>
              <Text style={{ color: theme.text }}>1.0.0</Text>
            </View>
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
    backgroundColor: '#FFFFFF',
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
  title: { 
    fontSize: 26, 
    fontWeight: '700', 
    marginBottom: 0, // Remove bottom margin
    color: '#0055A4',
    textAlign: 'center',
    letterSpacing: 1,
  },
  card: { 
    borderWidth: 1.5, // Standardized border width
    borderColor: '#0055A4',
    borderRadius: 12, 
    padding: 20,
    backgroundColor: '#F8F9FA',
    marginBottom: 16,
    // Standardized shadow
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  label: { 
    fontWeight: '600', 
    marginBottom: 12,
    color: '#0055A4', // Navy blue
    fontSize: 16,
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
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
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
  themeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  languageList: {
    maxHeight: 300, // Limit height so it doesn't take up too much space
  },
  languageSection: {
    marginBottom: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  languageSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  languageGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingLeft: 4,
  },
  languageItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 8,
    minWidth: 90,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
});