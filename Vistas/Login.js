import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Alert, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const saveLogin = async () => {
    await AsyncStorage.setItem('userLoggedIn', 'true');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    try {
      const response = await fetch(`http://10.0.1.33:3000/api/usuarios?email=${email}`);
      
      if (response.ok) {
        const usuarios = await response.json();
        const usuario = usuarios.find(user => user.email === email);
        
        if (usuario) {
          Alert.alert('Éxito', `Bienvenido, ${email}`);
          saveLogin();
          // Navegar a la siguiente pantalla después de iniciar sesión
        } else {
          Alert.alert('Error', 'El usuario no existe');
        }
      } else {
        Alert.alert('Error', 'No se pudo verificar el usuario');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al conectar con el servidor');
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
          <Text style={styles.buttonText}>Ingresar</Text>
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
    backgroundColor: '#f3f4f6', // Fondo claro
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e90ff', // Color más vibrante
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  form: {
    flex: 2,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#32cd32', // Color verde vibrante
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
    color: '#1e90ff', // Color azul
  },
});
