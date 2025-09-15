import Header from '../components/Header';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';

import { tokens } from '../theme';
import Bar from './Bar';
import {
  DownloadOutlined,
  ImportContactsOutlined,
  Padding,
} from '@mui/icons-material';
import StatBox from '../components/StatBox';

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
            backgroundColor: colors.blueAccent[800],
            color: colors.grey[100],
            fontSize: '14px',
            fontWeight: 'bold',
            Padding: '10px 20px',
          }}
        >
          <DownloadOutlined />
          Download Reports
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
            title="12361"
            subtitle="email"
            progress={'0.8'}
            increase={'+43%'}
            icon={<ImportContactsOutlined />}
          />
        </Box>
        <Box
          gridColumn={'span 3'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <StatBox
            title="12361"
            subtitle="email"
            progress={'0.8'}
            increase={'+43%'}
            icon={<ImportContactsOutlined />}
          />
        </Box>
        <Box
          gridColumn={'span 3'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <StatBox
            title="12361"
            subtitle="email"
            progress={'0.8'}
            increase={'+43%'}
            icon={<ImportContactsOutlined />}
          />
        </Box>
        <Box
          gridColumn={'span 3'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <StatBox
            title="12361"
            subtitle="email"
            progress={'0.8'}
            increase={'+43%'}
            icon={<ImportContactsOutlined />}
          />
        </Box>

        <Box
          gridColumn="span 8"
          gridAutoRows="span 2"
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
              <IconButton>
                <ImportContactsOutlined />
              </IconButton>
            </Box>
            <Box width="auto" height="200px">
              <Bar isDashboard={true} />
            </Box>
          </Box>
        </Box>
        <Box
          gridColumn={'span 4'}
          gridRow={'span 2'}
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
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
