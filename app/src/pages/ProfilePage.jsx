import { Box, Text, Image, Flex, VStack, Button } from '@chakra-ui/react';
import PageHeader from '../components/global/PageHeader';
import BottomNav from '../components/global/BottomNav';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const user = {
    name: 'Demo',
    avatar: 'avatar.jpg',
  };

  return (
    <Box>
      <PageHeader PageTitle="Profile" />

      <Box p={4} maxW="420px" mx="auto" bg="gray.50" minH="calc(100vh - 72px)">
        <Flex direction="column" align="center" mb={6}>
          <Image
            src={user.avatar}
            alt={user.name}
            boxSize="80px"
            borderRadius="50%"
            objectFit="cover"
            mb={4}
          />
          <Text fontSize="2xl" fontWeight="bold">
            {user.name}
          </Text>
          <Text color="gray.500" mt={1}>
            Welcome Back!
          </Text>
        </Flex>

        <VStack spacing={4} mb={6}>
          <Button
            w="100%"
            bg="#27AE60"
            color="white"
            borderRadius="md"
            _hover={{ bg: '#219150' }}
            onClick={() => navigate('/orders')}
          >
            My order
          </Button>
        </VStack>

        <Button
          w="100%"
          bg="gray.300"
          borderRadius="md"
          _hover={{ bg: 'gray.400' }}
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Log out
        </Button>
      </Box>

      <BottomNav />
    </Box>
  );
};

export default ProfilePage;
