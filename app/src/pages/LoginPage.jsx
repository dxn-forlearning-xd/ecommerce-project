import {
  Box,
  Text,
  VStack,
  HStack,
  Input,
  Button,
  Portal,
  CloseButton,
  Dialog,
} from '@chakra-ui/react';
import PageHeader from '../components/global/PageHeader';
import BottomNav from '../components/global/BottomNav';
import { toaster } from '../components/ui/toaster';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/profile');
  };

  return (
    <Box>
      <PageHeader PageTitle="Login" />

      <Box
        p={4}
        maxW="420px"
        mx="auto"
        bg="gray.50"
        minH="calc(100vh - 156px)"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="2xl" fontWeight="bold" mb={2}>
          Welcome Back
        </Text>

        <Text color="gray.500" mb={6}>
          Please log in to continue
        </Text>

        <VStack gap={4} w="100%">
          <HStack w="100%" alignItems="center">
            <Text w="90px" fontWeight="medium">
              Username
            </Text>
            <Box
              w="100%"
              p={2}
              bg="gray.100"
              borderRadius="md"
              color="gray.700"
            >
              demo
            </Box>
          </HStack>

          <HStack w="100%" alignItems="center">
            <Text w="90px" fontWeight="medium">
              Password
            </Text>
            <Box
              w="100%"
              p={2}
              bg="gray.100"
              borderRadius="md"
              color="gray.700"
            >
              ••••••
            </Box>
          </HStack>

          <Button
            w="100%"
            bg="#27AE60"
            color="white"
            borderRadius="md"
            onClick={handleLogin}
          >
            Login
          </Button>

          <Button
            w="100%"
            bg="gray.300"
            color="gray.600"
            borderRadius="md"
            cursor="not-allowed"
            _hover={{ bg: 'gray.300' }}
            isDisabled
          >
            Register (Coming Soon)
          </Button>
        </VStack>
      </Box>

      <BottomNav />
    </Box>
  );
};
export default LoginPage;
