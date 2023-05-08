import { useEffect, useState } from 'react';
import { Container, Divider } from '@mui/material';
import { Footer, Header, TodoForm, TodoList } from './components';
import { TodoItemProps } from './lib';
import './App.css';

export default function App() {
  const [todoList, setTodoList] = useState<TodoItemProps[]>(() => {
    const localTodoList = localStorage.getItem('LOCAL_TODO_LIST');
    if (localTodoList == null) {
      return [];
    }
    return JSON.parse(localTodoList);
  });

  useEffect(() => {
    localStorage.setItem('LOCAL_TODO_LIST', JSON.stringify(todoList));
  }, [todoList]);

  const toggleTodo = (id: string, completed: boolean) => {
    setTodoList((currentTodos: TodoItemProps[]) => {
      return currentTodos.map((todo: TodoItemProps) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  };

  const deleteTodo = (id: string) => {
    setTodoList((currentTodos: TodoItemProps[]) => {
      return currentTodos.filter((todo: TodoItemProps) => todo.id !== id);
    });
  };

  return (
    <Container
      className='todo-wrapper'
      sx={{
        maxHeight: '100dvh',
        display: 'flex',
      }}
      maxWidth="sm"
    >
      <Header />
      <TodoForm addTodoCallback={setTodoList} />
      <Divider sx={{ my: 2 }} />
      <TodoList {...{ todoList, toggleTodo, deleteTodo }} />
      <Footer />
    </Container>
  );
}
