import { useState } from 'react';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { tokens } from '../../theme';

import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import SsidChartOutlinedIcon from '@mui/icons-material/SsidChartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { HomeOutlined } from '@mui/icons-material';

import userImage from '../../assets/user.jpg';

const SideBar = () => {
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');

  return (
    <Box display="flex" alignItems="stretch">
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
            height: '100%',
          },

          [`.ps-menu-button:hover *`]: {
            color: 'black',
          },
        }}
        collapsed={isCollapsed}
      >
        <Menu>
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>ADMINS</Typography>
                <IconButton>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <MenuItem style={{ height: 'auto' }}>
            {!isCollapsed ? (
              <Box my={1}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile"
                    width="80px"
                    height="80px"
                    src={userImage}
                    style={{ cursor: 'pointer', borderRadius: '50%' }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    fontSize={30}
                    color={colors.grey[100]}
                    fontWeight="bold"
                  >
                    Demo User
                  </Typography>
                  <Typography
                    fontSize={20}
                    color={colors.grey[100]}
                    fontWeight="bold"
                  >
                    Admin
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box
                my={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  alt="profile"
                  width="38px"
                  height="38px"
                  src={userImage}
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                />
              </Box>
            )}
          </MenuItem>
          <MenuItem
            icon={isCollapsed ? <HomeOutlined /> : undefined}
            onClick={() => {
              setSelected('orders');
              navigate('/');
            }}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
            active={selected === 'dashboard'}
          >
            {!isCollapsed && (
              <Box display="flex" gap={4} alignItems="center">
                <IconButton>
                  <HomeOutlined />
                </IconButton>
                <Typography>Dashboard</Typography>
              </Box>
            )}
          </MenuItem>
          {/* <MenuItem
            icon={isCollapsed ? <PeopleAltOutlinedIcon /> : undefined}
            onClick={() => navigate('/')}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
            selected={selected}
            setSelected={setSelected}
          >
            {!isCollapsed && (
              <Box display="flex" gap={4} alignItems="center">
                <IconButton>
                  <PeopleAltOutlinedIcon />
                </IconButton>
                <Typography>Manage User</Typography>
              </Box>
            )}
          </MenuItem> */}
          <MenuItem
            icon={isCollapsed ? <Inventory2OutlinedIcon /> : undefined}
            onClick={() => {
              setSelected('products');
              navigate('/products');
            }}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
            active={selected === 'products'}
          >
            {!isCollapsed && (
              <Box display="flex" gap={4} alignItems="center">
                <IconButton>
                  <Inventory2OutlinedIcon />
                </IconButton>
                <Typography>Products</Typography>
              </Box>
            )}
          </MenuItem>
          <MenuItem
            icon={isCollapsed ? <InventoryOutlinedIcon /> : undefined}
            onClick={() => {
              setSelected('orders');
              navigate('/orders');
            }}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
            active={selected === 'orders'}
          >
            {!isCollapsed && (
              <Box display="flex" gap={4} alignItems="center">
                <IconButton>
                  <InventoryOutlinedIcon />
                </IconButton>
                <Typography>Orders</Typography>
              </Box>
            )}
          </MenuItem>

          <MenuItem
            icon={isCollapsed ? <BarChartOutlinedIcon /> : undefined}
            onClick={() => {
              setSelected('bar');
              navigate('/bar');
            }}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
            active={selected === 'bar'}
          >
            {!isCollapsed && (
              <Box display="flex" gap={4} alignItems="center">
                <IconButton>
                  <BarChartOutlinedIcon />
                </IconButton>
                <Typography>Bar Chart</Typography>
              </Box>
            )}
          </MenuItem>

          <MenuItem
            icon={isCollapsed ? <SsidChartOutlinedIcon /> : undefined}
            onClick={() => {
              setSelected('line');
              navigate('/line');
            }}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
            active={selected === 'line'}
          >
            {!isCollapsed && (
              <Box display="flex" gap={4} alignItems="center">
                <IconButton>
                  <SsidChartOutlinedIcon />
                </IconButton>
                <Typography>Line Chart</Typography>
              </Box>
            )}
          </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
