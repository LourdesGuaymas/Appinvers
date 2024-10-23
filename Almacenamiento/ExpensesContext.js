import React, { createContext, useState, useContext } from 'react';

const ExpensesContext = createContext();

export const useExpenses = () => {
  return useContext(ExpensesContext);
};

export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState({});

  const addExpense = (nuevoGasto) => {
    const { categoria } = nuevoGasto;
    setExpenses(prev => ({
      ...prev,
      [categoria]: [...(prev[categoria] || []), nuevoGasto],
    }));
  };

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
};
