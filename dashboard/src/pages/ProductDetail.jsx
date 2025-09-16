import {
  Box,
  Typography,
  Button,
  useTheme,
  Modal,
  TextField,
} from '@mui/material';
import { tokens } from '../theme';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProductById, deleteProduct } from '../api/productApi';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [product, setProduct] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProductById(id);
      setProduct({
        id: data.id,
        name: data.title,
        price: data.price,
        stock: data.stock,
        description: data.description,
        category: data.category,
        image: data.thumbnail,
      });
    };
    fetchData();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      const deleted = await deleteProduct(id);
      console.log('deleted');
      navigate('/products');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box padding="30px">
      {isEditOpen && (
        <Modal open={isEditOpen} onClose={() => setIsEditOpen(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: 4,
              bgcolor: colors.primary[400],
              borderRadius: 2,
              width: 400,
            }}
          >
            <Typography variant="h5">Edit Product</Typography>
            <TextField
              label="Name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Price"
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Stock"
              type="number"
              value={product.stock}
              onChange={(e) =>
                setProduct({ ...product, stock: e.target.value })
              }
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Category"
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              fullWidth
              sx={{ mt: 2 }}
            />

            <Box display="flex" gap="10px" mt={2}>
              <Button variant="contained" onClick={() => setIsEditOpen(false)}>
                Save
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setIsEditOpen(false)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      )}

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

      <Box
        sx={{
          backgroundColor: colors.primary[400],
          color: colors.grey[100],
          padding: '20px',
        }}
        display="flex"
        gap="10px"
        flexWrap="wrap"
      >
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            width: { xs: '100%', sm: '200px', md: '300px' },
            height: { xs: 'auto', sm: '200px', md: '300px' },
            borderRadius: '8px',
            objectFit: 'cover',
            backgroundColor: colors.primary[300],
          }}
        />

        <Box display="flex" flexDirection="column" gap="15px">
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="h6" color={colors.blueAccent[400]}>
            Price: ${product.price}
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
              onClick={() => setIsEditOpen(true)}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                handleDelete(product.id);
              }}
              variant="outlined"
              color="error"
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;
