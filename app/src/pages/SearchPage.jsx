import { useEffect, useState } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { Box, VStack, HStack, Text, Image } from '@chakra-ui/react';
import BottomNav from '../components/global/BottomNav';
import PageHeader from '../components/global/PageHeader';
import { fetchWithTimeoutAndFallback } from '../utils/api';

export default function SearchPage() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const keyword = params.get('q') || '';

  useEffect(() => {
    if (!keyword) return;
    fetchWithTimeoutAndFallback(
      `https://dummyjson.com/products/search?q=${keyword}`,
      '/products-search-fallback.json',
      { timeout: 5000 }
    ).then((data) => setResults(data.products || []));
  }, [keyword]);

  return (
    <>
      <PageHeader PageTitle={'搜索结果'}></PageHeader>
      <Box maxW="600px" mx="auto" p={4} mb="80px">
        <Text fontSize="xl" mb={4}>
          搜索内容：{keyword}
        </Text>
        <VStack spacing={4} align="stretch">
          {results.length === 0 && (
            <Text color="gray.500">没有找到相关商品</Text>
          )}
          {results.map((item) => (
            <HStack
              key={item.id}
              p={3}
              bg="white"
              borderRadius="md"
              boxShadow="0 4px 12px rgba(0, 0, 0, 0.08)"
              align="flex-start"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <Image
                src={item.thumbnail}
                alt={item.title}
                boxSize="64px"
                borderRadius="md"
              />
              <VStack align="flex-start" spacing={1} flex={1}>
                <Text fontWeight="bold">{item.title}</Text>
                <Text color="gray.600">￥{item.price}</Text>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </Box>
      <BottomNav></BottomNav>
    </>
  );
}
