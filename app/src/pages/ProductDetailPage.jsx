import React, { useEffect, useState } from 'react';
import { Box, VStack, Skeleton, SkeletonText } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import HeaderBar from '../components/Product/HeaderBar';
import ImageGallery from '../components/Product/ImageGallery';
import TitleMeta from '../components/Product/TitleMeta';
import PriceBlock from '../components/Product/PriceBlock';
import DescriptionBlock from '../components/Product/DescriptionBlock';
import ReviewsList from '../components/Product/ReviewsList';
import AddToCartBar from '../components/Product/AddToCartBar';
import { fetchWithTimeoutAndFallback } from '../utils/api';

export default function ProductDetailPage() {
  const { id = 1 } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchWithTimeoutAndFallback(
      `https://dummyjson.com/products/${id}`,
      '/products-by-id-fallback.json',
      { timeout: 5000 }
    )
      .then(setProduct)
      .catch(() => setProduct(null));
  }, [id]);

  return (
    <Box maxW="420px" mx="auto" minH="100dvh" bg="gray.100" pb="88px">
      <HeaderBar title="Details" />
      {!product ? (
        <Box p={4}>
          <Skeleton h="220px" borderRadius="lg" />
          <SkeletonText mt={4} noOfLines={3} spacing="3" />
          <Skeleton mt={3} h="24px" w="40%" />
        </Box>
      ) : (
        <VStack align="stretch" spacing={4} p={4}>
          <ImageGallery images={product.images || [product.thumbnail]} />
          <TitleMeta
            title={product.title}
            brand={product.brand}
            rating={product.rating}
            stock={product.stock}
          />
          <PriceBlock
            price={product.price}
            discountPercentage={product.discountPercentage}
          />
          <DescriptionBlock
            description={product.description}
            shippingInfo={product.shippingInformation}
            warrantyInfo={product.warrantyInformation}
            availability={product.availabilityStatus}
          />
          <ReviewsList reviews={product.reviews || []} />
        </VStack>
      )}
      <AddToCartBar product={product} />
    </Box>
  );
}
