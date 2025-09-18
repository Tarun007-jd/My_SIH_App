import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const Card = ({ children, style, animated = false }) => {
  const fadeIn = React.useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    if (animated) {
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 500,
        delay: 100,
        useNativeDriver: true,
      }).start();
    }
  }, []);
  
  const CardComponent = animated ? Animated.View : View;
  
  return (
    <CardComponent 
      style={[
        styles.card, 
        style,
        animated ? { opacity: fadeIn } : null
      ]}
    >
      {children}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1, 
    borderColor: '#FFD700',
    borderRadius: 12, 
    padding: 20, 
    backgroundColor: '#181818',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    marginVertical: 10,
  },
});

export default Card;
