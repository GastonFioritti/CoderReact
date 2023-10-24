import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Image, Stack, Heading, Text, Divider, ButtonGroup, Button } from '@chakra-ui/react';

const ItemDetailContainer = () => {
  const location = useLocation();
  const { id, name, description, price, image } = location.state;

  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='md' overflow='hidden'>
      <Image src={image} alt={name} borderRadius='sm' />
      <Stack p='4' spacing='1'>
        <Heading size='md'>{name}</Heading>
        <Text>{description}</Text>
        <Text color='blue.600' fontSize='2xl'>
          ${price}
        </Text>
      </Stack>
      <Divider />
      <Box p='4'>
        <ButtonGroup spacing='2'>
          <Button variant='solid' colorScheme='blue'>
            Comprar ahora
          </Button>
          <Button variant='ghost' colorScheme='blue'>
            Ver más
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default ItemDetailContainer;