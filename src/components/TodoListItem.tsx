import {
  IconButton,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TodoListItemProps } from '../lib';
import theme from '../assets/theme';

export default function TodoListItem({
  id,
  title,
  completed,
  toggleTodo,
  deleteTodo
}: TodoListItemProps) {
  return (
    <Paper
      sx={{
        boxShadow: `0px 2px 1px -1px rgba(0,0,0,0.05),
          0px 1px 1px 0px rgba(0,0,0,0.10),
          0px 1px 3px 0px rgba(0,0,0,0.06)`
      }}
    >
      <FormGroup
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'nowrap'
        }}
        row
      >
        <FormControlLabel
          label={title}
          sx={{
            textDecoration: completed ? 'line-through' : '',
            color: completed ? 'gray' : '',
            p: theme.spacing(1, 2),
            textAlign: 'left',
            flexGrow: 1,
          }}
          control={
            <Checkbox
              onChange={e => toggleTodo(id, e.target.checked)}
              defaultChecked={completed}
              name={id}
              id={id}
            />
          }
        />
        <IconButton
          sx={{ height: theme.spacing(5), width: theme.spacing(5), mr: 1 }}
          onClick={() => deleteTodo(id)}
          aria-label='delete'
          color='error'
        >
          <DeleteIcon />
        </IconButton>
      </FormGroup>
    </Paper>
  );
}
