import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Video } from 'expo-av';

const icons = [
  { name: 'fast-food-outline', color: '#ff6347' },
  { name: 'car-outline', color: '#4682b4' },
  { name: 'game-controller-outline', color: '#9370db' },
  { name: 'medkit-outline', color: '#32cd32' },
  { name: 'school-outline', color: '#ff4500' },
  { name: 'home-outline', color: '#1e90ff' },
  { name: 'shirt-outline', color: '#ff1493' },
  { name: 'paw-outline', color: '#ffb6c1' },
  { name: 'laptop-outline', color: '#add8e6' },
  { name: 'heart-outline', color: '#ff7f50' },
  { name: 'gift-outline', color: '#ffe4e1' },
];

export default function CrearCategoria({ route, navigation }) {
  const { addCategory } = route.params;
  const [categoryName, setCategoryName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#fff');

  const handleCreateCategory = () => {
    if (categoryName && selectedIcon) {
      addCategory({ name: categoryName, icon: selectedIcon, color: selectedColor });
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/videopiola.mp4')}
        style={styles.video}
        isMuted
        isLooping
        resizeMode="cover"
        shouldPlay
      />
      
      <View style={styles.bgOverlay} />

      <Text style={styles.title}>Crea una nueva Categoría</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la categoría"
        value={categoryName}
        onChangeText={setCategoryName}
      />
      
      <Text style={styles.subtitle}>Selecciona un ícono:</Text>
      <FlatList
        data={icons}
        keyExtractor={(item) => item.name}
        numColumns={4} // Número de columnas fijo
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.iconContainer, { backgroundColor: selectedIcon === item.name ? '#e0e0e0' : '#fff' }]}
            onPress={() => {
              setSelectedIcon(item.name);
              setSelectedColor(item.color);
            }}
          >
            <Ionicons name={item.name} size={40} color={item.color} />
          </TouchableOpacity>
        )}
      />
      
      <TouchableOpacity 
        style={[styles.createButton, { backgroundColor: selectedColor }]} 
        onPress={handleCreateCategory}
        disabled={!categoryName || !selectedIcon}
      >
        <Text style={styles.createButtonText}>Crear Categoría</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  bgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2c7da0',
    zIndex: 1,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#2c7da0',
    zIndex: 1,
  },
  input: {
    width: '100%',
    height: 55,
    borderColor: '#1c6d41',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    fontSize: 16,
    zIndex: 1,
  },
  iconContainer: {
    margin: 10,
    padding: 5,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1, // Asegura que los íconos ocupen el mismo espacio
  },
  createButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    zIndex: 1,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
