import { Box, Text, VStack, HStack, Button, Badge } from '@chakra-ui/react';
import PageHeader from '../components/global/PageHeader';
import BottomNav from '../components/global/BottomNav';
import { useOrders } from '../context/OrderContext';

const OrdersPage = () => {
  const { orders } = useOrders();

  const getStatusColor = (status) => {
    switch (status) {
      case 'shipped':
        return 'green';
      case 'un':
        return 'orange';
      case 'done':
        return 'blue';
      case 'canceled':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Box>
      <PageHeader PageTitle="My order" />
      <Box p={4} maxW="420px" mx="auto" minH="calc(100vh - 72px)" bg="gray.50">
        <VStack spacing={4} align="stretch">
          {orders.map((order) => (
            <Box
              key={order.id}
              p={4}
              bg="white"
              borderRadius="md"
              boxShadow="0 4px 12px rgba(0, 0, 0, 0.08)"
            >
              <HStack justifyContent="space-between" mb={2}>
                <Text fontWeight="bold">Order number: {order.id}</Text>
                <Badge colorScheme={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </HStack>

              <VStack spacing={2} align="stretch" mb={2}>
                {order.items.map((item) => (
                  <HStack key={item.id} justify="space-between">
                    <Text>
                      {item.title} × {item.qty}
                    </Text>
                    <Text>€ {(item.price * item.qty).toFixed(2)}</Text>
                  </HStack>
                ))}
              </VStack>

              <Text fontSize="sm" color="gray.500">
                Order Date: {new Date(order.createdAt).toLocaleString()}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Quantity: {order.items.reduce((s, it) => s + it.qty, 0)}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Price: €{order.total.toFixed(2)}
              </Text>
            </Box>
          ))}

          {orders.length === 0 && (
            <Text color="gray.500" textAlign="center">
              No order
            </Text>
          )}
        </VStack>
      </Box>
      <BottomNav />
    </Box>
  );
};

export default OrdersPage;
