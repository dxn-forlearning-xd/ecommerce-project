import { Box, VStack } from '@chakra-ui/react';
import CartHeader from '../components/Cart/CartHeader';
import CartList from '../components/Cart/CartList';
import CartSummary from '../components/Cart/CartSummary';
import BottomNav from '../components/global/BottomNav';

function CartPage() {
  return (
    <>
      <Box maxW="420px" mx="auto" bg="gray.50" minH="100vh" pb="100px">
        <CartHeader />
        <VStack spacing={4} p={4} align="stretch">
          <CartList />
        </VStack>
        <CartSummary />
      </Box>
      <BottomNav></BottomNav>
    </>
  );
}

export default CartPage;
