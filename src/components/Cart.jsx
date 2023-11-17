import React, { useState } from 'react';
import {
  Box,
  Text as ChakraText,
  Heading,
  Divider,
  Button,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons'; 
import Checkout from './Checkout';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { addOrderToFirestore } from '../context/firebaseFunctions';

const Cart = () => {
  const { state, dispatch } = useCart();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [isCheckoutModalOpen, setCheckoutModalOpen] = useState(false);

  const itemCounts = state.cartItems.reduce((acc, item) => {
    const normalizedFeatures = item.features
      ? Object.keys(item.features)
          .sort()
          .reduce((sortedFeatures, feature) => {
            sortedFeatures[feature] = item.features[feature];
            return sortedFeatures;
          }, {})
      : null;

    const key = `${item.id}-${JSON.stringify(normalizedFeatures)}`;

    if (acc[key]) {
      acc[key].quantity += item.quantity;
    } else {
      acc[key] = { ...item };
    }
    return acc;
  }, {});

  const uniqueItems = Object.values(itemCounts);

  const totalPrice = uniqueItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleBuyNow = () => {
    if (!firstName || !lastName || !phone || !email || email !== confirmEmail) {
      console.error('Por favor, completa todos los campos correctamente.');
      return;
    }

    setCheckoutModalOpen(true);
  };

  const handleCheckoutClose = async () => {
    setCheckoutModalOpen(false);

    try {
      const orderDetails = {
        firstName,
        lastName,
        phone,
        email,
        items: uniqueItems,
        totalPrice,
        date: new Date(),
      };

      const orderId = await addOrderToFirestore(orderDetails);
      console.log('Orden guardada en Firestore con ID:', orderId);
    } catch (error) {
      console.error('Error al guardar la orden en Firestore:', error);
    }
    dispatch({ type: 'CLEAR_CART' });
    Swal.fire({
      icon: 'success',
      title: '¡Compra confirmada!',
      text: 'Gracias por tu compra. Pronto recibirás tus productos.',
      customClass: {
        popup: 'my-swal-popup',
      },
    });
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
      {uniqueItems.map((item) => (
        <Box key={item.id} mb={4}>
          <Heading as="h3" size="md">
            {item.name}
          </Heading>
          <ChakraText>${item.price} x {item.quantity}</ChakraText>
          {item.features &&
            Object.keys(item.features).map((feature) => (
              <Box key={feature} ml={4} display="flex" alignItems="center">
                <CheckIcon color="green.500" mr={2} />
                <ChakraText>{`${feature}: ${item.features[feature]}`}</ChakraText>
              </Box>
            ))}
        </Box>
      ))}
      <Divider my={4} />
      <Box>
        <ChakraText fontWeight="bold">Total: ${totalPrice}</ChakraText>
        <Box mt={4}>
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input
              type="text"
              placeholder="Nombre"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Apellido</FormLabel>
            <Input
              type="text"
              placeholder="Apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Teléfono</FormLabel>
            <Input
              type="tel"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Confirmar Email</FormLabel>
            <Input
              type="email"
              placeholder="Confirmar Email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
          </FormControl>
        </Box>
        <Button onClick={handleBuyNow} colorScheme="blue" mt={4}>
          Comprar ahora
        </Button>
      </Box>

      {/* Modal de Checkout */}
      <Modal isOpen={isCheckoutModalOpen} onClose={handleCheckoutClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Resumen de la Orden de {firstName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Checkout items={uniqueItems} total={totalPrice} />
          </ModalBody>
          <Button
            mt={4}
            colorScheme="blue"
            onClick={() => {
              setCheckoutModalOpen(false);
              handleCheckoutClose();
            }}
          >
            Confirmar Compra
          </Button>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Cart;
