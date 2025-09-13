import { HStack, Text } from '@chakra-ui/react';

function PriceBlock({ price, discountPercentage }) {
  const discounted = discountPercentage
    ? (price * (1 - discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <HStack spacing={3}>
      <Text fontSize="xl" fontWeight="bold">
        ￥{discounted ?? price}
      </Text>
      {discounted && (
        <>
          <Text as="s" color="gray.500">
            ￥{price}
          </Text>
          <Text color="green.600" fontWeight="medium">
            -{discountPercentage}%
          </Text>
        </>
      )}
    </HStack>
  );
}

export default PriceBlock;
