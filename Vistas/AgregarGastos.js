// AgregarGastos.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AgregarGastos = ({ route, navigation }) => {
  const { categoria } = route.params; // Asegúrate de obtener la categoría de los parámetros
  const [monto, setMonto] = useState('');

  const handleSave = async () => {
    if (!monto) {
      Alert.alert('Error', 'Por favor, ingresa un monto.');
      return;
    }

    const gasto = { categoria, monto: parseFloat(monto), fecha: new Date().toISOString() };

    try {
      const gastos = JSON.parse(await AsyncStorage.getItem('gastos')) || [];
      gastos.push(gasto);
      await AsyncStorage.setItem('gastos', JSON.stringify(gastos));
      Alert.alert('Éxito', 'Gasto guardado exitosamente');
      navigation.goBack(); // Volver a la pantalla anterior
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al guardar el gasto.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Gasto</Text>
      <Text style={styles.label}>Categoría: {categoria}</Text>
      <TextInput
        style={styles.input}
        placeholder="Monto"
        keyboardType="numeric"
        value={monto}
        onChangeText={setMonto}
      />
      <Button title="Guardar Gasto" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default AgregarGastos;
