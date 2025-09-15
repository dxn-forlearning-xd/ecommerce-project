import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { tokens } from '../theme';

const OrderDetail = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const order = {
    id: '12345',
    customer: 'John Doe',
    date: '2025-09-15',
    total: '$250',
    status: 'Pending',
    products: [
      { id: 'p1', name: 'Product 1', quantity: 2, price: '$50' },
      { id: 'p2', name: 'Product 2', quantity: 1, price: '$150' },
    ],
  };

  return (
    <Box padding="30px">
      <Button
        variant="contained"
        sx={{
          marginBottom: '20px',
          backgroundColor: colors.grey[100],
          color: colors.grey[900],
        }}
        onClick={() => navigate('/orders')}
      >
        Back to Orders
      </Button>

      <Box display="flex" flexDirection="column" gap="20px" mb={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Order #{order.id}</Typography>
          <Box display="flex" gap="10px">
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.grey[100],
                color: colors.grey[900],
              }}
            >
              Edit Status
            </Button>
            <Button variant="outlined" color="error">
              Cancel
            </Button>
          </Box>
        </Box>
        <Typography>Customer: {order.customer}</Typography>
        <Typography>Date: {order.date}</Typography>
        <Typography>Total: {order.total}</Typography>
        <Typography>Status: {order.status}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Products
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.products.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default OrderDetail;
