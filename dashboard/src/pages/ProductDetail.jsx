import { Box, Typography, Button, useTheme } from '@mui/material';
import { tokens } from '../theme';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const product = {
    id,
    name: 'Sample Product',
    price: 99.99,
    stock: 20,
    category: 'Electronics',
    description: 'This is a sample product description.',
    imageUrl: 'https://via.placeholder.com/300',
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
        onClick={() => navigate('/products')}
      >
        Back to Products
      </Button>

      <Box display="flex" gap="40px" flexWrap="wrap">
        <Box
          component="img"
          src={product.imageUrl}
          alt={product.name}
          sx={{
            width: '300px',
            height: '300px',
            borderRadius: '8px',
            objectFit: 'cover',
          }}
        />

        <Box display="flex" flexDirection="column" gap="15px">
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="h6" color={colors.blueAccent[400]}>
            ${product.price}
          </Typography>
          <Typography>Category: {product.category}</Typography>
          <Typography>Stock: {product.stock}</Typography>
          <Typography>{product.description}</Typography>

          <Box display="flex" gap="10px" marginTop="20px">
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.grey[100],
                color: colors.grey[900],
              }}
            >
              Edit
            </Button>
            <Button variant="outlined" color="error">
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;
