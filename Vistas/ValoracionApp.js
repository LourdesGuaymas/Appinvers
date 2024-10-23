import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Video } from 'expo-av';

const MAX_STARS = 5;

export default function ValoracionApp() {
  const [rating, setRating] = useState(0);

  const handleStarPress = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = () => {
    Alert.alert('Gracias por tu valoración', `Has dado ${rating} estrellas.`);
    // Aquí puedes añadir la lógica para enviar la valoración a un servidor
  };

  return (
    <View style={styles.container}>
      {/* Video de fondo */}
      <Video 
        source={require('../assets/videopiola.mp4')} // Asegúrate de que la ruta sea correcta
        style={styles.backgroundVideo}
        isMuted
        isLooping
        resizeMode="cover" 
        shouldPlay
      />
      {/* Capa de overlay */}
      <View style={styles.overlay} />

      {/* Contenido de la valoración */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Valora nuestra App</Text>
        
        <View style={styles.starsContainer}>
          {Array.from({ length: MAX_STARS }, (_, index) => (
            <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
              <Ionicons
                name={index < rating ? 'star' : 'star-outline'}
                size={40}
                color={index < rating ? '#ffcc00' : '#ccc'}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enviar Valoración</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semitransparente
    zIndex: 0,
  },
  contentContainer: {
    zIndex: 1, // Asegura que el contenido esté por encima del fondo y overlay
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco semitransparente para destacar el contenido
    borderRadius: 20,
    padding: 30,
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a0dad', // Color violeta oscuro
    marginBottom: 20,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  submitButton: {
    backgroundColor: '#6a0dad', // Color violeta oscuro
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
