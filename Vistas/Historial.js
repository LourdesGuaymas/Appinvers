import React from 'react';
import { View, Text, StyleSheet, Video, TouchableOpacity, ScrollView } from 'react-native';
import { Video as ExpoVideo } from 'expo-av'; // Asegúrate de importar correctamente el componente Video de Expo

export default function Historial({ route, navigation }) {
    const { expenses = [], income = [] } = route.params || {};
    
    return (
        <View style={styles.container}>
            {/* Video de fondo */}
            <ExpoVideo 
                source={require('../assets/videopiola.mp4')} // Asegúrate de que la ruta sea correcta
                style={styles.backgroundVideo}
                isMuted
                isLooping
                resizeMode="cover" 
                shouldPlay
            />
            {/* Capa de overlay para oscurecer un poco el video */}
            <View style={styles.overlay} />

            <Text style={styles.title}>Historial de Transacciones</Text>
            
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.subTitle}>Gastos:</Text>
                {expenses.length > 0 ? (
                    expenses.map((amount, index) => (
                        <Text key={index} style={styles.amountText}>- ${amount.toFixed(2)}</Text>
                    ))
                ) : (
                    <Text style={styles.noDataText}>No hay gastos registrados.</Text>
                )}

                <Text style={styles.subTitle}>Ingresos:</Text>
                {income.length > 0 ? (
                    income.map((amount, index) => (
                        <Text key={index} style={styles.amountText}>+ ${amount.toFixed(2)}</Text>
                    ))
                ) : (
                    <Text style={styles.noDataText}>No hay ingresos registrados.</Text>
                )}
            </ScrollView>

            {/* Botón para ir a Gastos por Categoría */}
            <TouchableOpacity
                style={styles.categoryButton}
                onPress={() => navigation.navigate('GastosPorCategoria')}
            >
                <Text style={styles.categoryButtonText}>Ver Gastos por Categoría</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative', // Para superponer el video correctamente
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // Coloca el video en el fondo
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Oscurece el video para mejorar la legibilidad
        zIndex: 0, // Coloca el overlay justo encima del video
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff', // Color blanco para mejor visibilidad
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 20, // Añade margen superior para despejar el título del borde superior
        zIndex: 1, // Asegura que el texto esté por encima del overlay
    },
    scrollContainer: {
        flexGrow: 1,
        zIndex: 1, // Para que el contenido esté por encima del overlay
    },
    subTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffcccb', // Color claro para mejor visibilidad
        marginVertical: 10,
        marginLeft: 10,
    },
    amountText: {
        fontSize: 18,
        marginLeft: 10,
        color: '#ffffff', // Texto blanco
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    noDataText: {
        fontSize: 16,
        color: '#ffffff', // Texto blanco
        marginLeft: 10,
    },
    categoryButton: {
        backgroundColor: '#6200ea', // Color violeta
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 20,
        alignItems: 'center',
        zIndex: 1, // Botón sobre el video
        alignSelf: 'center', // Centra el botón horizontalmente
        width: '80%', // Hace el botón más grande
    },
    categoryButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
