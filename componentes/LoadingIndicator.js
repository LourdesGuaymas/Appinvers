import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/costo.gif')} // Asegúrate de usar un archivo GIF o similar
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 150, // Ajusta el tamaño según sea necesario
    height: 150,
  },
});

export default LoadingIndicator;
