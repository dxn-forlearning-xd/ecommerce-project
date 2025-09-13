import { Box, Text, VStack, HStack } from '@chakra-ui/react';
import PageHeader from '../components/global/PageHeader';
import BottomNav from '../components/global/BottomNav';
import { useMessages } from '../context/MessageContext';
import { useAuth } from '../context/AuthContext';

const MessagesPage = () => {
  const { isLoggedIn } = useAuth();
  const { messages, markAsRead } = useMessages();

  return (
    <>
      <PageHeader PageTitle="消息" />
      <Box
        p={4}
        maxW="420px"
        mx="auto"
        bg="gray.50"
        style={{ height: 'calc(100vh - 72px)' }}
      >
        {!isLoggedIn ? (
          <Text color="gray.500" textAlign="center" mt={10}>
            请先登录
          </Text>
        ) : messages.length === 0 ? (
          <Text color="gray.500" textAlign="center" mt={10}>
            这里还没有任何消息。
          </Text>
        ) : (
          <VStack spacing={4} align="stretch">
            {messages.map((msg) => (
              <Box
                key={msg.id}
                p={3}
                bg="white"
                borderRadius="md"
                boxShadow="0 2px 6px rgba(0,0,0,0.05)"
                onClick={() => markAsRead(msg.id)}
              >
                <HStack justify="space-between">
                  <Text fontWeight="medium">{msg.title}</Text>
                  <Text fontSize="sm" color="gray.400" position="relative">
                    {msg.time}
                    {msg.isNew && (
                      <Box
                        position="absolute"
                        top="-10px"
                        right="-12px"
                        w="8px"
                        h="8px"
                        bg="red.500"
                        borderRadius="full"
                      />
                    )}
                  </Text>
                </HStack>
              </Box>
            ))}
          </VStack>
        )}
      </Box>
      <BottomNav />
    </>
  );
};

export default MessagesPage;
