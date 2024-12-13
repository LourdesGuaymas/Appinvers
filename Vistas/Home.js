import React, { useState } from 'react';
import { View, Text, StatusBar, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();
    const [amount, setAmount] = useState('');
    const [transactionType, setTransactionType] = useState('Ingresos');
    const [expenses, setExpenses] = useState([]);
    const [income, setIncome] = useState([]);

    const handleConfirm = () => {
        const numericAmount = parseFloat(amount);
        if (!isNaN(numericAmount)) {
            if (transactionType === 'Ingresos') {
                setIncome(prevIncome => [...prevIncome, { monto: numericAmount }]);
            } else if (transactionType === 'Gastos') {
                setExpenses(prevExpenses => [...prevExpenses, { monto: numericAmount }]);
            }
            setAmount('');
        }
    };

    const totalBalance = income.reduce((a, b) => a + b.monto, 0) - expenses.reduce((a, b) => a + b.monto, 0);

    return (
        <ImageBackground  style={styles.backgroundImage}>
            <View style={styles.overlay} />
            <StatusBar barStyle="light-content" />

            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: ${totalBalance}</Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.transactionButton, transactionType === 'Gastos' && styles.activeButton]} 
                        onPress={() => {
                            setTransactionType('Gastos');
                            navigation.navigate('Categorias');
                        }}
                    >
                        <Text style={styles.buttonText}>Gastos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.transactionButton, transactionType === 'Ingresos' && styles.activeButton]} 
                        onPress={() => setTransactionType('Ingresos')}
                    >
                        <Text style={styles.buttonText}>Ingresos</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.inputLabel}>Ingrese un monto</Text>

            <TextInput
                placeholder={`Ingresa el monto (${transactionType.toLowerCase()})`}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={styles.input}
            />

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.historyButton} 
                onPress={() => navigation.navigate('Historial', { expenses, income })}
            >
                <Text style={styles.buttonText}>Ver Historial</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        backgroundColor: '#272780',//azul clarito
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#272780',
    },
    totalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        paddingVertical: 20,
        width: '100%',
        height: 250,
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: 40,
        color: '#FFD700',
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    transactionButton: {
        padding: 16,
        backgroundColor: '#1B1B3A',
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
        elevation: 3,
        height: 55,
    },
    activeButton: {
        backgroundColor: '#FFD700',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    },
    inputLabel: {
        fontSize: 20,
        color: '#FFD700',
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 20,
    },
    input: {
        width: '85%',
        marginHorizontal: 20,
        height: 50,
        borderColor: '#FFD700',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginTop: 10,
        backgroundColor: '#FFF',
        fontSize: 16,
    },
    confirmButton: {
        backgroundColor: '#1B1B3A',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 20,
        alignItems: 'center',
        width: '70%',
        alignSelf: 'center',
        elevation: 3,
    },
    historyButton: {
        backgroundColor: '#272763',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 10,
        alignItems: 'center',
        width: '70%',
        alignSelf: 'center',
        elevation: 3,
    },
});
