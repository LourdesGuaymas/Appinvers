import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
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
    <View style={styles.container}>
      {/* Elimina o comenta la línea siguiente para quitar el título */}
      {/* <Text style={styles.title}>Valora nuestra App</Text> */}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Si no necesitas el estilo del título, puedes eliminarlo también
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a0dad',
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  submitButton: {
    backgroundColor: '#6a0dad',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
