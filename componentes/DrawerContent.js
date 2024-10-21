// // DrawerContent.js
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const DrawerContent = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Menú</Text>
//       <TouchableOpacity onPress={() => navigation.navigate('Grafico')} style={styles.item}>
//         <Text>Gráfico</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate('Categorias')} style={styles.item}>
//         <Text>Categorías</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate('PagosHabituales')} style={styles.item}>
//         <Text>Pagos Habituales</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   item: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
// });

// export default DrawerContent;
