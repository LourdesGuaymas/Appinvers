import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { useExpenses } from '../Almacenamiento/ExpensesContext';

const initialCategories = [
  // Tus categorías aquí
];

const Historial = ({ navigation }) => {
  const { expenses, income } = useExpenses();

  const chartData = initialCategories.map(category => {
    const items = expenses[category.name] || [];
    const totalAmount = items.reduce((sum, item) => sum + item.monto, 0);

    return {
      name: category.name,
      population: totalAmount,
      color: category.color,
    };
  }).filter(data => data.population > 0);

  const totalIngresos = Array.isArray(income) ? income.reduce((sum, item) => sum + item.monto, 0) : 0;

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderRadius: 5, marginVertical: 4, marginHorizontal: 10, backgroundColor: item.color }}>
      <Text style={{ fontSize: 16, color: '#fff' }}>
        {item.name}: ${item.population.toFixed(2)}
      </Text>
    </View>
  );

  return (
    <ImageBackground source={require('../assets/fondoFinal.jpg')} style={{ flex: 1, resizeMode: 'cover' }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={chartData}
          keyExtractor={item => item.name}
          ListHeaderComponent={() => (
            <>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginVertical: 20 }}>
                Historial de Transacciones
              </Text>
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#fff', marginVertical: 10, textAlign: 'center' }}>
                Gastos:
              </Text>
            </>
          )}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <Text style={{ fontSize: 16, color: '#ccc', textAlign: 'center', marginVertical: 10 }}>
              No hay gastos registrados por categoría.
            </Text>
          )}
          contentContainerStyle={{ paddingBottom: 60 }}
        />

        {/* Mostrar total de ingresos */}
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#fff', marginTop: 10, textAlign: 'center' }}>
          Ingresos Totales:
        </Text>
        <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center', marginVertical: 10 }}>
          + ${totalIngresos > 0 ? totalIngresos.toFixed(2) : '0.00'}
        </Text>

        {/* Botón para ir a la vista GastosPorCategoria */}
        <TouchableOpacity
          style={{ backgroundColor: '#2c7da0', borderRadius: 5, padding: 15, margin: 20, alignItems: 'center' }}
          onPress={() => navigation.navigate('GastosPorCategoriaScreen')}
        >
          <Text style={{ color: '#fff', fontSize: 18 }}>
            Ver Gastos por Categoría
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Historial;
