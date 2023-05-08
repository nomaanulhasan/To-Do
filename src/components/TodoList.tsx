import { Container, Stack } from '@mui/material';
import TodoListItem from './TodoListItem';
import { TodoItemProps } from '../lib';

interface TodoListProps {
  todoList: TodoItemProps[];
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
}

export default function TodoList({
  todoList,
  toggleTodo,
  deleteTodo
}: TodoListProps) {
  return (
    <Container
      sx={{ flexGrow: 1, overflowY: 'auto', marginBottom: '70px', py: 1 }}
    >
      {todoList.length === 0 && 'No Todos'}

      <Stack spacing={2}>
        {todoList.map(todoItem => (
          <TodoListItem
            key={todoItem.id}
            {...todoItem}
            {...{ toggleTodo, deleteTodo }}
          />
        ))}
      </Stack>
    </Container>
  );
}
