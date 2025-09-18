import React, { useEffect, useRef, useState } from "react";
import {
  View, 
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Animated,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import MapView, { UrlTile, Marker, Polygon } from "react-native-maps";
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

// Default San Francisco coordinates
const DEFAULT_LATITUDE = 37.7749;
const DEFAULT_LONGITUDE = -122.4194;
const DEFAULT_DELTA = 0.05;

// Define safe and restricted zones
const ZONES = [
  {
    id: 'safe-zone',
    type: 'safe',
    coordinates: [
      { latitude: 37.775, longitude: -122.435 },
      { latitude: 37.775, longitude: -122.425 },
      { latitude: 37.765, longitude: -122.425 },
      { latitude: 37.765, longitude: -122.435 },
    ],
    name: 'Downtown Safe Zone'
  },
  {
    id: 'restricted-zone',
    type: 'restricted',
    coordinates: [
      { latitude: 37.79, longitude: -122.445 },
      { latitude: 37.79, longitude: -122.435 },
      { latitude: 37.78, longitude: -122.435 },
      { latitude: 37.78, longitude: -122.445 },
    ],
    name: 'Northern Restricted Area'
  }
];

export default function MapScreen() {
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  
  const mapRef = useRef(null);
  
  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;
  
  // For demonstration, we'll simulate loading
  useEffect(() => {
    StatusBar.setBarStyle(theme.statusBar.barStyle, true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }
    
    const timer = setTimeout(() => {
      setLoading(false);
      // Simulate getting current location
      setCurrentLocation({
        latitude: DEFAULT_LATITUDE,
        longitude: DEFAULT_LONGITUDE,
      });
      
      // Start animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [theme]);
  
  // Center map on current location
  const centerOnUser = () => {
    if (currentLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        ...currentLocation,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }, 500);
    }
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
        
        {/* Header */}
        <View style={[styles.header, { 
          borderBottomColor: theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 85, 164, 0.1)'
        }]}>
          <Image 
            source={require('../../images/Newlogo.png')} 
            style={styles.logo}
            resizeMode="cover"
          />
          <Text style={[styles.headerText, { color: theme.primary }]}>
            {getText('map', 'title')}
          </Text>
        </View>
        
        <View style={styles.container}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.primary} />
              <Text style={[styles.loadingText, { color: theme.text }]}>
                {getText('map', 'loading')}
              </Text>
            </View>
          ) : (
            <>
              <MapView
                ref={mapRef}
                style={styles.map}
                provider={null}
                initialRegion={{
                  latitude: DEFAULT_LATITUDE,
                  longitude: DEFAULT_LONGITUDE,
                  latitudeDelta: DEFAULT_DELTA,
                  longitudeDelta: DEFAULT_DELTA,
                }}
              >
                {/* OSM Tile Layer */}
                <UrlTile
                  urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                  maximumZ={19}
                />
                
                {/* Zone Polygons */}
                {ZONES.map(zone => (
                  <Polygon
                    key={zone.id}
                    coordinates={zone.coordinates}
                    strokeColor={zone.type === 'safe' ? 'rgba(16,185,129,0.9)' : 'rgba(239,68,68,0.9)'}
                    fillColor={zone.type === 'safe' ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.25)'}
                    strokeWidth={2}
                  />
                ))}
                
                {/* Current Location Marker */}
                {currentLocation && (
                  <Marker
                    coordinate={currentLocation}
                    title={getText('map', 'currentLocation') || "You are here"}
                  />
                )}
              </MapView>
              
              {/* Map Legend with animation */}
              <Animated.View style={[
                styles.legend, 
                { 
                  backgroundColor: theme.mode === 'dark' ? 'rgba(42,42,42,0.85)' : 'rgba(255,255,255,0.85)',
                  borderColor: theme.border,
                  opacity: fadeAnim,
                  transform: [{ translateX: slideAnim }],
                }
              ]}>
                <Text style={[styles.legendTitle, { color: theme.primary }]}>
                  {getText('map', 'legend')}
                </Text>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: 'rgba(16,185,129,0.9)' }]} />
                  <Text style={[styles.legendText, { color: theme.text }]}>
                    {getText('map', 'safe')}
                  </Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: 'rgba(239,68,68,0.9)' }]} />
                  <Text style={[styles.legendText, { color: theme.text }]}>
                    {getText('map', 'restricted')}
                  </Text>
                </View>
              </Animated.View>
              
              {/* Animated Center Button */}
              <Animated.View style={{
                position: 'absolute',
                bottom: 24,
                right: 16,
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}>
                <TouchableOpacity 
                  style={styles.centerButtonContainer}
                  onPress={centerOnUser}
                >
                  <LinearGradient
                    colors={['#0055A4', '#00c6fb']}
                    style={styles.centerButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.centerButtonText}>{getText('map', 'center') || 'Center'}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            </>
          )}
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
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#0055A4',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  legend: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 150,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
  },
  centerButtonContainer: {
    borderRadius: 24,
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
  centerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  centerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
