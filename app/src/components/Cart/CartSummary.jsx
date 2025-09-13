import { Box, VStack, HStack, Text, Button, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Toaster, toaster } from '../../components/ui/toaster';
import { useAuth } from '../../context/AuthContext';
import { OrderProvider } from '../../context/OrderContext';

function CartSummary() {
  const navigate = useNavigate();
  const { items, subtotal } = useCart();
  const { items: cartItems } = useCart();
  const { isLoggedIn } = useAuth();

  const total =
    typeof subtotal === 'number'
      ? subtotal
      : (items ?? []).reduce((sum, i) => sum + i.price * i.qty, 0);

  const count = items?.length ?? 0;

  const handleClick = () => {
    if (cartItems.length === 0) {
      toaster.create({
        description: '购物车内没有物品',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    } else if (!isLoggedIn) {
      toaster.create({
        description: '请先登录',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    } else {
      navigate('/checkout');
    }
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
      p={4}
    >
      <VStack mb="90px" spacing={3} align="stretch">
        <HStack justify="space-between">
          <Text>共计</Text>
          <Text fontWeight="bold">￥{total.toFixed(2)}</Text>
        </HStack>
        <Button
          bg="#428960"
          color="white"
          size="lg"
          borderRadius="full"
          onClick={handleClick}
          isDisabled={count === 0}
        >
          全部结算
        </Button>
      </VStack>
    </Box>
  );
}

export default CartSummary;
