import { Box, HStack, VStack, Text, Image, IconButton } from '@chakra-ui/react';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

function CartItem({ item }) {
  return (
    <Box
      p={3}
      bg="white"
      borderRadius="md"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.08)"
    >
      <HStack align="flex-start">
        <Image src={item.img} boxSize="80px" borderRadius="md" />
        <VStack align="flex-start" flex={1} spacing={1}>
          <Text fontWeight="bold">{item.title}</Text>
          <Text fontSize="sm" color="gray.600">
            {item.brand}
          </Text>
          <Text fontSize="sm" color="gray.500">
            规格: {item.size}
          </Text>
          <Text fontWeight="bold" color="gray.800">
            ￥{item.price}
          </Text>
          <HStack>
            <IconButton size="sm">
              <FiMinus />
            </IconButton>
            <Text>{item.qty}</Text>
            <IconButton size="sm">
              <FiPlus />
            </IconButton>
          </HStack>
        </VStack>
        <IconButton>
          <FiTrash2 />
        </IconButton>
      </HStack>
    </Box>
  );
}

export default CartItem;
