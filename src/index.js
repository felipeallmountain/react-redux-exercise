import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';

import TodoList from './TodoList.js';
import AddTodo from './AddTodo.js';
import Footer from './Footer.js';

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        id: state.id,
        text: state.text,
        completed: !state.completed
      }
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const store = createStore(todoApp);

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    default:
      return todos;
  }
}

let nextTodoId = 0;

class TodoApp extends Component {
  onAddClick = (text) => {
    store.dispatch({
      type: 'ADD_TODO',
      id: nextTodoId++,
      text
    });
  }

  onToggleClick = (id) => {
    store.dispatch({
      type: 'TOGGLE_TODO',
      id
    });
  }

  onFilterClick = (filter) => {
    store.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter
    });
  }

  render() {
    const { todos, visibilityFilter } = this.props;
    return (
      <div>
        <AddTodo
          onAddClick={
            text => this.onAddClick(text)
          }
        />
        
        <TodoList
          todos={getVisibleTodos(todos, visibilityFilter)}
          onTodoClick={
            id => this.onToggleClick(id)
          }
        />

        <Footer 
          visibilityFilter={visibilityFilter}
          onFilterClick={
            filter => this.onFilterClick(filter)
          }
        />

                
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()}/>, 
    document.getElementById('root'));
}

store.subscribe(render);
render();
