import React from 'react';
import { View, Dimensions, Text, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useExpenses } from '../Almacenamiento/ExpensesContext';

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
  { id: '11', name: 'Hogar', icon: 'home-outline', color: '#ffa07a' },
  { id: '12', name: 'Mascotas', icon: 'paw-outline', color: '#ffb6c1' },
  { id: '13', name: 'Tecnología', icon: 'laptop-outline', color: '#add8e6' },
  { id: '14', name: 'Cuidado Personal', icon: 'heart-outline', color: '#ff7f50' },
  { id: '15', name: 'Regalos', icon: 'gift-outline', color: '#ffe4e1' },
];

const GastosPorCategoria = () => {
  const { expenses } = useExpenses();

  const chartData = initialCategories.map(category => {
    const items = expenses[category.name] || [];
    const totalAmount = items.reduce((sum, item) => sum + item.monto, 0);
    const count = items.length;

    return {
      name: category.name,
      population: totalAmount,
      count: count, // Cantidad de gastos en la categoría
      color: category.color,
    };
  }).filter(data => data.population > 0); // Filtra las categorías con 0 gastos

  const totalGastos = chartData.reduce((sum, item) => sum + item.population, 0);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/fondoFinal.jpg')} // Imagen de fondo
        style={styles.imageBackground}
        resizeMode="cover"
      >
        {/* Título que muestra el total de gastos */}
        <Text style={styles.totalText}>
          Total Gastos: ${totalGastos}
        </Text>

        <PieChart
          data={chartData}
          width={Dimensions.get('window').width}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />

        {/* Lista de porcentajes y conteo */}
        <FlatList
          data={chartData}
          keyExtractor={item => item.name}
          renderItem={({ item }) => {
            const porcentaje = ((item.population / totalGastos) * 100).toFixed(2);
            return (
              <View style={[styles.itemContainer, { backgroundColor: item.color }]}>
                <Text style={styles.itemText}>
                  {item.name}: {porcentaje}% - {item.count} gasto(s)
                </Text>
              </View>
            );
          }}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#fff',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  
  totalText: {
    marginTop:40,
    fontSize: 20,
    color: '#fff', // Color blanco para el texto del total
    fontWeight: 'bold', // Texto en negrita
    textAlign: 'center', // Centrar el texto
    marginBottom: 10, // Margen inferior para separar del gráfico
  },
  itemContainer: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 4,
    marginHorizontal: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#fff', // Cambia el color del texto a blanco para mayor legibilidad
    fontWeight: 'bold', // Establece el texto como negrita
  },
});

export default GastosPorCategoria;
