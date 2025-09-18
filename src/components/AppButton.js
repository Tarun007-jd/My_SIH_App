import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const AppButton = ({ 
  title, 
  onPress, 
  style, 
  textStyle,
  loading = false,
  disabled = false,
  variant = 'primary' // primary, secondary, outline
}) => {
  const getButtonStyle = () => {
    if (variant === 'secondary') return styles.secondaryButton;
    if (variant === 'outline') return styles.outlineButton;
    return styles.primaryButton;
  };
  
  const getTextStyle = () => {
    if (variant === 'outline') return styles.outlineText;
    return styles.buttonText;
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        getButtonStyle(),
        disabled && styles.disabledButton,
        style
      ]} 
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#FFD700" size="small" />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    elevation: 4,
  },
  primaryButton: {
    backgroundColor: '#E53935',
    shadowColor: '#E53935',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  secondaryButton: {
    backgroundColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  buttonText: {
    color: '#FFD700',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
  outlineText: {
    color: '#FFD700',
    fontWeight: '600',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.6,
  }
});

export default AppButton;
