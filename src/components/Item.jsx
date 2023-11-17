
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button, Select,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { useCart } from '../context/CartContext';

const Item = ({ id, name, description, price, image, features }) => {
  const { dispatch } = useCart();
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
      const uniqueIdentifier = `${id}-${JSON.stringify(selectedFeatures)}`;

      dispatch({
        type: 'ADD_TO_CART',
        payload: { id: uniqueIdentifier, name, price, quantity, features: selectedFeatures },
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
    <Card maxW='md'>
      <CardBody>
        <Image src={image} alt={name} borderRadius='sm' />
        <Stack mt='1' spacing='1'>
          <Heading size='md'>{name}</Heading>
          <Text>{description}</Text>
          <Text color='blue.600' fontSize='2xl'>
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
        <ButtonGroup spacing='2' justifyContent='center'>
          <Button variant='solid' colorScheme='blue' onClick={addToCart}>
            Comprar ahora
          </Button>
          <Button
            variant='outline'
            colorScheme='blue'
            size='md'
            onClick={decrementQuantity}
          >
            -
          </Button>
          <Text fontSize='md' lineHeight='40px'>
            {quantity}
          </Text>
          <Button
            variant='outline'
            colorScheme='blue'
            size='md'
            onClick={incrementQuantity}
          >
            +
          </Button>
          <Button variant='ghost' colorScheme='blue'>
            <Link to={`/item/${id}`} state={{ id, name, description, price, image, features: features || {} }}>
              Ver más
            </Link>
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Item;
