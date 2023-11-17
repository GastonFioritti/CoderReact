import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import ItemList from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </Router>
    </ChakraProvider>
  );
};

const AppContent = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<ItemList />} />
        <Route path='/category/:id' element={<ItemList />} />
        <Route path='/item/:id' element={<ItemDetailContainer />} />
      </Routes>
    </div>
  );
};

export default App;
