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
  };

  return (
    <ImageBackground 
    
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
    backgroundColor: '#272780',
  },
  contentContainer: {
    zIndex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#272760',// Fondo blanco semitransparente 
    borderRadius: 20,
    padding: 30,
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  starWrapper: {
    borderWidth: 2,
    borderColor: 'blue ', 
    borderRadius: 20, // Opcional: para redondear bordes
    margin: 5,
    padding: 5, // Espaciado interno 
   
    elevation: 2, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  submitButton: {
    backgroundColor: '#272780',
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
