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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    let hasError = false;
    setUsernameError('');
    setPasswordError('');

    if (!username) {
      setUsernameError('请输入用户名');
      hasError = true;
    }

    if (!password) {
      setPasswordError('请输入密码');
      hasError = true;
    }

    if (hasError) return;

    if (username === 'demo' && password === '123456') {
      login();
      navigate('/profile');
    } else {
      setUsernameError('用户未注册，请使用：用户名demo，密码123456  进行登录');
      setPasswordError('用户未注册，请使用：用户名demo，密码123456  进行登录');
    }
  };

  return (
    <Box>
      <PageHeader PageTitle="登录" />

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
          欢迎来到 Demo 商城
        </Text>
        <Text color="gray.500" mb={6}>
          登录或注册开始购物
        </Text>

        <VStack gap={4} w="100%">
          <HStack w="100%" alignItems="center">
            <Text w="80px" fontWeight="medium">
              用户名
            </Text>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="demo"
              bg="gray.100"
              borderRadius="md"
              borderColor={usernameError ? 'red.500' : 'gray.200'}
            />
          </HStack>
          {usernameError && (
            <Text
              alignSelf="flex-start"
              color="red.500"
              fontSize="sm"
              ml="80px"
            >
              {usernameError}
            </Text>
          )}

          <HStack w="100%" alignItems="center">
            <Text w="80px" fontWeight="medium">
              密码
            </Text>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="123456"
              type="password"
              bg="gray.100"
              borderRadius="md"
              borderColor={passwordError ? 'red.500' : 'gray.200'}
            />
          </HStack>
          {passwordError && (
            <Text
              alignSelf="flex-start"
              color="red.500"
              fontSize="sm"
              ml="80px"
            >
              {passwordError}
            </Text>
          )}

          <Button
            w="100%"
            bg="#27AE60"
            color="white"
            borderRadius="md"
            onClick={handleLogin}
          >
            登录
          </Button>

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button w="100%" bg="gray.200" color="black" borderRadius="md">
                注册
              </Button>
            </Dialog.Trigger>

            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content
                  bg="white"
                  maxW="300px"
                  boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
                >
                  <Dialog.Header>
                    <Dialog.Title>注册（暂未开启）</Dialog.Title>
                    <Dialog.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                  </Dialog.Header>

                  <Dialog.Body>
                    <VStack spacing={4} mt={2}>
                      <HStack w="100%" alignItems="center">
                        <Text w="80px" fontWeight="medium">
                          用户名
                        </Text>
                        <Input
                          placeholder="demo"
                          bg="gray.100"
                          borderRadius="md"
                        />
                      </HStack>
                      <HStack w="100%" alignItems="center">
                        <Text w="80px" fontWeight="medium">
                          密码
                        </Text>
                        <Input
                          placeholder="123456"
                          type="password"
                          bg="gray.100"
                          borderRadius="md"
                        />
                      </HStack>
                      <HStack w="100%" alignItems="center">
                        <Text w="80px" fontWeight="medium">
                          邮箱
                        </Text>
                        <Input
                          placeholder="demo@mail.com"
                          bg="gray.100"
                          borderRadius="md"
                        />
                      </HStack>
                    </VStack>
                  </Dialog.Body>

                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button color="gray.500">取消</Button>
                    </Dialog.ActionTrigger>
                    <Button
                      color="gray.500"
                      variant="outline"
                      onClick={() =>
                        toaster.create({
                          title: '注册暂未开启',
                          description:
                            '请使用：用户名demo，密码123456  进行登录',
                          type: 'failed',
                          duration: 2000,
                        })
                      }
                    >
                      提交注册
                    </Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </VStack>
      </Box>

      <BottomNav />
    </Box>
  );
};

export default LoginPage;
