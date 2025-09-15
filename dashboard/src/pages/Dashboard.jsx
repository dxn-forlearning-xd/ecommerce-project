import Header from '../components/Header';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';

import { tokens } from '../theme';
import Bar from './Bar';
import { DownloadOutlined, ImportContactsOutlined } from '@mui/icons-material';
import StatBox from '../components/StatBox';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Header title={'Dashboard'} subtitle={'Welcome to demo dashboard'} />

        <Button
          sx={{
            backgroundColor: colors.grey[100],
            color: colors.grey[900],

            fontSize: '14px',
            Padding: '10px 20px',
          }}
        >
          <DownloadOutlined />
          <Typography> Download Reports</Typography>
        </Button>
      </Box>

      <Box
        display={'grid'}
        gridTemplateColumns={'repeat(12, 1fr)'}
        gridAutoRows={'140px'}
        gap={'20px'}
      >
        <Box
          gridColumn={'span 3'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <StatBox
            title="Orders to Process"
            subtitle="12"
            progress={'0.8'}
            icon={<InventoryOutlinedIcon />}
          />
        </Box>
        <Box
          gridColumn={'span 3'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <StatBox
            title="Top Selling"
            subtitle="12"
            progress={'0.8'}
            icon={<SellOutlinedIcon />}
          />
        </Box>
        <Box
          gridColumn={'span 3'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <StatBox
            title="Low Stock Items"
            subtitle="12"
            progress={'0.8'}
            icon={<Inventory2OutlinedIcon />}
          />
        </Box>
        <Box
          gridColumn={'span 3'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <StatBox
            title="Sales"
            subtitle="12"
            progress={'0.8'}
            icon={<AttachMoneyOutlinedIcon />}
          />
        </Box>

        <Box
          gridColumn="span 8"
          gridAutoRows="span 1"
          backgroundColor={colors.primary[400]}
        >
          <Box
            p={'10px 30px'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="h6">Rvenue</Typography>
              <IconButton>
                <ImportContactsOutlined />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box
          gridColumn={'span 4'}
          gridRow={'span 1'}
          backgroundColor={colors.primary[400]}
        >
          <Box
            p={'10px 30px'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="h6">Rvenue</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          gridColumn={'span 12'}
          backgroundColor={colors.primary[400]}
          height={'280px'}
        >
          <Box
            p={'10px 30px'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="h6">Rvenue</Typography>
            </Box>
          </Box>
          <Box width="auto" height="200px">
            <Bar isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
