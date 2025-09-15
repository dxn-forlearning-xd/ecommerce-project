import { Box, useTheme } from '@mui/material';
import { tokens } from '../theme';

const ProgressCircle = ({ progress = '0.75', size = '40' }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = Number(progress) * 360;

  return (
    <Box
      sx={{
        background: `conic-gradient(${colors.blueAccent[600]} 0deg ${angle}deg, ${colors.greenAccent[500]} ${angle}deg 360deg)`,
        borderRadius: '50%',
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
