import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, Button, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();
    const [amount, setAmount] = useState('');
    const [transactionType, setTransactionType] = useState('Gastos');
    const [expenses, setExpenses] = useState([]);
    const [income, setIncome] = useState([]);

    const handleConfirm = () => {
        const numericAmount = parseFloat(amount);
        if (!isNaN(numericAmount)) {
            if (transactionType === 'Gastos') {
                setExpenses([...expenses, numericAmount]);
            } else {
                setIncome([...income, numericAmount]);
            }
            setAmount('');
        }
    };

    return (
        <View style={styles.container}>
            <Video
                source={require('./fondo.mp4')}
                style={styles.video}
                isMuted
                isLooping
                resizeMode="cover"
                shouldPlay
            />
            <View style={styles.bgOverlay}></View>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <Text style={styles.totalText}>Total: ${income.reduce((a, b) => a + b, 0) - expenses.reduce((a, b) => a + b, 0)}</Text>
                <View style={styles.menu}>
                    <TouchableOpacity 
                        style={[styles.menuButton, transactionType === 'Gastos' && styles.activeMenuButton]} 
                        onPress={() => setTransactionType('Gastos')}
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

            <TextInput
                placeholder={`Ingresa el monto (${transactionType})`}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={styles.input}
            />

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
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '130%',
        height: '120%',
        zIndex: -4,
    },
    bgOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '120%',
        height: '120%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 0,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        elevation: 5,
    },
    totalText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#6200ee',
        marginBottom: 10,
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    menuButton: {
        padding: 10,
        backgroundColor: '#6200ee',
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    activeMenuButton: {
        backgroundColor: '#3700b3',
    },
    menuButtonText: {
        color: 'white',
        fontSize: 16,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#6200ee',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 20,
        backgroundColor: '#fff',
    },
    confirmButton: {
        backgroundColor: '#6200ee',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
        alignItems: 'center',
        width: '100%',
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 18,
    },
    historyButton: {
        backgroundColor: '#f50057',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        alignItems: 'center',
        width: '100%',
    },
    historyButtonText: {
        color: 'white',
        fontSize: 18,
    },
});
