import { DataGrid } from '@mui/x-data-grid';
import Header from '../components/Header';
import { Box, useMediaQuery, useTheme, Button } from '@mui/material';
import { tokens } from '../theme';
import { fetchProductList } from '../api/productApi';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery('(max-width:600px)');

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProductList();
        const productDetail = data.products.map((p) => ({
          id: p.id,
          name: p.title,
          price: p.price,
          stock: p.stock,
          category: p.category,
        }));
        setProducts(productDetail);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

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
  const displayedColumns = isMobile
    ? columns.filter((col) => ['name', 'stock', 'actions'].includes(col.field))
    : columns;
  return (
    <>
      <Box>
        <Header title={'Products'} />
      </Box>
      <Box width={'500'} display={'grid'}>
        <DataGrid
          sx={{
            minWidth: 0,
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
          rows={products}
          columns={displayedColumns}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
};

export default Products;
