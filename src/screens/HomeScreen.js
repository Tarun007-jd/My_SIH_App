import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Platform, Image } from 'react-native';
import { useUser } from '../context/UserContext';

export default function HomeScreen() {
  const { basic, verification, touristId, validity } = useUser();
  
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
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image 
            source={require('../../images/Newlogo.png')} 
            style={styles.logo}
            resizeMode="cover"
          />
          <Text style={styles.title}>Welcome to MyTour</Text>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.subtitle}>Your Profile</Text>
          <View style={styles.card}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{basic.name}</Text>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.label}>Tourist ID:</Text>
            <Text style={styles.value}>{touristId}</Text>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.label}>Validity:</Text>
            <Text style={styles.value}>{validity}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { 
    flex: 1,
    backgroundColor: '#FFFFFF',
    // Adjust padding to account for visible status bar
    paddingTop: Platform.OS === 'ios' ? 0 : 0, // Remove extra padding
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
    paddingBottom: 16, // Standardized padding
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 85, 164, 0.1)',
  },
  title: { 
    fontSize: 34,
    fontWeight: '800',
    color: '#0055A4',
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 0, // Remove bottom margin
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
});