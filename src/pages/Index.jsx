import { useState } from 'react';
import { Box, Button, Container, Flex, Input, List, ListItem, Text, useToast } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const handleAddTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  return (
    <Container maxW="container.md" p={4}>
      <Flex as="nav" justify="space-between" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
      </Flex>
      <Box as="section" mb={4}>
        <Flex>
          <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
          <Button onClick={handleAddTask} ml={2}>Add</Button>
        </Flex>
      </Box>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center" p={2} bg={task.completed ? 'green.100' : 'gray.100'}>
            <Text as={task.completed ? 's' : 'span'}>{task.text}</Text>
            <Flex>
              <Button onClick={() => handleToggleComplete(task.id)} size="sm" colorScheme={task.completed ? 'pink' : 'green'}>
                <FaCheckCircle />
              </Button>
              <Button onClick={() => handleDeleteTask(task.id)} size="sm" colorScheme="red" ml={2}>
                <FaTrash />
              </Button>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Index;