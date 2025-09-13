import { Box, Text, Stack } from '@chakra-ui/react';

function DescriptionBlock({
  description,
  shippingInfo,
  warrantyInfo,
  availability,
}) {
  return (
    <Stack
      spacing={2}
      bg="white"
      p={4}
      borderRadius="lg"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.08)"
    >
      {availability && <Text color="green.600">✅ {availability}</Text>}
      <Text fontSize="sm" color="gray.800">
        {description}
      </Text>
      {shippingInfo && (
        <Text fontSize="sm" color="gray.600">
          🚚 {shippingInfo}
        </Text>
      )}
      {warrantyInfo && (
        <Text fontSize="sm" color="gray.600">
          🛡️ {warrantyInfo}
        </Text>
      )}
    </Stack>
  );
}

export default DescriptionBlock;
