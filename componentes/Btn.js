import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Btn({ presionado, texto = "Boton por defecto" }) {
    return (
        <TouchableOpacity style={styles.boton} onPress={presionado}>
            <Text>{texto}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    boton: {
        padding: 10,
        backgroundColor: 'gray',
        width: 90,
        margin: 20,
    },
});
