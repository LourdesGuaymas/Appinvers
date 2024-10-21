// Almacenamiento/ExpensesContext.js
import React, { createContext, useContext, useState } from 'react';

const ExpensesContext = createContext();

export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState({});

  const addExpense = (nuevoGasto) => {
    if (!nuevoGasto.categoria || isNaN(nuevoGasto.monto)) {
      console.error('Datos inválidos para agregar gasto:', nuevoGasto);
      return;
    }

    setExpenses((prev) => {
      const { categoria } = nuevoGasto;
      const newItems = prev[categoria] ? [...prev[categoria], nuevoGasto] : [nuevoGasto];
      return { ...prev, [categoria]: newItems };
    });
  };

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpensesContext);
