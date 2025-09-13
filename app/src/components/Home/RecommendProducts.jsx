import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Grid,
  GridItem,
  Text,
  Image,
  Skeleton,
  SkeletonText,
  Spinner,
} from '@chakra-ui/react';
import { fetchWithTimeoutAndFallback } from '../../utils/api';

const RecommendProducts = () => {
  const navigate = useNavigate();
  function shuffleArray(arr) {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loadingMore, setLoadingMore] = useState(false);

  const loaderRef = useRef(null);

  useEffect(() => {
    fetchWithTimeoutAndFallback(
      'https://dummyjson.com/products?limit=100',
      '/products-fallback.json',
      { timeout: 5000 }
    ).then((data) => {
      const shuffled = shuffleArray(data.products);
      setProducts(shuffled);
    });
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && visibleCount < products.length) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + 4);
            setLoadingMore(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [visibleCount, products.length]);

  return (
    <>
      <Text
        mt="32px"
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
          height: '4px',
          background: 'linear-gradient(90deg, #0e2e24, #22b558ff)',
          borderRadius: '2px',
        }}
      >
        精选好物{' '}
      </Text>

      <Box mb="80px" maxW="420px" mx="auto" px={2}>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          {products.length === 0
            ? Array.from({ length: 6 }).map((_, i) => (
                <GridItem key={i}>
                  <Box p={2} textAlign="center">
                    <Skeleton height="140px" borderRadius="lg" />
                    <SkeletonText mt={3} noOfLines={2} spacing="2" />
                    <Skeleton mt={2} height="16px" width="60px" mx="auto" />
                  </Box>
                </GridItem>
              ))
            : products.slice(0, visibleCount).map((product) => (
                <GridItem key={product.id}>
                  <Box
                    p={2}
                    textAlign="center"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="flex-start"
                    cursor="pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                    bg="white"
                    borderRadius="lg"
                    boxShadow="0 4px 12px rgba(0, 0, 0, 0.08)"
                    transition="transform 0.2s"
                    _hover={{ transform: 'scale(1.03)' }}
                  >
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      borderRadius="md"
                      objectFit="cover"
                      width="100%"
                      height="140px"
                    />

                    <Text
                      mt={4}
                      fontSize="sm"
                      fontWeight="600"
                      color="gray.800"
                      noOfLines={2}
                      textAlign="center"
                      lineHeight="short"
                      px={2}
                    >
                      {product.title}
                    </Text>

                    <Text
                      mt={3}
                      fontSize="lg"
                      fontWeight="bold"
                      color="#2f6956ff"
                      textAlign="center"
                      letterSpacing="tight"
                    >
                      ￥{product.price}
                    </Text>
                  </Box>
                </GridItem>
              ))}
        </Grid>
      </Box>

      <Box ref={loaderRef} textAlign="center" py={4}>
        {loadingMore && <Spinner />}
      </Box>
    </>
  );
};

export default RecommendProducts;
