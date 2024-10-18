import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropdownMenu from './DropdownMenu'; 

const ConfiguracionScreen = () => {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <View style={styles.container}>
      <Text>Configuración</Text>
      <DropdownMenu
        items={['Opción 1', 'Opción 2', 'Opción 3']}
        selectedValue={selectedValue}
        onSelect={setSelectedValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
 
});

export default ConfiguracionScreen;
