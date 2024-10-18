
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const HamburgerMenu = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.menuButton}>
      <Ionicons name="menu" size={50} color="violet" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    top: -20,
    padding: 10,
    marginRight: 15, 
    marginLeft: -17, 
},
});

export default HamburgerMenu;
