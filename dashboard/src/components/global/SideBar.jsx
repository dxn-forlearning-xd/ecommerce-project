import { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

import { tokens } from '../../theme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import userImage from '../../assets/user.jpg';

const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');

  return (
    <Box sx={{}}>
      <Sidebar style={{ height: '100vh' }} collapsed={isCollapsed}>
        <Menu>
          <MenuItem
            style={{ minHeight: '120px' }}
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
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
