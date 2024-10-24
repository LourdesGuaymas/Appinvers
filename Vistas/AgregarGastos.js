import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Video } from 'expo-av';
import { useExpenses } from '../Almacenamiento/ExpensesContext';

const initialCategories = [
  { id: '1', name: 'Alimentación', color: '#ff6347' },
  { id: '2', name: 'Transporte', color: '#4682b4' },
  { id: '3', name: 'Entretenimiento', color: '#9370db' },
  { id: '4', name: 'Salud', color: '#32cd32' },
  { id: '5', name: 'Educación', color: '#ff4500' },
  { id: '6', name: 'Vivienda', color: '#1e90ff' },
  { id: '7', name: 'Ropa', color: '#ff1493' },
  { id: '8', name: 'Comunicaciones', color: '#20b2aa' },
  { id: '9', name: 'Viajes', color: '#ff69b4' },
  { id: '10', name: 'Ocio', color: '#daa520' },
  { id: '11', name: 'Hogar', color: '#ffa07a' },
  { id: '12', name: 'Mascotas', color: '#ffb6c1' },
  { id: '13', name: 'Tecnología', color: '#add8e6' },
  { id: '14', name: 'Cuidado Personal', color: '#ff7f50' },
  { id: '15', name: 'Regalos', color: '#ffe4e1' },
];

const AgregarGastos = ({ navigation, route }) => {
  const { addExpense } = useExpenses();
  const { categoria } = route.params || {};

const [initialCategory, setInitialCategory] = useState(null);

  // useEffect para actualizar la categoría seleccionada cuando cambia la props
  useEffect(() => {
    const initialCategory = initialCategories.find(cat => cat.name === categoria);
    if (initialCategory) {
      setInitialCategory(initialCategory);
      setCategoriaSeleccionada(initialCategory.name);
      setColorSeleccionado(initialCategory.color);
    } else {
      setCategoriaSeleccionada(initialCategories[0].name);
      setColorSeleccionado(initialCategories[0].color);
    }
  }, [categoria]); // Dependencia de categoria


  
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(initialCategory ? initialCategory.name : initialCategories[0].name);
  const [colorSeleccionado, setColorSeleccionado] = useState(initialCategory ? initialCategory.color : initialCategories[0].color);

  // Función para manejar la categoría seleccionada
  const handleCategoriaChange = (itemValue) => {
    const selectedCategory = initialCategories.find(cat => cat.name === itemValue);
    if (selectedCategory) {
      setCategoriaSeleccionada(selectedCategory.name);
      setColorSeleccionado(selectedCategory.color);
    }
  };

  const handleAgregarGasto = () => {
    if (!categoriaSeleccionada || !monto) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const montoNumero = parseFloat(monto);
    if (isNaN(montoNumero) || montoNumero <= 0) {
      alert('Por favor, introduce un monto válido.');
      return;
    }

    const nuevoGasto = {
      categoria: categoriaSeleccionada,
      monto: montoNumero,
      descripcion,
      fecha: new Date(),
    };

    addExpense(nuevoGasto);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Video 
        source={require('../assets/videopiola.mp4')} 
        style={styles.backgroundVideo}
        isMuted
        isLooping
        resizeMode="cover" 
        shouldPlay
      />
      <View style={styles.overlay}>
        <Text style={styles.titulo}>Agregar Gasto</Text>

        {/* Muestra el color de la categoría seleccionada */}
        <TouchableOpacity
          style={[styles.categoriaButton, { backgroundColor: colorSeleccionado }]}
        >
          <Text style={styles.categoriaText}>{categoriaSeleccionada}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.categoriaButton, { backgroundColor: colorSeleccionado }]}
        >
          <Text style={styles.categoriaText}>{categoriaSeleccionada}</Text>
        </TouchableOpacity>

        {/* Picker para seleccionar la categoría */}
        <Picker
          selectedValue={categoriaSeleccionada}
          onValueChange={handleCategoriaChange}
          style={styles.picker}
        > 
          {initialCategories.map(cat => (
            <Picker.Item key={cat.id} label={cat.name} value={cat.name} />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Monto"
          keyboardType="numeric"
          value={monto}
          onChangeText={setMonto}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción (opcional)"
          value={descripcion}
          onChangeText={setDescripcion}
        />
        <Button title="Agregar Gasto" onPress={handleAgregarGasto} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    borderRadius: 10,
  },
  titulo: {
    fontSize: 26,
    marginBottom: 24,
    color: '#2c7da0',
    fontWeight: 'bold',
  },
  categoriaButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  categoriaText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    borderRadius: 10,
  },
});

export default AgregarGastos;
