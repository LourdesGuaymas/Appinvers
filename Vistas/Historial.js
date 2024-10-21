
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function Historial({ route, navigation }) {
    const { expenses = [100], income = [] } = route.params || {};
    
    // Agrupando gastos por categorías (ejemplo estático)
    const expensesByCategory = {
        Comida: 200,
        Transporte: 100,
        Entretenimiento: 150,
        Salud: 50,
        // Añade más categorías según sea necesario
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historial de Transacciones</Text>
            
            <Text style={styles.subTitle}>Gastos:</Text>
            {expenses.length > 0 ? (
                expenses.map((amount, index) => (
                    <Text key={index} style={styles.amountText}>- ${amount.toFixed(2)}</Text>
                ))
            ) : (
                <Text>No hay gastos registrados.</Text>
            )}

            <Text style={styles.subTitle}>Ingresos:</Text>
            {income.length > 0 ? (
                income.map((amount, index) => (
                    <Text key={index} style={styles.amountText}>+ ${amount.toFixed(2)}</Text>
                ))
            ) : (
                <Text>No hay ingresos registrados.</Text>
            )}

            {/* Botón para ir a Gastos por Categoría */}
            <Button
                title="Ver Gastos por Categoría"
                onPress={() => navigation.navigate('GastosPorCategoria', { expensesByCategory })}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    amountText: {
        fontSize: 16,
        marginLeft: 10,
    },
});
