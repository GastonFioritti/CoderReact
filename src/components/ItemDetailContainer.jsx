import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Flex, Box, Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button, Select,
} from '@chakra-ui/react';
import { useCart } from '../context/CartContext';
import './styles.css';
import Swal from 'sweetalert2';

const ItemDetailContainer = () => {
  const { dispatch } = useCart();
  const location = useLocation();
  const { id, name, description, price, image, features } = location.state || {};
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [isFeatureSelected, setIsFeatureSelected] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    if (!features || typeof features !== 'object') {
      console.error("Las características no están definidas correctamente para este producto");
      return;
    }

    const mandatoryFeatures = Object.keys(features).filter((feature) => features[feature].mandatory);
    const missingFeatures = mandatoryFeatures.filter((feature) => !selectedFeatures[feature]);

    if (missingFeatures.length > 0 || !isFeatureSelected) {
      Swal.fire({
        icon: 'error',
        title: 'Seleccione las características',
        text: `Por favor, selecciona las características del producto ${missingFeatures.join(' y ')} antes de agregar al carrito.`,
      });
    } else {
      dispatch({
        type: 'ADD_TO_CART',
        payload: { id, name, price, quantity, features: selectedFeatures },
      });
      setSelectedFeatures({});
      setIsFeatureSelected(false);
      setQuantity(1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Card maxW="md">
        <CardBody>
          <Image src={image} alt={name} borderRadius="sm" />
          <Stack mt="1" spacing="1">
            <Heading size="md">{name}</Heading>
            <Text>{description}</Text>
            <Text color="blue.600" fontSize="2xl">
              ${price}
            </Text>
            {features &&
              Object.keys(features).map((feature) => (
                <Select
                  key={feature}
                  placeholder={`Selecciona ${feature}`}
                  value={selectedFeatures[feature] || ''}
                  onChange={(e) => {
                    setSelectedFeatures({
                      ...selectedFeatures,
                      [feature]: e.target.value,
                    });
                    setIsFeatureSelected(true);
                  }}
                >
                  <option value="" disabled>
                    Selecciona {feature}
                  </option>
                  {features[feature].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              ))}
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="4" justifyContent="center">
            <Button variant="solid" colorScheme="blue" onClick={addToCart}>
              Agregar al carrito
            </Button>
            <Button
              variant="outline"
              colorScheme="blue"
              size="md"
              onClick={decrementQuantity}
            >
              -
            </Button>
            <Text fontSize="md" lineHeight="40px">
              {quantity}
            </Text>
            <Button
              variant="outline"
              colorScheme="blue"
              size="md"
              onClick={incrementQuantity}
            >
              +
            </Button>
            <Button variant="ghost" colorScheme="blue">
              <Link to={`/item/${id}`} state={{ id, name, description, price, image, features }}>
                Ver más
              </Link>
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default ItemDetailContainer;
