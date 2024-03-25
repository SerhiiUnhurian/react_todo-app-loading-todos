import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';
import { FilterOption } from '../../types/FilterOption';
import { getTodos } from '../../api/todos';

const initialTodos: Todo[] = [];

interface TodosContextType {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  filterOption: FilterOption,
  setFilterOption: (filterOption: FilterOption) => void,
  USER_ID: number,
  errorMessage: string,
  setErrorMessage: (errorMessage: string) => void,
}

export const TodosContext = React.createContext<TodosContextType>({
  todos: initialTodos,
  setTodos: () => {},
  filterOption: FilterOption.All,
  setFilterOption: () => {},
  USER_ID: 12068,
  errorMessage: '',
  setErrorMessage: () => {},
});

type Props = {
  children : React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterOption, setFilterOption]
  = useState<FilterOption>(FilterOption.All);
  const [errorMessage, setErrorMessage] = useState('');
  const USER_ID = 12068;

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  const value = useMemo(() => ({
    todos,
    setTodos,
    filterOption,
    setFilterOption,
    errorMessage,
    setErrorMessage,
    USER_ID,
  }), [todos, errorMessage, filterOption]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
