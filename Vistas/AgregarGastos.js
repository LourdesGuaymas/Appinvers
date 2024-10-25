import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
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

  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(initialCategories[0].name);
  const [colorSeleccionado, setColorSeleccionado] = useState(initialCategories[0].color);

  // useEffect to update selected category when the prop changes
  useEffect(() => {
    const initialCategory = initialCategories.find(cat => cat.name === categoria);
    if (initialCategory) {
      setCategoriaSeleccionada(initialCategory.name);
      setColorSeleccionado(initialCategory.color);
    } else {
      setCategoriaSeleccionada(initialCategories[0].name);
      setColorSeleccionado(initialCategories[0].color);
    }
  }, [categoria]); // Dependency on categoria

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
    <View style={{ flex: 1, position: 'relative' }}>
      <ImageBackground 
        source={require('../assets/fondoFinal.jpg')} 
        style={{ flex: 1, justifyContent: 'center', width: '100%', height: '100%' }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', padding: 20, backgroundColor: 'rgba(255, 255, 255, 0.0)', borderRadius: 10 }}>
          <Text style={{ fontSize: 32, marginBottom: 24, color: '#2c7da0', fontWeight: 'bold' }}>
            Agregar Gasto
          </Text>

          <TouchableOpacity
            style={[{ height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', width: '80%', marginBottom: 20, backgroundColor: colorSeleccionado }]}
          >
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{categoriaSeleccionada}</Text>
          </TouchableOpacity>

          <Picker
            selectedValue={categoriaSeleccionada}
            onValueChange={handleCategoriaChange}
            style={{ height: 50, width: '80%', marginBottom: 20, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
          >
            {initialCategories.map(cat => (
              <Picker.Item key={cat.id} label={cat.name} value={cat.name} />
            ))}
          </Picker>

          <TextInput
            style={{
              height: 50,
              width: '80%',
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 20,
              paddingHorizontal: 15,
              backgroundColor: '#fff',
              fontSize: 16,
              borderRadius: 10,
            }}
            placeholder="Monto"
            keyboardType="numeric"
            value={monto}
            onChangeText={setMonto}
          />
          <TextInput
            style={{
              height: 50,
              width: '80%',
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 20,
              paddingHorizontal: 15,
              backgroundColor: '#fff',
              fontSize: 16,
              borderRadius: 10,
            }}
            placeholder="Descripción (opcional)"
            value={descripcion}
            onChangeText={setDescripcion}
          />
          <TouchableOpacity 
            style={{
              backgroundColor: '#2c7da0',
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 8,
              alignItems: 'center',
              marginVertical: 10,
            }} 
            onPress={handleAgregarGasto}
          >
            <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>Agregar Gasto</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default AgregarGastos;
