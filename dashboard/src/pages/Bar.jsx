import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import { mockBarData as data } from '../data/mockData.js';

const Bar = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveBar
      data={data}
      keys={['hot dog', 'burger', 'kebab', 'donut']}
      indexBy="country"
      labelSkipWidth={isDashboard ? 0 : 12}
      labelSkipHeight={isDashboard ? 0 : 12}
      legends={
        isDashboard
          ? []
          : [
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                translateX: 120,
                itemsSpacing: 3,
                itemWidth: 100,
                itemHeight: 16,
              },
            ]
      }
      axisBottom={
        isDashboard ? null : { legend: 'country (indexBy)', legendOffset: 32 }
      }
      axisLeft={isDashboard ? null : { legend: 'food', legendOffset: -40 }}
      margin={
        isDashboard
          ? { top: 10, right: 10, bottom: 10, left: 10 }
          : { top: 50, right: 130, bottom: 50, left: 60 }
      }
    />
  );
};

export default Bar;
