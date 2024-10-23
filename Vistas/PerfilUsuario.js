import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { Video } from 'expo-av';

export default function AjustesPerfil() {
  const [nombre, setNombre] = useState('Juan Pérez');
  const [email, setEmail] = useState('juan.perez@example.com');
  const [nuevaContraseña, setNuevaContraseña] = useState('');

  const handleSave = () => {
    Alert.alert('Perfil actualizado', 'Tus cambios han sido guardados.');
  };

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro de que deseas cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Cerrar sesión', onPress: () => Alert.alert('Sesión cerrada') },
    ]);
  };

  return (
    <View style={styles.container}>
      <Video 
        source={require('../assets/videopiola.mp4')} // Asegúrate de que la ruta sea correcta
        style={styles.backgroundVideo}
        isMuted
        isLooping
        resizeMode="cover" 
        shouldPlay
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Ajustes de Perfil</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Nueva contraseña"
          value={nuevaContraseña}
          onChangeText={setNuevaContraseña}
          secureTextEntry
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(243, 244, 246, 0.0)', // Fondo semi-transparente ajustado
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#468faf', // Color más transparente
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'rgba(204, 204, 204, 0.7)', // Color del borde más suave
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo del input más transparente
  },
  saveButton: {
    backgroundColor: '#468faf', // Botón "Guardar" más transparente
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 76, 76, 0.7)', // Botón "Cerrar Sesión" más transparente
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'rgba(255, 255, 255, 0.9)', // Texto un poco más transparente
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
