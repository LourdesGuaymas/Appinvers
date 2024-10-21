<<<<<<< HEAD
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
const PerfilUsuario = () => {
  return (
    <View style={styles.container}>

<Video 
                source={require('./fondo.mp4')}
                style={styles.video}
                isMuted
                isLooping
                resizeMode="cover" 
                shouldPlay
            />
      <Image
        source={{ uri: '' }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>Juan Pérez</Text>
      <Text style={styles.description}>Desarrollador de Software</Text>
      <Text style={styles.email}>Correo: juan.perez@email.com</Text>
      <Text style={styles.phone}>Teléfono: +54 11 3262 1789</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, 
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#777',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '130%',
    height: '120%',
    zIndex: -4, 
},
bgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '120%',
    height: '120%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: 0,
},
  email: {
    fontSize: 14,
    color: '#333',
  },
  phone: {
    fontSize: 14,
    color: '#333',
  },
});

export default PerfilUsuario;
=======
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
const PerfilUsuario = () => {
  return (
    <View style={styles.container}>

<Video 
                source={require('./fondo.mp4')}
                style={styles.video}
                isMuted
                isLooping
                resizeMode="cover" 
                shouldPlay
            />
      <Image
        source={{ uri: '' }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>Juan Pérez</Text>
      <Text style={styles.description}>Desarrollador de Software</Text>
      <Text style={styles.email}>Correo: juan.perez@email.com</Text>
      <Text style={styles.phone}>Teléfono: +54 11 3262 1789</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, 
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#777',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '130%',
    height: '120%',
    zIndex: -4, 
},
bgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '120%',
    height: '120%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: 0,
},
  email: {
    fontSize: 14,
    color: '#333',
  },
  phone: {
    fontSize: 14,
    color: '#333',
  },
});

export default PerfilUsuario;
>>>>>>> 46a166c357317ee1626ecda3d792f92555106804
