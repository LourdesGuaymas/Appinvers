import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput, Alert, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading

  const saveLogin = async () => {
    await AsyncStorage.setItem('userLoggedIn', 'true');
  };

  const authenticateBiometric = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      Alert.alert('Dispositivo no compatible con autenticación biométrica');
      return;
    }

    const { success } = await LocalAuthentication.authenticateAsync();
    if (success) {
      Alert.alert('Éxito', 'Autenticación biométrica exitosa');
    } else {
      Alert.alert('Falló la autenticación biométrica');
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    setLoading(true); // Show loading indicator

    try {
      const response = await fetch('http://192.168.100.20:3000/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        Alert.alert('Error', 'Credenciales incorrectas');
        setLoading(false);
        return;
      }

      const usuario = await response.json();
      Alert.alert('Éxito', `Bienvenido, ${email}`);
      await saveLogin(); // Save login state
      await authenticateBiometric(); // Prompt for biometric authentication
      navigation.navigate('Home'); // Navigate to Home after login
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al conectar con el servidor');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInDown" style={styles.header}>
        <Image source={require('../Vistas/APPINVERS (2).png')} style={styles.logo} />
        <Text style={styles.title}>Ingreso de Usuario</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator color="#fff" /> // Show loading spinner
          ) : (
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>
            ¿No tienes una cuenta? Regístrate
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a9d6e5',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#014f86',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 30,
  },
  logo: {
    width: 280,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  form: {
    marginTop: -80,
    flex: 2,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#013a63',
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#012a4a',
  },
});
