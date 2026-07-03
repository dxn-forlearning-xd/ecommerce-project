import { Box, Text, VStack } from '@chakra-ui/react';

function ReviewsList({ reviews = [] }) {
  if (!reviews.length) return null;
  return (
    <Box>
      <Text fontWeight="semibold" mb={2}>
        Reviews
      </Text>
      <VStack align="stretch" spacing={3}>
        {reviews.slice(0, 3).map((r, i) => (
          <Box
            key={i}
            bg="white"
            p={4}
            borderRadius="md"
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.06)"
          >
            <Text fontSize="sm" fontWeight="medium">
              {r.reviewerName} ({r.rating}★)
            </Text>
            <Text fontSize="sm" color="gray.700">
              {r.comment}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default ReviewsList;
