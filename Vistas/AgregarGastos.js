import React, { useState } from 'react';
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
  
  if (!categoria) {
    alert('Categoría no disponible.');
    navigation.goBack();
    return;
  }

  const initialCategory = initialCategories.find(cat => cat.name === categoria);
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoria); 
  const [colorSeleccionado, setColorSeleccionado] = useState(initialCategory ? initialCategory.color : '#000');

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

  const handleCategoriaChange = (itemValue) => {
    setCategoriaSeleccionada(itemValue);
    const selectedCategory = initialCategories.find(cat => cat.name === itemValue);
    if (selectedCategory) {
      setColorSeleccionado(selectedCategory.color);
    }
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
        <Text style={styles.titulo}>Agregar Gasto</Text>

        <TouchableOpacity
          style={[styles.categoriaButton, { backgroundColor: colorSeleccionado }]}
        >
          <Text style={styles.categoriaText}>{categoriaSeleccionada}</Text>
        </TouchableOpacity>

        
           

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
    justifyContent: 'center', // Centra verticalmente los elementos
    alignItems: 'center', // Centra horizontalmente los elementos
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
    alignItems: 'center', // Centra los elementos en la vista
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.0)', // Aumenta un poco la opacidad del fondo
    borderRadius: 10,
  },
  titulo: {
    fontSize: 26,
    marginBottom: 24, // Más espacio debajo del título
    color: '#2c7da0',
    fontWeight: 'bold',
  },
  categoriaButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%', // Aumenta el ancho del botón
    marginBottom: 20, // Aumenta la separación entre los elementos
    backgroundColor: '#4682b4', // Color de ejemplo
  },
  categoriaText: {
    color: '#fff', // Blanco para mejor visibilidad
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    width: '80%', // Aumenta el ancho del input
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20, // Más espacio entre los inputs
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    borderRadius: 10, // Redondea los bordes de los inputs
  },
  button: {
    marginTop: 20,
    width: '80%', // Aumenta el ancho del botón
    borderRadius: 38,
  },
});

export default AgregarGastos;
