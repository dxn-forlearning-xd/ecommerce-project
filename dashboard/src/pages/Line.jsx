import { ResponsiveLine } from '@nivo/line';
import { useTheme, Box } from '@mui/material';
import { tokens } from '../theme';
import { useState, useEffect } from 'react';
import Header from '../components/Header';

const Line = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    const fetchLineData = async () => {
      try {
        const res = await fetch('https://dummyjson.com/carts');
        const data = await res.json();
        const series = [
          {
            id: 'Total per Cart',
            data: data.carts.map((c) => ({
              x: `Cart ${c.id}`,
              y: c.total,
            })),
          },
        ];
        setLineData(series);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLineData();
  }, []);

  return (
    <>
      {isDashboard ? '' : <Header title={'Order Total'} />}
      <Box height={isDashboard ? '150px' : '400px'}>
        <ResponsiveLine
          data={lineData}
          enableGridX={false}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 0, max: 'auto', stacked: false }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: isDashboard ? 0 : -45,
            legend: isDashboard ? '' : 'Cart ID',
            legendOffset: 36,
            legendPosition: 'middle',
            tickValues:
              window.innerWidth < 600
                ? lineData.map((d, i) => i % 2 === 0 && d.x).filter(Boolean)
                : undefined,
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? '' : 'Total',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          colors={{ scheme: 'nivo' }}
          pointSize={isDashboard ? 4 : 8}
          pointColor={{ from: 'color', modifiers: [] }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          enablePointLabel={false}
          useMesh={true}
          theme={{
            legends: {
              text: { fill: colors.grey[100] },
            },
            background: colors.primary[400],

            labels: { text: { fill: colors.grey[100] } },
            axis: {
              ticks: { text: { fill: colors.grey[100] } },
              legend: { text: { fill: colors.grey[100] } },
            },
            tooltip: {
              container: {
                color: '#fff',
                background: '#333',
                fontSize: '14px',
              },
            },
          }}
          legends={
            isDashboard
              ? []
              : [
                  {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  },
                ]
          }
          margin={
            isDashboard
              ? { top: 10, right: 10, bottom: 10, left: 10 }
              : { top: 50, right: 110, bottom: 50, left: 60 }
          }
        />
      </Box>
    </>
  );
};

export default Line;
