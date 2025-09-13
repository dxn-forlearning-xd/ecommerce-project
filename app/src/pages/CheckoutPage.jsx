import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, VStack, HStack, Text, Image, Button } from '@chakra-ui/react';
import { useCart } from '../context/CartContext';
import BottomNav from '../components/global/BottomNav';
import PageHeader from '../components/global/PageHeader';
import { Toaster, toaster } from '../components/ui/toaster';
import { useOrders } from '../context/OrderContext';

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { items: cartItems, clearCart } = useCart();
  const { addOrder } = useOrders();

  const { mode, item } = location.state || {};
  const items = useMemo(() => {
    return mode === 'buy-now' && item ? [item] : cartItems;
  }, [mode, item, cartItems]);

  const total = items.reduce((s, it) => s + it.price * it.qty, 0);

  const handlePay = () => {
    if (items.length === 0) return;

    addOrder(items);
    if (mode !== 'buy-now') {
      clearCart();
    }
    navigate('/orders');
    toaster.success({ title: '付款成功' });
  };

  return (
    <>
      <PageHeader PageTitle={'确认订单'}></PageHeader>
      <Box maxW="420px" mx="auto" p={4} bg="gray.50">
        <VStack align="stretch" spacing={3}>
          {items.map((x) => (
            <HStack
              key={x.id}
              p={3}
              bg="white"
              borderRadius="md"
              boxShadow="0 4px 12px rgba(0, 0, 0, 0.08)"
              align="flex-start"
            >
              <Image src={x.thumbnail} boxSize="64px" borderRadius="md" />
              <VStack align="flex-start" spacing={1} flex={1}>
                <Text noOfLines={2}>{x.title}</Text>
                <HStack justify="space-between" w="100%">
                  <Text color="gray.600">× {x.qty}</Text>
                  <Text fontWeight="bold">
                    ￥{(x.price * x.qty).toFixed(2)}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          ))}
        </VStack>

        <HStack justify="space-between" my={6}>
          <Text>合计</Text>
          <Text fontWeight="bold" fontSize="lg">
            ￥{total.toFixed(2)}
          </Text>
        </HStack>

        <Button
          bg="#428960"
          color="#ffffff"
          colorScheme="green"
          w="100%"
          size="lg"
          onClick={handlePay}
        >
          立即支付
        </Button>
      </Box>

      <BottomNav></BottomNav>
    </>
  );
}
