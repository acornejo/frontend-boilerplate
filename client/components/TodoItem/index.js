import React from 'react';
import classnames from 'classnames';
import style from './style.css';

class TodoItem extends React.Component {
  render() {
    const {todo, completeTodo, deleteTodo} = this.props
    const classes = classnames({
      [style.completed]: todo.completed
    }, style.normal);

    return (
      <li className={classes}>
        <div className={style.view}>
          <input className={style.toggle}
             type="checkbox"
             checked={todo.completed}
             onChange={() => completeTodo(todo.id)} />

          <label>{todo.text}</label>
          <button className={style.destroy} onClick={() => deleteTodo(todo.id)} />
        </div>
      </li>
    );
  }
};

export default TodoItem;
