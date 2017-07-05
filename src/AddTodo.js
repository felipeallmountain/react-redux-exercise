import React from 'react';

class AddTodo extends React.Component {
  render() {

    const { onAddClick } = this.props;
    let textInput;
    return (
      <div>
        <input ref={node => {
          textInput = node;
          }}
        />
        <button
          onClick={() => {
            onAddClick(textInput.value);
            textInput.value = '';
          }}
        >
          Add Todo
        </button>
      </div>

    );
  }
}

export default AddTodo;