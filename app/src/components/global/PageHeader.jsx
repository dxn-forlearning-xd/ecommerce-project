import React from 'react';
import { HStack, Text, IconButton } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

const PageHeader = ({ PageTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (
      location.pathname === '/messages' ||
      location.pathname === '/cart' ||
      location.pathname === '/profile' ||
      location.pathname === '/login'
    ) {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  return (
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
      <IconButton onClick={handleBack}>
        <FiArrowLeft />
      </IconButton>
      <Text fontSize="lg" fontWeight="bold" color="#0a3e20">
        {PageTitle}
      </Text>
    </HStack>
  );
};

export default PageHeader;
