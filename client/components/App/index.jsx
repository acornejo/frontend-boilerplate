import React from 'react';
import TodoTextInput from '../TodoTextInput';
import TodoItem from '../TodoItem';
import { Link } from 'react-router';
import style from './style.css';

class App extends React.Component {
  handleSave(text) {
    if (text.length) {
      this.props.actions.addTodo(text);
    }
  }

  render() {
    const { todos, actions } = this.props;
    return (
      <div className={style.container}>
        <header>
          <h1>Todo List</h1>
          <TodoTextInput
            newTodo
            onSave={::this.handleSave}
            placeholder="what to do next?" />
        </header>
        <section className={style.main}>
          <ul className={style.normal}>
            {todos.map(todo =>
              <TodoItem key={todo.id} todo={todo} {...actions} />
            )}
          </ul>
        </section>
        <footer>
          <Link to="/about">about</Link>
        </footer>
      </div>
    );
  }
};

export default App;
