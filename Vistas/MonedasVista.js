import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importar desde el paquete correcto

const MonedasVista = () => {
  const [monedas, setMonedas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [monto, setMonto] = useState('');
  const [monedaOrigen, setMonedaOrigen] = useState('ARS');
  const [monedaDestino, setMonedaDestino] = useState('USD');
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const respuesta = await fetch('https://open.er-api.com/v6/latest/USD');
        const datos = await respuesta.json();
        const monedasArray = Object.entries(datos.rates).map(([moneda, valor]) => ({
          moneda,
          valor,
        }));
        setMonedas(monedasArray);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, []);

  const convertirMoneda = () => {
    if (!monto || isNaN(monto)) {
      alert('Por favor, ingresa un monto válido.');
      return;
    }

    const tasaOrigen = monedas.find((item) => item.moneda === monedaOrigen)?.valor || 1;
    const tasaDestino = monedas.find((item) => item.moneda === monedaDestino)?.valor || 1;

    const resultadoConversion = (monto / tasaOrigen) * tasaDestino;
    setResultado(resultadoConversion.toFixed(2));
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Conversor de Monedas</Text>
      <View style={styles.conversor}>
        <TextInput
          style={styles.input}
          placeholder="Ingrese monto"
          placeholderTextColor="#ccc"
          keyboardType="numeric"
          value={monto}
          onChangeText={setMonto}
        />
        <Picker
          selectedValue={monedaOrigen}
          style={styles.picker}
          onValueChange={(itemValue) => setMonedaOrigen(itemValue)}
        >
          {monedas.map((item) => (
            <Picker.Item key={item.moneda} label={item.moneda} value={item.moneda} />
          ))}
        </Picker>
        <Picker
          selectedValue={monedaDestino}
          style={styles.picker}
          onValueChange={(itemValue) => setMonedaDestino(itemValue)}
        >
          {monedas.map((item) => (
            <Picker.Item key={item.moneda} label={item.moneda} value={item.moneda} />
          ))}
        </Picker>
        <Button title="Convertir" onPress={convertirMoneda} color="#FFD700" />
      </View>

      {resultado && (
        <Text style={styles.resultado}>
          {monto} {monedaOrigen} = {resultado} {monedaDestino}
        </Text>
      )}

      {cargando ? (
        <ActivityIndicator size="large" color="#FFD700" />
      ) : (
        <FlatList
          data={monedas}
          keyExtractor={(item) => item.moneda}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.moneda}>{item.moneda}</Text>
              <Text style={styles.valor}>{item.valor.toFixed(2)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1B1B3A', //azul de fondo oscuro
    
    
  },
  titulo: {marginTop:30,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700', // amarillo
    textAlign: 'center',
    marginBottom: 20,
  },
  conversor: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: '#FFFFFF',
    backgroundColor: '#272763',
  },
  picker: {
    color: '#FFD700',
    backgroundColor: '#272763',//azul clarito
    marginVertical: 5,
  },
  resultado: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#272763',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  moneda: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  valor: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});

export default MonedasVista;
