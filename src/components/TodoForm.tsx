import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import {
  InputAdornment,
  IconButton,
  TextField,
  Container,
  FormGroup,
  Hidden
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { TodoItemProps } from '../lib';

interface TodoFormProps {
  addTodoCallback: Dispatch<SetStateAction<TodoItemProps[]>>;
}

export default function TodoForm({ addTodoCallback }: TodoFormProps) {
  const [todoItemText, setTodoItemText] = useState('');
  const emptyTodoItem = { id: crypto.randomUUID(), completed: false };

  const handleAddNewTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoItemText.length === 0) return;

    addTodoCallback(currentTodoList => [
      ...currentTodoList,
      { ...emptyTodoItem, title: todoItemText }
    ]);

    setTodoItemText('');
  };

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
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Hidden mdUp>
                  <IconButton color='primary' type='submit' size='small'>
                    <AddIcon />
                  </IconButton>
                  </Hidden>
                </InputAdornment>
              )
            }}
          />
          <Hidden mdDown>
            <Button
              startIcon={<AddIcon />}
              variant='contained'
              type='submit'
              size='large'
            >
              Add New
            </Button>
          </Hidden>
        </FormGroup>
      </form>
    </Container>
  );
}
