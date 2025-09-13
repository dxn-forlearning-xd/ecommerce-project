import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWithTimeoutAndFallback } from '../../utils/api';

import {
  Box,
  Grid,
  GridItem,
  Text,
  Image,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import { BiGridSmall } from 'react-icons/bi';
import categoryMap from '../../utils/categoryMap';

const Categories = () => {
  const navigate = useNavigate();

  const [categoryThumbnails, setCategoryThumbnails] = useState([]);

  useEffect(() => {
    fetchWithTimeoutAndFallback(
      'https://dummyjson.com/products?limit=45',
      '/products-fallback.json',
      { timeout: 5000 }
    ).then((data) => {
      const allProducts = data.products;
      const categoryThumbs = {};
      allProducts.forEach((p) => {
        if (!categoryThumbs[p.category]) {
          categoryThumbs[p.category] = p.images[0];
        }
      });
      setCategoryThumbnails(categoryThumbs);
    });
  }, []);

  return (
    <section>
      <Text
        color="#2b6150ff"
        fontSize="1.5rem"
        fontWeight="800"
        maxW="420px"
        mx="auto"
        textAlign="center"
        position="relative"
        paddingBottom="16px"
        letterSpacing="tight"
        textTransform="uppercase"
        _after={{
          content: '""',
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '3px',
          background: 'linear-gradient(90deg, #0e2e24, #22b558ff)',
          borderRadius: '2px',
        }}
      >
        分类{' '}
      </Text>

      <Grid
        templateColumns="repeat(auto-fill, minmax(80px, 1fr))"
        gap={6}
        mx="auto"
        px="10px"
        maxW="420px"
      >
        {Object.keys(categoryThumbnails).length === 0
          ? Array.from({ length: 6 }).map((_, i) => (
              <GridItem
                key={i}
                borderRadius="lg"
                boxShadow="0 4px 12px rgba(0, 0, 0, 0.08)"
              >
                <Box
                  borderRadius="lg"
                  p={2}
                  textAlign="center"
                  bg="white"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Skeleton boxSize="90px" borderRadius="md" />

                  <Skeleton mt={2} h="16px" w="60px" />
                </Box>
              </GridItem>
            ))
          : Object.entries(categoryThumbnails).map(([cat, thumb]) => {
              const chineseName = categoryMap[cat] || cat;
              return (
                <GridItem
                  key={cat}
                  borderRadius="lg"
                  boxShadow="0 4px 12px rgba(0, 0, 0, 0.08)"
                >
                  <Box
                    borderRadius="lg"
                    p={2}
                    textAlign="center"
                    bg="white"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    onClick={() => navigate(`/category/${cat}`)}
                  >
                    <Image src={thumb} boxSize="90px" />
                    <Text mt={1}>{chineseName}</Text>
                  </Box>
                </GridItem>
              );
            })}

        <GridItem
          key="more"
          borderRadius="lg"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.08)"
        >
          <Box
            borderRadius="lg"
            p={2}
            textAlign="center"
            bg="white"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            onClick={() => navigate('/categories')}
          >
            <BiGridSmall size={90} color="#0a3e20" />
            <Text mt={1}>更多</Text>
          </Box>
        </GridItem>
      </Grid>
    </section>
  );
};

export default Categories;
