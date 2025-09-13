import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  GridItem,
  Text,
  Image,
  Skeleton,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import BottomNav from '../components/global/BottomNav';
import categoryMap from '../utils/categoryMap';
import { fetchWithTimeoutAndFallback } from '../utils/api';

const AllCategoriesPage = () => {
  const navigate = useNavigate();
  const [categoryThumbs, setCategoryThumbs] = useState({});

  useEffect(() => {
    fetchWithTimeoutAndFallback(
      'https://dummyjson.com/products?limit=200',
      '/products-fallback.json',
      { timeout: 5000 }
    ).then((data) => {
      const allProducts = data.products;
      const thumbs = {};
      allProducts.forEach((p) => {
        if (!thumbs[p.category]) {
          thumbs[p.category] = p.images[0];
        }
      });
      setCategoryThumbs(thumbs);
    });
  }, []);

  return (
    <>
      <HStack
        p={4}
        bg="white"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.08)"
        spacing={4}
        zIndex="1000"
        position="Sticky"
        top={0}
        maxW="420px"
        mx="auto"
      >
        <IconButton onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </IconButton>
        <Text fontSize="lg" fontWeight="bold" color="#0a3e20">
          全部分类
        </Text>
      </HStack>
      <Box p={4} mb="80px" maxW="420px" mx="auto" bg="gray.50" minH="100vh">
        <Grid templateColumns="repeat(auto-fill, minmax(100px, 1fr))" gap={6}>
          {Object.keys(categoryThumbs).length === 0
            ? Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} height="120px" borderRadius="md" />
              ))
            : Object.entries(categoryThumbs).map(([cat, thumb]) => {
                const chineseName = categoryMap[cat] || cat;
                return (
                  <GridItem
                    key={cat}
                    p={2}
                    bg="white"
                    borderRadius="md"
                    boxShadow="0 4px 12px rgba(0, 0, 0, 0.08)"
                    textAlign="center"
                    cursor="pointer"
                    onClick={() => navigate(`/category/${cat}`)}
                  >
                    <Image
                      src={thumb}
                      alt={chineseName}
                      boxSize="80px"
                      mx="auto"
                      borderRadius="md"
                    />
                    <Text mt={2} fontSize="sm">
                      {chineseName}
                    </Text>
                  </GridItem>
                );
              })}
        </Grid>
      </Box>
      <BottomNav></BottomNav>
    </>
  );
};

export default AllCategoriesPage;
