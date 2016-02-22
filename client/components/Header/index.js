import React from 'react';
import TodoTextInput from '../TodoTextInput';

class Header extends React.Component {
  handleSave(text) {
    if (text.length) {
      this.props.addTodo(text);
    }
  }

  render() {
    return (
      <header>
        <h1>Todos</h1>
        <TodoTextInput
          newTodo
          onSave={::this.handleSave}
          placeholder="What needs to be done?" />
      </header>
    );
  }
}

export default Header;
