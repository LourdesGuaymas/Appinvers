import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';

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
      <ImageBackground 
        source={require('../assets/fondoFinal.jpg')} // Asegúrate de que la ruta sea correcta
        style={styles.backgroundImage}
      >
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
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ajusta la imagen para cubrir toda la pantalla
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Capa transparente sobre la imagen de fondo
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#468faf', // Texto blanco sobre el fondo
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: 'rgba(204, 204, 204, 0.7)', // Color del borde más suave
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    width:320,
    marginLeft:26,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo del input más transparente
  },
  saveButton: {
    marginTop:30,
    backgroundColor: '#468faf', // Botón "Guardar" más transparente
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    width:300,
    marginLeft:35,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 76, 76, 0.7)', // Botón "Cerrar Sesión" más transparente
    paddingVertical: 15,
    borderRadius: 10,
    width:300,
    marginLeft:35,
  },
  buttonText: {
    color: 'rgba(255, 255, 255, 0.9)', // Texto un poco más transparente
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
