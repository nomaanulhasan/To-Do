import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import {
  Button,
  Container,
  FormGroup,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TodoItemProps } from '../lib';

interface TodoFormProps {
  addTodoCallback: Dispatch<SetStateAction<TodoItemProps[]>>;
}

export default function TodoForm({ addTodoCallback }: TodoFormProps) {
  const [todoItemText, setTodoItemText] = useState('');

  const handleAddNewTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoItemText.length === 0) return;

    addTodoCallback(currentTodoList => [
      ...currentTodoList,
      { id: crypto.randomUUID(), completed: false, title: todoItemText }
    ]);

    setTodoItemText('');
  };

  const mobileSubmitButton = (
    <InputAdornment position='end'>
      <IconButton
        sx={{ display: { xs: 'inline-flex', md: 'none' } }}
        color='primary'
        type='submit'
        size='small'
      >
        <AddIcon />
      </IconButton>
    </InputAdornment>
  );

  return (
    <Container sx={{ mt: 10, py: 1 }}>
      <form onSubmit={handleAddNewTodo}>
        <FormGroup
          sx={{ justifyContent: 'center', flexWrap: 'nowrap', columnGap: 2 }}
          row
        >
          <TextField
            onChange={e => setTodoItemText(e.target.value)}
            sx={{ flexGrow: 1, backgroundColor: 'white' }}
            placeholder='Write something here'
            value={todoItemText}
            label='Enter Todo Title'
            variant='outlined'
            slotProps={{ input: { endAdornment: mobileSubmitButton } }}
          />
          <Button
            sx={{ display: { xs: 'none', md: 'inline-flex' } }}
            startIcon={<AddIcon />}
            variant='contained'
            type='submit'
            size='large'
          >
            Add New
          </Button>
        </FormGroup>
      </form>
    </Container>
  );
}
