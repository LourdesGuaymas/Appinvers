import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto para los gastos y los ingresos
const ExpensesContext = createContext();

// Hook para usar el contexto fácilmente
export const useExpenses = () => {
  return useContext(ExpensesContext);
};

// Proveedor del contexto que manejará los gastos, ingresos y la lógica de agregar un gasto o ingreso
export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState({}); // Inicializamos los gastos como un objeto vacío
  const [income, setIncome] = useState([]);     // Inicializamos los ingresos como un array vacío

  // Función para agregar un nuevo gasto categorizado
  const addExpense = (nuevoGasto) => {
    const { categoria } = nuevoGasto; // Extraemos la categoría del gasto

    // Actualizamos los gastos manteniendo las categorías previas y agregando el nuevo gasto
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [categoria]: [...(prevExpenses[categoria] || []), nuevoGasto], // Si ya hay gastos en esa categoría, los agregamos al array, sino creamos uno nuevo
    }));
  };

  // Función para agregar un nuevo ingreso
  const addIncome = (nuevoIngreso) => {
    setIncome((prevIncome) => [...prevIncome, nuevoIngreso]); // Simplemente agregamos el nuevo ingreso al array
  };

  // Proveemos el estado de los gastos, ingresos y las funciones para agregar nuevos datos
  return (
    <ExpensesContext.Provider value={{ expenses, addExpense, income, addIncome }}>
      {children}
    </ExpensesContext.Provider>
  );
};
