import React, { useState } from 'react';
import { Box, HStack, IconButton, Button, Text } from '@chakra-ui/react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { toaster } from '../ui/toaster';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

function AddToCartBar({ product }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const disabled = !product;
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product, qty);

    toaster.create({
      title: 'Added to cart',
      description: `Product: ${product.title}, Quantity: ${qty}`,
      type: 'success',
      duration: 2000,
    });
  };

  const handleBuyNow = () => {
    const buyNow = {
      id: product.id,
      title: product.title,
      price: product.price,
      qty,
      thumbnail: product.thumbnail || product.images?.[0],
    };
    navigate('/checkout', { state: { mode: 'buy-now', item: buyNow } });
  };
  return (
    <Box
      position="fixed"
      bottom={0}
      left="50%"
      transform="translateX(-50%)"
      w="100%"
      maxW="420px"
      bg="white"
      borderTop="1px solid"
      borderColor="gray.200"
      p={3}
    >
      <HStack>
        <HStack spacing={1}>
          <IconButton
            aria-label="dec"
            size="sm"
            variant="outline"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            isDisabled={disabled}
            border="none"
            color="gray.800"
          >
            <FaMinus />
          </IconButton>
          <Text w="32px" textAlign="center">
            {qty}
          </Text>
          <IconButton
            aria-label="inc"
            size="sm"
            variant="outline"
            onClick={() => setQty((q) => q + 1)}
            isDisabled={disabled}
            border="none"
            color="gray.800"
          >
            <FaPlus />
          </IconButton>
        </HStack>

        <Button
          flex={1}
          borderRadius="lg"
          onClick={handleAddToCart}
          isDisabled={disabled}
          bg="#428960"
          color="#ffffff"
        >
          Add to Cart
        </Button>

        <Button
          flex={1}
          borderRadius="lg"
          onClick={() => {
            isLoggedIn
              ? handleBuyNow()
              : toaster.create({
                  description: 'Please log in first',
                  status: 'error',
                  duration: 2000,
                  isClosable: true,
                  position: 'top',
                });
          }}
          isDisabled={disabled}
          bg="orange.500"
          color="#ffffff"
        >
          Buy Now
        </Button>
      </HStack>
    </Box>
  );
}

export default AddToCartBar;
