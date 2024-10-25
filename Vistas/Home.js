import React, { useState } from 'react';
import { View, Text, StatusBar, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
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
            }
            setAmount('');
        }
    };

    return (
        <ImageBackground source={require('../assets/fondoFinal.jpg')} style={{ flex: 1, resizeMode: 'cover' }}>
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(1, 0, 0, 0.3)', zIndex: 0 }} />
            <StatusBar barStyle="light-content" />

            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20, backgroundColor: 'rgba(255, 213, 200, 0.0)', borderRadius: 6, paddingVertical: 20, width: '100%', elevation: 5, height: 250, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 40, color: 'rgba(109, 165, 160, 0.8)', marginBottom: 15, borderWidth: 1, borderColor: 'rgba(956, 98, 106, 0.8)', padding: 10, borderRadius: 5, backgroundColor: 'rgba(255, 255, 255, 0.0)' }}>
                    Total: ${income.reduce((a, b) => a + b.monto, 0) - expenses.reduce((a, b) => a + b.monto, 0)}
                </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <TouchableOpacity 
                        style={{ padding: 16, backgroundColor: 'rgba(44, 125, 160, 0.7)', borderRadius: 10, flex: 1, marginHorizontal: 5, alignItems: 'center', elevation: 3, height: 55, marginBottom: -70, backgroundColor: transactionType === 'Gastos' ? 'rgba(1, 58, 99, 0.7)' : 'rgba(44, 125, 160, 0.7)' }} 
                        onPress={() => {
                            setTransactionType('Gastos');
                            navigation.navigate('Categorias');
                        }}
                    >
                        <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 18, fontWeight: '600' }}>Gastos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{ padding: 16, backgroundColor: 'rgba(44, 125, 160, 0.7)', borderRadius: 10, flex: 1, marginHorizontal: 5, alignItems: 'center', elevation: 3, height: 55, marginBottom: -70, backgroundColor: transactionType === 'Ingresos' ? 'rgba(1, 58, 99, 0.7)' : 'rgba(44, 125, 160, 0.7)' }} 
                        onPress={() => setTransactionType('Ingresos')}
                    >
                        <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 18, fontWeight: '600' }}>Ingresos</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={{ textShadowRadius: 2, fontSize: 26, color: 'rgba(70, 143, 175, 0.9)', width: 300, fontWeight: 'bold', marginLeft: 28, padding: 10, marginBottom: -20 }}>Ingrese un monto</Text>

            {transactionType === 'Ingresos' && (
                <TextInput
                    placeholder="Ingresa el monto (ingreso)"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                    style={{ width: '85%', marginLeft: 33, height: 50, borderColor: 'rgba(28, 109, 65, 0.7)', borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, marginTop: 20, backgroundColor: 'white', fontSize: 16 }} // Changed backgroundColor to white
                />
            )}

            <TouchableOpacity style={{ backgroundColor: 'rgba(70, 143, 175, 0.7)', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 20, marginTop: 20, alignItems: 'center', width: '70%', marginLeft: 65, elevation: 3 }} onPress={handleConfirm}>
                <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 18, fontWeight: 'bold' }}>Confirmar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={{ backgroundColor: 'rgba(1, 42, 74, 0.7)', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 20, marginTop: 10, alignItems: 'center', width: '70%', marginLeft: 65, elevation: 3 }} 
                onPress={() => navigation.navigate('Historial', { expenses, income })}
            >
                <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 18, fontWeight: 'bold' }}>Ver Historial</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}
