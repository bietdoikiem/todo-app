import { DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  Container,
  FormControl,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import TodoUpdateModal from '../components/TodoUpdateModal';
import AuthContext from '../context/AuthContext';

function Todos() {
  const [todos, setTodos] = useState([]);
  const toast = useToast();
  const { user } = useContext(AuthContext);

  const getTodos = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/todo/user/${user.userId}`
      );
      setTodos(result.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteTodo = async (id) => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/todo/delete/${id}`,
          {
            headers: {
              jwt_token: token,
            },
          }
        );
        getTodos();
        toast({
          title: 'Todo deleted.',
          status: 'success',
          duration: 1000,
          isClosable: true,
        });
      } else {
        console.log('Auth error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (description, token) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/todo/add`,
        description,
        {
          headers: {
            jwt_token: token,
          },
        }
      );
      getTodos();
      toast({
        title: 'Todo added.',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const formik = useFormik({
    initialValues: {
      description: '',
    },
    onSubmit: async (values) => {
      const token = localStorage.getItem('token');
      try {
        if (token) {
          await addTodo(values, token);
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  });
  useEffect(() => {
    getTodos();
  }, [user.userId]);

  return (
    <Container h={'100vh'} maxW="container.lg" justifyContent={'center'}>
      <Heading size={'2xl'} margin={'5'}>
        Todos
      </Heading>
      <FormControl>
        <form onSubmit={formik.handleSubmit}>
          <InputGroup size={'md'}>
            <Input
              onBlur={formik.handleBlur}
              value={formik.values.description}
              name="description"
              onChange={formik.handleChange}
              placeholder="Todo description"
              required
              autoComplete="off"
            />
            <InputRightElement width="6rem">
              <Button type="submit" colorScheme={'green'} size="md">
                Add Todo
              </Button>
            </InputRightElement>
          </InputGroup>
        </form>
      </FormControl>

      <Table variant="striped" size={'lg'}>
        <Thead>
          <Tr>
            <Th fontSize={'2xl'} textAlign={'center'}>
              Todo
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {todos.map((todo) => (
            <Tr key={todo.todo_id}>
              <Td textAlign={'center'}>
                <Text as={'b'} fontSize={'2xl'}>
                  {todo.description}
                </Text>
              </Td>
              <Td>
                <Tooltip label={'Delete'} hasArrow>
                  <IconButton
                    margin={'-1.5'}
                    size={'md'}
                    fontSize={'x-large'}
                    icon={<DeleteIcon />}
                    bg={'red.500'}
                    color={'white'}
                    width={'50%'}
                    _hover={{
                      bg: 'red.400',
                    }}
                    onClick={() => {
                      deleteTodo(todo.todo_id);
                    }}
                  />
                </Tooltip>
              </Td>
              <Td>
                <TodoUpdateModal todo_id={todo.todo_id} getTodos={getTodos} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
}

export default Todos;
