import { StyleSheet, Text, View } from 'react-native';
import SegundoComponente from './SegundoComponente';
import Btn from './Btn';

export default function PrimerComponente({navigation}) {
    return(
      <>
        <View style={styles.container}>
        <Text>React Native 2024</Text>    
        
        </View>
        <View style={styles.otroContainer}>
          <Text>Otro textooo</Text>
        </View>
        <View>
       
        </View>
      </>
    );
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    },
    otroContainer:{
      flex:1,
      backgroundColor:'green'
    },
    unContenedorMas : {
      flex: 1,
      backgroundColor: 'green'
    }
  });