import { Component } from 'react';

import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';

import './App.css';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Third Task'),
      this.createTodoItem('Second Task'),
      this.createTodoItem('First Task'),
    ],
    filter: 'all',
  };

  createTodoItem(text) {
    return {
      description: text,
      created: new Date(),
      done: false,
      id: this.maxId++,
    };
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArray = [newItem, ...todoData];
      return {
        todoData: newArray,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const newItem = { ...arr[idx], [propName]: !arr[idx][propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      };
    });
  };

  deleteCompletedItems = () => {
    this.setState(({ todoData }) => {
      let newArr = [];
      todoData.forEach((item) => {
        if (item.done === false) {
          newArr.push(item);
        }
      });
      return {
        todoData: newArr,
      };
    });
  };

  showDone = () => {
    this.setState(() => {
      return { filter: 'done' };
    });
  };

  showActive = () => {
    this.setState(() => {
      return { filter: 'active' };
    });
  };

  showAll = () => {
    this.setState(() => {
      return { filter: 'all' };
    });
  };

  render() {
    const { todoData, filter } = this.state;
    const todoCount = todoData.filter((el) => !el.done).length;

    const filtering = () => {
      if (filter === 'done') {
        return [...todoData].filter((el) => el.done);
      } else if (filter === 'active') {
        return [...todoData].filter((el) => !el.done);
      } else return todoData;
    };

    return (
      <div>
        <NewTaskForm onItemAdded={this.addItem} />
        <TaskList todos={filtering()} onDeleted={this.deleteItem} onToggleDone={this.onToggleDone} />
        <Footer
          showActive={this.showActive}
          showDone={this.showDone}
          showAll={this.showAll}
          filter={this.state.filter}
          todoCount={todoCount}
          onDeleteCompleted={this.deleteCompletedItems}
        />
      </div>
    );
  }
}
