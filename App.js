import React, { useEffect } from 'react';
import { Alert, PermissionsAndroid, Platform, LogBox } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { UserProvider } from './src/context/UserContext';

import LoginScreen from './src/screens/LoginScreen';
import VerificationScreen from './src/screens/VerificationScreen';
import IdGenerationScreen from './src/screens/IdGenerationScreen';
import MapScreen from './src/screens/MapScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Login" component={LoginScreen} options={{ title: 'Tourist Login' }} />
      <HomeStack.Screen name="Verification" component={VerificationScreen} options={{ title: 'Verification' }} />
      <HomeStack.Screen name="IdGeneration" component={IdGenerationScreen} options={{ title: 'Your Tourist ID' }} />
      <HomeStack.Screen name="Map" component={MapScreen} options={{ title: 'Map Visualization' }} />
    </HomeStack.Navigator>
  );
}

export default function App() {
  // Ignore non-critical warnings that might appear as errors in development
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    
    (async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'The app needs location access to show your position on the map and zone alerts.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('Location Permission Denied', 'The app needs location access to show your position on the map and zone alerts.');
          }
        } catch (err) {
          Alert.alert('Permission Error', 'Could not request location permission.');
        }
      }
    })();
  }, []);

  // Error boundary to prevent app crashes
  try {
    return (
      <UserProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarLabelStyle: { fontSize: 12 },
              tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === 'Home') iconName = 'home';
                else if (route.name === 'Profile') iconName = 'person';
                else if (route.name === 'Settings') iconName = 'settings';
                return <MaterialIcons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Home" component={HomeStackNavigator} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </UserProvider>
    );
  } catch (error) {
    // Fallback UI in case of render errors
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Something went wrong. Please restart the app.</Text>
      </SafeAreaView>
    );
  }
}