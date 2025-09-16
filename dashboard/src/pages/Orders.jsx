import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Header from '../components/Header';
import { tokens } from '../theme';
import { fetchOrderList } from '../api/productApi';

const Orders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOrderList();
        const orderDetail = data.orders.map((o) => ({
          id: o.id,
          products: o.products.map((p) => p.name).join(', '),
          totalPrice: o.totalPrice,
          status: o.status,
          orderDate: new Date(o.orderDate).toLocaleDateString(),
        }));
        setOrders(orderDetail);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'products', headerName: 'Products', flex: 1 },
    { field: 'totalPrice', headerName: 'Total Price', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'orderDate', headerName: 'Order Date', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => {
        const handleView = () => {
          navigate(`/orders/${params.row.id}`);
        };

        const handleUpdateStatus = () => {
          setOrders((prev) =>
            prev.map((o) =>
              o.id === params.row.id
                ? {
                    ...o,
                    status: o.status === 'Pending' ? 'Shipped' : 'Pending',
                  }
                : o
            )
          );
        };

        return (
          <Box gap="8px">
            <Button
              sx={{
                backgroundColor: colors.grey[100],
                color: colors.grey[900],
              }}
              variant="contained"
              onClick={handleUpdateStatus}
            >
              <Typography sx={{ fontSize: '10px' }}> Toggle Status </Typography>
            </Button>
          </Box>
        );
      },
    },
  ];

  const displayedColumns = isMobile
    ? columns.filter((col) =>
        ['products', 'status', 'actions'].includes(col.field)
      )
    : columns;

  return (
    <Box>
      <Header title="Orders" />
      <Box display="grid" mt={2}>
        <DataGrid
          rows={orders}
          columns={displayedColumns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-cell:focus-within': { outline: 'none' },
            '& .MuiDataGrid-columnHeader:focus': { outline: 'none' },
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
        />
      </Box>
    </Box>
  );
};

export default Orders;
