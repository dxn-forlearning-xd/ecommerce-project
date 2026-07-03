import { Box, AspectRatio, Image, HStack } from '@chakra-ui/react';
import { useState } from 'react';

function ImageGallery({ images = [] }) {
  const [idx, setIdx] = useState(0);
  const src = images[idx] || images[0];

  return (
    <Box>
      <AspectRatio ratio={1}>
        <Image
          src={src}
          alt="product"
          borderRadius="lg"
          bg="white"
          objectFit="contain"
          loading="lazy"
        />
      </AspectRatio>
      <HStack spacing={1} justify="center" mt={2}>
        {images.slice(0, 5).map((_, i) => (
          <Box
            key={i}
            w="6px"
            h="6px"
            borderRadius="full"
            bg={i === idx ? 'green.500' : 'gray.300'}
            onClick={() => setIdx(i)}
          />
        ))}
      </HStack>
    </Box>
  );
}

export default ImageGallery;
