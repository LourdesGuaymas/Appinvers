import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();
    const [amount, setAmount] = useState('');
    const [transactionType, setTransactionType] = useState('Ingresos'); // Inicialmente solo ingresos
    const [expenses, setExpenses] = useState([]);
    const [income, setIncome] = useState([]);

    const handleConfirm = () => {
        const numericAmount = parseFloat(amount);
        if (!isNaN(numericAmount)) {
            if (transactionType === 'Ingresos') {
                setIncome([...income, numericAmount]);
            }
            setAmount('');
        }
    };

    return (
        <View style={styles.container}>
            <Video
                source={require('../assets/videopiola.mp4')}
                style={styles.video}
                isMuted
                isLooping
                resizeMode="cover"
                shouldPlay
            />
            <View style={styles.bgOverlay}></View>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <Text style={styles.totalText}>
                    Total: ${income.reduce((a, b) => a + b, 0) - expenses.reduce((a, b) => a + b, 0)}
                </Text>
                <View style={styles.menu}>
                    <TouchableOpacity 
                        style={[styles.menuButton, transactionType === 'Gastos' && styles.activeMenuButton]} 
                        onPress={() => {
                            setTransactionType('Gastos');
                            navigation.navigate('Categorias');
                        }}
                    >
                        <Text style={styles.menuButtonText}>Gastos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.menuButton, transactionType === 'Ingresos' && styles.activeMenuButton]} 
                        onPress={() => setTransactionType('Ingresos')}
                    >
                        <Text style={styles.menuButtonText}>Ingresos</Text>
                    </TouchableOpacity>
                </View>
            </View>
<Text style={styles.Text}>Ingrese un monto</Text>
            {/* Solo mostrar el input para ingresos */}
            {transactionType === 'Ingresos' && (
                <TextInput
                    placeholder="Ingresa el monto (ingreso)"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                    style={styles.input}
                />
            )}

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.historyButton} 
                onPress={() => navigation.navigate('Historial', { expenses, income })}
            >
                <Text style={styles.historyButtonText}>Ver Historial</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: 'rgba(227, 227, 227, 0.8)', // Fondo más transparente
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
    },
    bgOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Capa de fondo más transparente
        zIndex: 0,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        backgroundColor: 'rgba(255, 213, 200, 0.2)', // Semi-transparente ajustado
        borderRadius: 6,
        paddingVertical: 20,
        width: '100%',
        elevation: 5,
        
        height: 250,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    totalText: {
        fontSize: 40,
        color: 'rgba(44, 125, 160, 0.8)', // Texto con más transparencia
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(256, 128, 96, 0.8)', // Borde más transparente
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.0)', // Fondo del total
    },
    Text: {
        textShadowRadius: 2,
        
        fontSize: 26,
        color: 'rgba(70, 143, 175, 0.9)', // Texto con más transparencia
        width: 300,
        
      
        marginRight: 88,
        padding: 10,
        marginBottom: -20,
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    menuButton: {
        padding: 15,
        backgroundColor: 'rgba(44, 125, 160, 0.7)', // Fondo del botón más transparente
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
        elevation: 3,
    },
    activeMenuButton: {
        backgroundColor: 'rgba(1, 58, 99, 0.7)', // Botón activo más transparente
    },
    menuButtonText: {
        color: 'rgba(255, 255, 255, 0.9)', // Texto del botón con más transparencia
        fontSize: 18,
        fontWeight: '600',
    },
    input: {
        width: '100%',
        height: 55,
        borderColor: 'rgba(28, 109, 65, 0.7)', // Borde del input más transparente
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginTop: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo del input más suave
        fontSize: 16,
    },
    confirmButton: {
        backgroundColor: 'rgba(70, 143, 175, 0.7)', // Fondo del botón de confirmar más transparente
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 20,
        alignItems: 'center',
        width: '100%',
        elevation: 3,
    },
    confirmButtonText: {
        color: 'rgba(255, 255, 255, 0.9)', // Texto con más transparencia
        fontSize: 18,
        fontWeight: 'bold',
    },
    historyButton: {
        backgroundColor: 'rgba(1, 42, 74, 0.7)', // Botón de historial más transparente
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 10,
        alignItems: 'center',
        width: '100%',
        elevation: 3,
    },
    historyButtonText: {
        color: 'rgba(255, 255, 255, 0.9)', // Texto con más transparencia
        fontSize: 18,
        fontWeight: 'bold',
    },
});
