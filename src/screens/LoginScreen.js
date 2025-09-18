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
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

// Array of countries for the nationality picker
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", 
  "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", 
  "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", 
  "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", 
  "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", 
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", 
  "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", 
  "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", 
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", 
  "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", 
  "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", 
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", 
  "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", 
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", 
  "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", 
  "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", 
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", 
  "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
  "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", 
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", 
  "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", 
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export default function LoginScreen({ navigation }) {
  const { basic, setBasic } = useUser();
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const [formData, setFormData] = useState({
    name: basic.name || '',
    email: basic.email || '',
    phone: basic.phone || '',
    age: basic.age || '',
    nationality: basic.nationality || 'Indian',
  });

  // Animated values for elements
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const moveAnim = React.useRef(new Animated.Value(50)).current;

  // Configure status bar with theme colors
  useEffect(() => {
    StatusBar.setBarStyle(theme.statusBar.barStyle, true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }
    
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(moveAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, [theme, fadeAnim, moveAnim]);

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleNationality = (value) => {
    setFormData({
      ...formData,
      nationality: value,
    });
  };

  const validateForm = () => {
    const { name, email, phone, age } = formData;
    
    // Basic validations
    if (!name?.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    
    if (!email?.trim() || !email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    
    if (!phone?.trim() || phone.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return false;
    }
    
    const numAge = parseInt(age || '0', 10);
    if (!age?.trim() || numAge <= 0 || numAge > 120) {
      Alert.alert('Error', 'Please enter a valid age');
      return false;
    }
    
    return true;
  };

  const onSubmit = () => {
    if (!validateForm()) return;
    
    // Update the context with form data
    setBasic(formData);
    
    // Navigate to verification screen
    navigation.navigate('Verification');
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View style={[
              styles.headerContainer, 
              { 
                opacity: fadeAnim,
                transform: [{ translateY: moveAnim }] 
              }
            ]}>
              <Image 
                source={require('../../images/Newlogo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={[styles.title, { color: theme.primary }]}>
                {getText('login', 'title')}
              </Text>
              <Text style={[styles.subtitle, { color: theme.text }]}>
                {getText('welcome', 'subtitle')}
              </Text>
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.formContainer,
                { 
                  backgroundColor: theme.mode === 'dark' 
                    ? 'rgba(26, 32, 44, 0.8)' 
                    : 'rgba(255, 255, 255, 0.85)',
                  opacity: fadeAnim,
                  transform: [{ translateY: moveAnim }]
                }
              ]}
            >
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.primary }]}>
                  {getText('login', 'name')}
                </Text>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: theme.inputBg, 
                    color: theme.inputText,
                    borderColor: theme.border
                  }]}
                  value={formData.name}
                  onChangeText={(value) => handleChange('name', value)}
                  placeholder={getText('login', 'namePlaceholder')}
                  placeholderTextColor={theme.mode === 'dark' ? '#999' : '#888'}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.primary }]}>
                  {getText('login', 'email')}
                </Text>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: theme.inputBg, 
                    color: theme.inputText,
                    borderColor: theme.border
                  }]}
                  value={formData.email}
                  onChangeText={(value) => handleChange('email', value)}
                  placeholder={getText('login', 'emailPlaceholder')}
                  placeholderTextColor={theme.mode === 'dark' ? '#999' : '#888'}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.primary }]}>
                  {getText('login', 'phone')}
                </Text>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: theme.inputBg, 
                    color: theme.inputText,
                    borderColor: theme.border
                  }]}
                  value={formData.phone}
                  onChangeText={(value) => handleChange('phone', value)}
                  placeholder={getText('login', 'phonePlaceholder')}
                  placeholderTextColor={theme.mode === 'dark' ? '#999' : '#888'}
                  keyboardType="phone-pad"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.primary }]}>
                  {getText('login', 'age')}
                </Text>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: theme.inputBg, 
                    color: theme.inputText,
                    borderColor: theme.border
                  }]}
                  value={formData.age}
                  onChangeText={(value) => handleChange('age', value)}
                  placeholder={getText('login', 'agePlaceholder')}
                  placeholderTextColor={theme.mode === 'dark' ? '#999' : '#888'}
                  keyboardType="number-pad"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.primary }]}>
                  {getText('login', 'nationality')}
                </Text>
                <View style={styles.nationalityContainer}>
                  <TouchableOpacity
                    style={[
                      styles.nationalityButton,
                      formData.nationality === 'Indian' && styles.activeNationality,
                      { 
                        borderColor: theme.border,
                        backgroundColor: formData.nationality === 'Indian' 
                          ? theme.primary 
                          : theme.mode === 'dark' ? '#2D3748' : '#F0F4F8'
                      }
                    ]}
                    onPress={() => handleNationality('Indian')}
                  >
                    <Text style={[
                      styles.nationalityText, 
                      { color: formData.nationality === 'Indian' ? '#FFFFFF' : theme.text }
                    ]}>
                      {getText('login', 'indian')}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[
                      styles.nationalityButton,
                      formData.nationality === 'Other' && styles.activeNationality,
                      { 
                        borderColor: theme.border,
                        backgroundColor: formData.nationality === 'Other' 
                          ? theme.primary 
                          : theme.mode === 'dark' ? '#2D3748' : '#F0F4F8'
                      }
                    ]}
                    onPress={() => handleNationality('Other')}
                  >
                    <Text style={[
                      styles.nationalityText, 
                      { color: formData.nationality === 'Other' ? '#FFFFFF' : theme.text }
                    ]}>
                      {getText('login', 'other')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.buttonContainer,
                { 
                  opacity: fadeAnim,
                  transform: [{ translateY: moveAnim }]
                }
              ]}
            >
              <TouchableOpacity 
                style={styles.button}
                onPress={onSubmit}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={['#0055A4', '#00c6fb']}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.buttonText}>{getText('login', 'proceed')}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 16,
    borderWidth: 3,
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
    color: '#555',
    maxWidth: '80%',
  },
  formContainer: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },
  nationalityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  nationalityButton: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  activeNationality: {
    backgroundColor: '#0055A4',
  },
  nationalityText: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
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
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1.2,
  },
});