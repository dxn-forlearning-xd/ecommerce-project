import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import categoryMap from '../utils/categoryMap';
import { fetchWithTimeoutAndFallback } from '../utils/api';
import BottomNav from '../components/global/BottomNav';

const CategoryPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchWithTimeoutAndFallback(
      `https://dummyjson.com/products/category/${slug}`,
      '/products-by-category-fallback.json',
      { timeout: 5000 }
    ).then((data) => {
      setProducts(data.products || []);
      setLoading(false);
    });
  }, [slug]);

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
          {categoryMap[slug] || slug}
        </Text>
      </HStack>

      <Box p={4} bg="gray.50" minH="100vh" mx="auto" pb="100px">
        <Grid
          templateColumns="repeat(auto-fill, minmax(140px, 1fr))"
          gap={6}
          maxW="400px"
          mx="auto"
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} height="180px" borderRadius="md" />
              ))
            : products.map((p) => (
                <GridItem
                  key={p.id}
                  p={2}
                  bg="white"
                  borderRadius="md"
                  boxShadow="0 4px 12px rgba(0, 0, 0, 0.08)"
                  textAlign="center"
                  onClick={() => navigate(`/product/${p.id}`)}
                >
                  <Image
                    src={p.thumbnail}
                    alt={p.title}
                    boxSize="120px"
                    mx="auto"
                    borderRadius="md"
                  />
                  <Text mt={2} fontSize="sm" noOfLines={2}>
                    {p.title}
                  </Text>
                  <Text fontWeight="bold" color="green.600">
                    ¥{p.price}
                  </Text>
                </GridItem>
              ))}
        </Grid>
      </Box>

      <BottomNav></BottomNav>
    </>
  );
};

export default CategoryPage;
