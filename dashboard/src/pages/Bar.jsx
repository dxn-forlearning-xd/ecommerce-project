import { ResponsiveBar } from '@nivo/bar';
import { useTheme, Box } from '@mui/material';
import { tokens } from '../theme';
import { useEffect, useState } from 'react';
import Header from '../components/Header';

const Bar = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=200');
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();

        const grouped = json.products.reduce((acc, product) => {
          const existing = acc.find((a) => a.category === product.category);
          if (existing) {
            existing.stock += product.stock;
          } else {
            acc.push({ category: product.category, stock: product.stock });
          }
          return acc;
        }, []);
        setData(grouped);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isDashboard ? '' : <Header title={'Inventory'} />}
      <Box height={isDashboard ? '150px' : '600px'}>
        <ResponsiveBar
          data={data}
          keys={['stock']}
          indexBy="category"
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
            isDashboard
              ? null
              : {
                  legend: 'Category',
                  legendOffset: 32,
                  tickRotation: -45,
                  tickValues:
                    window.innerWidth < 600
                      ? data.map((d, i) => i % 2 === 0 && d.x).filter(Boolean)
                      : undefined,
                }
          }
          axisLeft={
            isDashboard
              ? null
              : {
                  legend: 'Stock',
                  legendOffset: -40,
                }
          }
          margin={
            isDashboard
              ? { top: 10, right: 10, bottom: 10, left: 10 }
              : { top: 50, right: 130, bottom: 50, left: 60 }
          }
        />
      </Box>
    </>
  );
};

export default Bar;
