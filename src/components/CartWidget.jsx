import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { useCart} from '../context/CartContext'; 
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import Cart from './Cart';
const CartWidget = () => {
  const { state } = useCart();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCartClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Button onClick={handleCartClick} variant="ghost">
        <FontAwesomeIcon icon={faShoppingBasket} className="me-2" />
        <span className="badge bg-primary">{state.cartItems.length}</span>
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contenido del Carrito</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Cart isCartModalOpen={isModalOpen} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CartWidget;
