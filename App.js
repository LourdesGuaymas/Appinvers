import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Importa tus pantallas
import Register from './Vistas/Register'; 
import Login from './Vistas/Login';
import PerfilUsuario from './Vistas/PerfilUsuario';
import Home from './Vistas/Home';
import Categorias from './Vistas/Categorias';
import AgregarGastos from './Vistas/AgregarGastos';
import Historial from './Vistas/Historial';
import CrearCategoria from './Vistas/CrearCategoria';
import ValoracionApp from './Vistas/ValoracionApp';
import GastosPorCategoria from './Vistas/GastosPorCategoria';
import { ExpensesProvider } from './Almacenamiento/ExpensesContext';

const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const rotateValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Animated.Image
          source={require('./assets/costo.gif')}
          style={styles.loadingIcon} 
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <ExpensesProvider>
      <NavigationContainer>
        <Drawer.Navigator 
      
          drawerStyle={styles.drawerStyle} 
          screenOptions={{ headerShown: false }} // Para ocultar el header del Drawer
        >
          {/* Aquí estamos usando el Tab Navigator en el Drawer */}
          <Drawer.Screen name="MainTabs" component={MainTabs} />

          {/* Otras pantallas del Drawer */}
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Register" component={Register} />
          <Drawer.Screen name="Historial" component={Historial} />
          <Drawer.Screen name="AgregarGastos" component={AgregarGastos} />
          <Drawer.Screen name="CrearCategoria" component={CrearCategoria} />
          <Drawer.Screen name="ValoracionAppScreen" component={ValoracionApp} />
          <Drawer.Screen name="GastosPorCategoriaScreen" component={GastosPorCategoria} />
        </Drawer.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </ExpensesProvider>
  );
}

// Tab Navigator para las pestañas
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      activeColor="#a6d7dd"
      barStyle={{ backgroundColor: '#013a63' }} // Color de fondo de la barra de pestañas
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color="#89c2d9" size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Categorias"///cambiado
        component={Categorias}
        options={{
          tabBarLabel: 'Categorias',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="folder" color="#89c2d9" size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="PerfilUsuario"
        component={PerfilUsuario}
        options={{
          tabBarLabel: 'Perfil Usuario',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color="#89c2d9" size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}



const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingIcon: {
    width: 150,
    height: 150,
  },
  drawerStyle: {
    backgroundColor: '#ffab92', // Color de fondo del drawer
  },
});
