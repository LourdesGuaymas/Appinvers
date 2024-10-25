import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    <ImageBackground source={require('../assets/fondoFinal.jpg')} style={{ flex: 1, resizeMode: 'cover' }}>
      {/* Overlay para oscurecer el fondo */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 0 }} />

      <View style={{ flex: 1, padding: 20, justifyContent: 'center', backgroundColor: 'transparent' }}>
        <Text style={{ fontSize: 24, marginTop: 60, fontWeight: 'bold', color: '#2c7da0', textAlign: 'center', marginBottom: 10, zIndex: 1 }}>
          Crea una nueva Categoría
        </Text>
        <TextInput
          style={{
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
          }}
          placeholder="Nombre de la categoría"
          value={categoryName}
          onChangeText={setCategoryName}
        />
        
        <Text style={{ fontSize: 24, marginBottom: 10, fontWeight: 'bold', color: '#2c7da0', zIndex: 1 }}>
          Selecciona un ícono:
        </Text>
        <FlatList
          data={icons}
          keyExtractor={(item) => item.name}
          numColumns={4}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                margin: 10,
                padding: 5,
                height: 60,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#ccc',
                flex: 1,
                backgroundColor: selectedIcon === item.name ? item.color : '#fff', // Cambia el fondo al color del ícono seleccionado
              }}
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
          style={{
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
            marginTop: 20,
            backgroundColor: 'rgba(2, 62, 74, 0.9)',
            zIndex: 1,
          }} 
          onPress={handleCreateCategory}
          disabled={!categoryName || !selectedIcon}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
            Crear Categoría
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
