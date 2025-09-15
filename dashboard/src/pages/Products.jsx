import { DataGrid } from '@mui/x-data-grid';
import Header from '../components/Header';
import { Box, Typography, useTheme, Button } from '@mui/material';
import { tokens } from '../theme';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useNavigate } from 'react-router-dom';

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Product Name', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1 },
    { field: 'stock', headerName: 'Inventory', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },

    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => {
        const navigate = useNavigate();

        const handleView = () => {
          navigate(`/products/${params.row.id}`);
        };

        return (
          <>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: colors.grey[100],
                color: colors.grey[900],
              }}
              onClick={handleView}
            >
              View
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [
    { id: 1, name: '苹果', price: 3.5, stock: 100, category: '水果' },
    { id: 2, name: '香蕉', price: 2.5, stock: 50, category: '水果' },
    { id: 3, name: '牛奶', price: 5, stock: 20, category: '饮品' },
  ];
  return (
    <>
      <Box>
        <Header title={'Products'} />
      </Box>
      <Box display={'grid'}>
        <DataGrid
          sx={{
            '& .MuiDataGrid-cell:focus-within': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnHeader:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: colors.primary[300],
              color: colors.grey[100],
            },

            '& .MuiDataGrid-cell': {
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
            },

            '& .MuiDataGrid-footerContainer': {
              backgroundColor: colors.primary[300],
              color: colors.grey[100],
            },
          }}
          rows={rows}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
};

export default Products;
