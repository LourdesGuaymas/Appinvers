// AjustesPerfil.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Alert } from 'react-native';

export default function AjustesPerfil() {
  const [nombre, setNombre] = useState('Juan Pérez');
  const [email, setEmail] = useState('juan.perez@example.com');
  const [nuevaContraseña, setNuevaContraseña] = useState('');

  const handleSave = () => {
    // Aquí se guardan los cambios
    Alert.alert('Perfil actualizado', 'Tus cambios han sido guardados.');
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    Alert.alert('Cerrar sesión', '¿Estás seguro de que deseas cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Cerrar sesión', onPress: () => Alert.alert('Sesión cerrada') },
    ]);
  };

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f4f6',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6a0dad',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff',
  },
  saveButton: {
    backgroundColor: '#6a0dad',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: '#ff4c4c',
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
