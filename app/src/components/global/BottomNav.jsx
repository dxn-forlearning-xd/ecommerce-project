import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMessages } from '../../context/MessageContext';
import {
  FiHome,
  FiMessageSquare,
  FiShoppingCart,
  FiUser,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasNewMessages } = useMessages();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg="white"
      borderTop="1px solid #eaeaea"
      zIndex="1000"
      maxW="420px"
      mx="auto"
    >
      <Flex justify="space-around" align="center" p={2}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton
            aria-label="首页"
            fontSize="24px"
            color={location.pathname === '/' ? '#187a46' : 'black'}
            onClick={() => {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <FiHome />
          </IconButton>
          <Text color={location.pathname === '/' ? '#187a46' : 'black'}>
            首页
          </Text>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          position="relative"
        >
          <IconButton
            aria-label="消息"
            fontSize="28px"
            color={location.pathname === '/messages' ? '#187a46' : 'black'}
            onClick={() => navigate('/messages')}
          >
            <FiMessageSquare />
          </IconButton>
          {hasNewMessages && isLoggedIn && (
            <Box
              position="absolute"
              top="2px"
              right="4px"
              w="8px"
              h="8px"
              bg="red.500"
              borderRadius="full"
            />
          )}
          <Text color={location.pathname === '/messages' ? '#187a46' : 'black'}>
            消息
          </Text>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton
            aria-label="购物车"
            fontSize="24px"
            color={location.pathname === '/cart' ? '#187a46' : 'black'}
            onClick={() => navigate('/cart')}
          >
            <FiShoppingCart />
          </IconButton>
          <Text color={location.pathname === '/cart' ? '#187a46' : 'black'}>
            购物车
          </Text>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton
            aria-label="个人主页"
            fontSize="24px"
            color={
              ['/profile', '/login'].includes(location.pathname)
                ? '#187a46'
                : 'black'
            }
            onClick={() => navigate(isLoggedIn ? '/profile' : '/login')}
          >
            <FiUser />
          </IconButton>
          <Text
            color={
              ['/profile', '/login'].includes(location.pathname)
                ? '#187a46'
                : 'black'
            }
          >
            个人主页
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default BottomNav;
