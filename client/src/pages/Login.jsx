import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Login() {
  const { setAuth, auth, logout } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  const login = async (values) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        values
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const result = await login(values);
        if (result.jwtToken) {
          localStorage.setItem('token', result.jwtToken);
          setAuth(true);
          toast({
            title: 'Succesfully.',
            status: 'success',
            duration: 1000,
            isClosable: true,
          });
          console.log(auth);
          navigate('/todos');
        } else {
          toast({
            title: result.message,
            status: 'error',
            duration: 1000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Flex minH={'80vh'} align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          as="form"
          onSubmit={formik.handleSubmit}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={formik.handleChange}
                name="email"
                value={formik.values.email}
                required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={formik.handleChange}
                name="password"
                value={formik.values.password}
                required
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                type="submit"
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;
