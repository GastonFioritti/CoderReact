import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';

const Checkout = ({ items, total, onBuyNow }) => {
  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Resumen de la Orden:
      </Text>
      {items.map((item) => (
        <Box key={item.id} mb={2}>
          <Text>{`${item.name} x ${item.quantity}`}</Text>
          {item.features &&
            Object.keys(item.features).map((feature) => (
              <Text key={feature} ml={4}>
                {`${feature}: ${item.features[feature]}`}
              </Text>
            ))}
        </Box>
      ))}
      <Text fontSize="lg" fontWeight="bold" mt={4} mb={2}>
        Total: ${total}
      </Text>
    </Box>
  );
};

export default Checkout;
