import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Register from './Vistas/Register'; 
import Login from './Vistas/Login';
import Ajustes from './componentes/Ajustes';
import PerfilUsuario from './Vistas/PerfilUsuario';
import Home from './Vistas/Home';
import Categorias from './Vistas/Categorias';
import Historial from './Vistas/Historial';
import PagosHabituales from './Vistas/PagosHabituales';
import AgregarGastos from './Vistas/AgregarGastos';
import ValoracionApp from './Vistas/ValoracionApp';
import GastosPorCategoria from './componentes/GastosPorCategoria';
import LoadingIndicator from './componentes/LoadingIndicator';
import { ExpensesProvider } from './Almacenamiento/ExpensesContext'; // Asegúrate de que la ruta sea correcta

const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingIndicator />; // Mostrar LoadingIndicator
  }

  return (
    <ExpensesProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={MainTabs} />
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Register" component={Register} />
          <Drawer.Screen name="Ajustes" component={Ajustes} />
          <Drawer.Screen name="GastosPorCategoria" component={GastosPorCategoria} />
          <Drawer.Screen name="PerfilUsuario" component={PerfilUsuario} />
          <Drawer.Screen name="Historial" component={Historial} />
          <Drawer.Screen name="ValoracionApp" component={ValoracionApp} options={{ headerShown: true }} />
        </Drawer.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </ExpensesProvider>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'violet' }}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Categorias"
        component={Categorias}
        options={{
          tabBarLabel: 'Categorias',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="folder" color={color} size={26} />
          ),
        }}
      />
         <Tab.Screen
        name="AgregarGastos"
        component={AgregarGastos}
        options={{
          tabBarLabel: 'AgregarGastos',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="folder" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="PagosHabituales"
        component={PagosHabituales}
        options={{
          tabBarLabel: 'Pagos',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cash" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="PerfilUsuario"
        component={PerfilUsuario}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});