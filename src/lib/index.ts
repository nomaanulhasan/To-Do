export interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoListItemActions {
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
}

export type TodoListItemProps = TodoItemProps & TodoListItemActions;

export interface FooterProps {
  showCopyright?: boolean;
}

export interface HeaderProps {
  showMenu?: boolean;
}
