import { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';

const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
};

const initialState = [];

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleTodo = (todo) => {
    const action = {
      type: '[TODO] Add Todo',
      payload: todo,
    };

    dispatch(action); // el dispatch es para mandar el action al todoReducer
  };

  const handleDeleteTodo = (id) => {
    dispatch({
      type: '[TODO] Remove Todo',
      payload: id,
    });
  };

  const handleToggleTodo = (id) => {
    // console.log({ id });
    dispatch({
      type: '[TODO] Toggle Todo',
      payload: id,
    });
  };

  return {
    todos,
    handleTodo,
    handleDeleteTodo,
    handleToggleTodo,
    todoCount: todos.length,
    todoPending: todos.filter((todo) => !todo.done).length,
  };
};
