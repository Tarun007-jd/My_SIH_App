import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientBackground = ({ children, colors }) => {
  // Simple error handling to fall back to a solid background if LinearGradient fails
  try {
    return (
      <LinearGradient
        colors={colors || ['#000000', '#2A0000', '#000000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    );
  } catch (error) {
    console.warn('LinearGradient failed, using fallback:', error);
    return (
      <View style={[styles.gradient, styles.fallback]}>
        {children}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  fallback: {
    backgroundColor: '#000000', // Solid black fallback
  },
});

export default GradientBackground;
