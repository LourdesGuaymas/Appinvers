import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
export default function PagosHabituales() {
    const [pagos, setPagos] = useState([]);
    const [nuevoPago, setNuevoPago] = useState('');

    const agregarPago = () => {
        if (nuevoPago.trim() !== '') {
            setPagos([...pagos, { key: Math.random().toString(), pago: nuevoPago }]);
            setNuevoPago('');
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
            <Text style={styles.title}>Pagos Habituales</Text>
            <TextInput
                placeholder="Añadir nuevo pago"
                style={styles.input}
                value={nuevoPago}
                onChangeText={setNuevoPago}
            />
            <Button title="Agregar Pago" onPress={agregarPago} />

            <FlatList
                data={pagos}
                renderItem={({ item }) => (
                    <View style={styles.pagoItem}>
                        <Text>{item.pago}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'  ,
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
        zIndex: 0},
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    pagoItem: {
        padding: 15,
        backgroundColor: 'lightgray',
        marginVertical: 5,
        borderRadius: 5,
    },
});
