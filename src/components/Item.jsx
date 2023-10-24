// Item.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button } from '@chakra-ui/react';

const Item = ({ id, name, description, price, image }) => {
  return (
    <Card maxW='sm'>
      <CardBody>
        <Image src={image} alt={name} borderRadius='sm' />
        <Stack mt='1' spacing='1'>
          <Heading size='md'>{name}</Heading>
          <Text>{description}</Text>
          <Text color='blue.600' fontSize='2xl'>
            ${price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button variant='solid' colorScheme='blue'>
            Comprar ahora
          </Button>
          <Button variant='ghost' colorScheme='blue'>
            <Link to={`/item/${id}`} state={{ id, name, description, price, image }}>Ver más</Link>
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Item;
