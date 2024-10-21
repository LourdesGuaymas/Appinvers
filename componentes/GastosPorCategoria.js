// componentes/GastosPorCategoria.js
import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useExpenses } from '../Almacenamiento/ExpensesContext'; // Asegúrate de que la ruta sea correcta

const GastosPorCategoria = () => {
  const { expenses } = useExpenses();
  
  // Prepara los datos para el gráfico
  const chartData = Object.entries(expenses).map(([category, items]) => ({
    name: category,
    population: items.length, // Cambia esto si quieres mostrar otra métrica
    color: `#${Math.floor(Math.random()*16777215).toString(16)}`, // Color aleatorio
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

  return (
    <View>
      <Text>Gastos por categoría:</Text>
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
        absolute // Si deseas mostrar valores absolutos
      />
    </View>
  );
};

export default GastosPorCategoria;
