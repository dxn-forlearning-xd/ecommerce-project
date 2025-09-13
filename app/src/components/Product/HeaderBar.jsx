import { HStack, IconButton, Text, Spacer } from '@chakra-ui/react';
import { FiArrowLeft, FiHeart, FiShare2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function HeaderBar({}) {
  const navigate = useNavigate();
  return (
    <HStack px={3} py={2} bg="white" position="sticky" top={0} zIndex={10}>
      <IconButton
        aria-label="返回"
        size="sm"
        variant="ghost"
        color="gray.700"
        onClick={() => navigate(-1)}
      >
        <FiArrowLeft />
      </IconButton>
      <Text fontWeight="semibold">详情</Text>
      <Spacer />
      <IconButton aria-label="收藏" size="sm" variant="ghost" color="gray.700">
        <FiHeart />
      </IconButton>
      <IconButton aria-label="分享" size="sm" variant="ghost" color="gray.700">
        <FiShare2 />
      </IconButton>
    </HStack>
  );
}

export default HeaderBar;
