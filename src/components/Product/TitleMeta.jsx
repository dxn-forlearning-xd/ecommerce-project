import { Box, HStack, Text, Icon } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

function TitleMeta({ title, brand, rating, stock }) {
  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold">
        {title}
      </Text>
      <HStack spacing={2} mt={1}>
        {brand && (
          <Text color="green.700" fontSize="sm">
            By {brand}
          </Text>
        )}
        <HStack spacing={1} color="yellow.500">
          <Icon as={FaStar} boxSize={4} />
          <Text fontSize="sm" color="gray.700">
            {rating?.toFixed?.(2) ?? rating}
          </Text>
        </HStack>
        <Text fontSize="sm" color="gray.500">
          ({stock} in stock)
        </Text>
      </HStack>
    </Box>
  );
}

export default TitleMeta;
