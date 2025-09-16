import Header from '../components/Header';
import { Box, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchOrderList } from '../api/productApi';
import { fetchTopSellingProduct } from '../api/productApi';
import { fetchLowStockProduct } from '../api/productApi';
import { useState, useEffect } from 'react';

import { tokens } from '../theme';
import Bar from './Bar';
import Line from './Line';
import { ImportContactsOutlined } from '@mui/icons-material';
import StatBox from '../components/StatBox';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';

const Dashboard = () => {
  const navigate = useNavigate();
  const [topProduct, setTopProduct] = useState(null);
  const [lowProduct, setLowProduct] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await fetchOrderList();
        setOrders(data.orders);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  }, []);
  const ordersToProcess = orders?.length;

  useEffect(() => {
    const getTopProduct = async () => {
      const product = await fetchTopSellingProduct();
      setTopProduct(product);
    };
    getTopProduct();
  }, []);
  useEffect(() => {
    const getLowProduct = async () => {
      const product = await fetchLowStockProduct();
      setLowProduct(product);
    };
    getLowProduct();
  }, []);

  return (
    <Box>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: '1fr',
          sm: 'repeat(6, 1fr)',
          md: 'repeat(12, 1fr)',
        }}
        gap="20px"
      >
        <Box
          gridColumn={{ xs: 'span 1', sm: 'span 6', md: 'span 12' }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Header title="Dashboard" subtitle="Welcome to demo dashboard" />
        </Box>

        <Box
          gridColumn={{ xs: 'span 1', sm: 'span 3', md: 'span 4' }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="auto"
        >
          <StatBox
            title="Orders to Process"
            subtitle={ordersToProcess}
            progress={ordersToProcess / ordersToProcess}
            icon={<InventoryOutlinedIcon />}
          />
        </Box>

        <Box
          gridColumn={{ xs: 'span 1', sm: 'span 3', md: 'span 4' }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="auto"
        >
          <StatBox
            title="Sales"
            subtitle="12"
            progress="0.8"
            icon={<AttachMoneyOutlinedIcon />}
          />
        </Box>

        <Box
          gridColumn={{ xs: 'span 1', sm: 'span 6', md: 'span 4' }}
          height="auto"
          backgroundColor={colors.primary[400]}
        >
          <Box p="10px 30px">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Low Stock</Typography>
              <Inventory2OutlinedIcon />
            </Box>
            {lowProduct && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography>{lowProduct.name}</Typography>
                  <Typography> Stock: {lowProduct.stock}</Typography>
                </Box>
                <Box
                  component="img"
                  src={lowProduct.img}
                  sx={{ width: 80, height: 80 }}
                />
              </Box>
            )}
          </Box>
        </Box>

        <Box
          gridColumn={{ xs: 'span 1', sm: 'span 6', md: 'span 8' }}
          height="auto"
          backgroundColor={colors.primary[400]}
        >
          <Box p="10px 30px">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Order Total</Typography>
            </Box>
            <Line isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn={{ xs: 'span 1', sm: 'span 6', md: 'span 4' }}
          height="auto"
          backgroundColor={colors.primary[400]}
        >
          <Box p="10px 30px">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Top Selling</Typography>
              <SellOutlinedIcon />
            </Box>
            {topProduct && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" alignItems="center">
                  <Box>
                    <Typography>{topProduct.name}</Typography>
                    <Typography> {topProduct.rating}⭐</Typography>
                  </Box>
                  <Box
                    component="img"
                    src={topProduct.img}
                    sx={{ width: 80, height: 80 }}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        <Box
          gridColumn={{ xs: 'span 1', sm: 'span 6', md: 'span 12' }}
          height="auto"
          backgroundColor={colors.primary[400]}
        >
          <Box p="10px 30px">
            <Typography variant="h6">Inventory</Typography>
            <Bar isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
