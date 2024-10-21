import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
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
  const { categoria } = route.params; // Obtener la categoría inicial desde los parámetros
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoria); // Estado para la categoría seleccionada
  const [colorSeleccionado, setColorSeleccionado] = useState(initialCategories.find(cat => cat.name === categoria).color); // Estado para el color

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
    setColorSeleccionado(selectedCategory.color); // Cambiar el color al seleccionar una categoría
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Agregar Gasto</Text>

      {/* Mostrar la categoría seleccionada */}
      <TouchableOpacity
        style={[styles.categoriaButton, { backgroundColor: colorSeleccionado }]} // Usar el color seleccionado
      >
        <Text style={styles.categoriaText}>{categoriaSeleccionada}</Text>
      </TouchableOpacity>

      {/* Picker para seleccionar categoría */}
      <Text style={styles.label}>Selecciona una Categoría:</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 16,
  },
  categoriaButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoriaText: {
    color: '#fff',
    fontSize: 18,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default AgregarGastos;
