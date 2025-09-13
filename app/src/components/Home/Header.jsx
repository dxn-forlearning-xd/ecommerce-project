import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch, CiCamera } from 'react-icons/ci';

import { Input, Box, IconButton, Image, HStack } from '@chakra-ui/react';
import { toaster } from '../ui/toaster';

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/search?q=${encodeURIComponent(keyword)}`);
    } else {
      toaster.create({
        title: '输入为空',
        description: '请输入搜索内容',
        type: 'failed',
        duration: 2000,
      });
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      maxW="420px"
      mx="auto"
      py={3}
      px={4}
      bg="#ffffff"
      zIndex="1000"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.05)"
    >
      <HStack spacing={2}>
        <Image
          src="/logo.jpg"
          alt="logo"
          boxSize="72px"
          objectFit="contain"
          mt="10px"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <IconButton
          aria-label="识图"
          onClick={() =>
            toaster.create({
              title: '识图',
              description: '打开识图功能',
              type: 'success',
              duration: 2000,
            })
          }
          bg="gray.100"
          borderRadius="50%"
          ml="-6px"
        >
          <CiCamera />
        </IconButton>
        <Input
          placeholder="搜索商品"
          flex={1}
          borderRadius="md"
          bg="gray.100"
          border="none"
          _focus={{
            border: 'none',
            boxShadow: 'none',
            outline: 'none',
          }}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <IconButton
          onClick={handleSearch}
          bg="#27AE60"
          color="white"
          borderRadius="md"
          _hover={{ bg: '#219150' }}
        >
          <CiSearch />
        </IconButton>
      </HStack>
    </Box>
  );
};

export default Header;
