import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../theme';
import ProgressCircle from './ProgressCircle';

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={'100%'}
      padding={'10px'}
      backgroundColor={colors.primary[400]}
    >
      <Box>
        {icon}
        <Box>
          <Typography sx={{ fontSize: 'clamp(12px, 2vw, 24px)' }}>
            {title}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: 'clamp(10px, 2vw, 20px)' }}
            fontStyle={'italic'}
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox;
