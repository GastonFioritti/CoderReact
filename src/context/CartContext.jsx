import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const initialState = {
    cartItems: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          cartItems: state.cartItems.filter((item) => item.id !== action.payload),
        };
      case 'CLEAR_CART':
        return {
          ...state,
          cartItems: [],
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }
  return context;
};

const removeFromCartContext = (dispatch, itemId) => {
  dispatch({
    type: 'REMOVE_FROM_CART',
    payload: itemId,
  });
};

export { CartProvider, useCart, removeFromCartContext };
