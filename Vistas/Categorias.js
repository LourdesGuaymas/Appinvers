import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { Video } from 'expo-av';

const initialCategories = [
  { id: '1', name: 'Alimentación', icon: 'fast-food-outline', color: '#ff6347' },
  { id: '2', name: 'Transporte', icon: 'car-outline', color: '#4682b4' },
  { id: '3', name: 'Entretenimiento', icon: 'game-controller-outline', color: '#9370db' },
  { id: '4', name: 'Salud', icon: 'medkit-outline', color: '#32cd32' },
  { id: '5', name: 'Educación', icon: 'school-outline', color: '#ff4500' },
  { id: '6', name: 'Vivienda', icon: 'home-outline', color: '#1e90ff' },
  { id: '7', name: 'Ropa', icon: 'shirt-outline', color: '#ff1493' },
  { id: '8', name: 'Comunicaciones', icon: 'call-outline', color: '#20b2aa' },
  { id: '9', name: 'Viajes', icon: 'airplane-outline', color: '#ff69b4' },
  { id: '10', name: 'Ocio', icon: 'beer-outline', color: '#daa520' },
];

export default function Categorias({ navigation }) {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState(''); // Puedes establecer un ícono predeterminado
  const [newCategoryColor, setNewCategoryColor] = useState('#000'); // Color predeterminado

  const handleCategoryPress = (category) => {
    navigation.navigate('AgregarGastos', { categoria: category.name });
  };

  const addCategory = () => {
    if (newCategoryName && newCategoryIcon) {
      // Aquí puedes validar si el ícono es un nombre válido
      const validIcons = ['fast-food-outline', 'car-outline', 'game-controller-outline', 'medkit-outline', 'school-outline', 'home-outline', 'shirt-outline', 'call-outline', 'airplane-outline', 'beer-outline'];
      
      if (validIcons.includes(newCategoryIcon)) {
        const newCategory = {
          id: (categories.length + 1).toString(),
          name: newCategoryName,
          icon: newCategoryIcon,
          color: newCategoryColor,
        };
        setCategories([...categories, newCategory]);
        setNewCategoryName('');
        setNewCategoryIcon('');
        setNewCategoryColor('#000'); // Reinicia el color
      } else {
        alert('El ícono ingresado no es válido. Por favor, verifica el nombre.');
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };
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
      <Text style={styles.title}>Categorías de Gastos</Text>

      {/* Formulario para crear nueva categoría */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nombre de la categoría"
          value={newCategoryName}
          onChangeText={setNewCategoryName}
        />
        <TextInput
          style={styles.input}
          placeholder="Icono (ej. fast-food-outline)"
          value={newCategoryIcon}
          onChangeText={setNewCategoryIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Color (ej. #ff6347)"
          value={newCategoryColor}
          onChangeText={setNewCategoryColor}
        />
        <Button title="Agregar Categoría" onPress={addCategory} />
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.item} 
            onPress={() => handleCategoryPress(item)} 
          >
            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
              <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon} size={30} color="#fff" />
              </View>
            </Animatable.View>
            <Text style={[styles.itemText, { color: item.color }]}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'red',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  item: {
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25, // Para que sea circular
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  itemText: {
    fontSize: 18,
    paddingLeft: 10, 
  },
});
