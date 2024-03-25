import React from 'react';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { Footer } from './Footer';
import { ErrorMessages } from './ErrorMessages';

export const TodoApp: React.FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList />
        {/* Hide the footer if there are no todos */}
        <Footer />
      </div>

      <ErrorMessages />
    </div>
  );
};
