import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import ItemList from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path='/' element={<ItemList />} />
            <Route path='/category/:id' element={<ItemList />} />
            <Route path='/item/:id' element={<ItemDetailContainer />} />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
};

export default App;
