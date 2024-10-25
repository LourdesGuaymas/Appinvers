import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    <ImageBackground 
      source={require('../assets/fondoFinal.jpg')} // Ruta de la imagen de fondo
      style={styles.container}
    >
      {/* Contenido de la valoración */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Valora nuestra App</Text>
        
        <View style={styles.starsContainer}>
          {Array.from({ length: MAX_STARS }, (_, index) => (
            <TouchableOpacity key={index} onPress={() => handleStarPress(index)} style={styles.starWrapper}>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    zIndex: 1, // Asegura que el contenido esté por encima del fondo
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
    color: '#2c7da0', // Color violeta oscuro
    marginBottom: 20,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  starWrapper: {
    borderWidth: 2,
    borderColor: 'black', // Borde negro para las estrellas
    borderRadius: 20, // Opcional: para redondear bordes
    margin: 5,
    padding: 5, // Espaciado interno para hacer el borde más visible
    // Asegurarse de que el fondo sea transparente
  },
  submitButton: {
   
     backgroundColor: '#2c7da0',// Color violeta oscuro
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

