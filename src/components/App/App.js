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
    filter: ['all'],
  };

  createTodoItem(text) {
    return {
      description: text,
      created: new Date(),
      done: false,
      id: this.maxId++,
      visible: true,
    };
  }

  addItem = (text) => {
    if (text.length > 0 && this.state.filter[0] !== 'done') {
      const newItem = this.createTodoItem(text);
      this.setState(({ todoData }) => {
        const newArray = [newItem, ...todoData];
        return {
          todoData: newArray,
        };
      });
    }
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
    if (this.state.filter[0] === 'active') {
      this.showActive();
    } else if (this.state.filter[0] === 'done') {
      this.showDone();
    }
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
    this.setState(({ todoData, filter }) => {
      let newArr = [...todoData];
      newArr.forEach((item) => {
        item.done ? (item.visible = true) : (item.visible = false);
      });

      let newFilter = [...filter];
      newFilter[0] = 'done';

      return {
        todoData: newArr,
        filter: newFilter,
      };
    });
  };

  showActive = () => {
    this.setState(({ todoData, filter }) => {
      let newArr = [...todoData];
      newArr.forEach((item) => {
        !item.done ? (item.visible = true) : (item.visible = false);
      });

      let newFilter = [...filter];
      newFilter[0] = 'active';

      return {
        todoData: newArr,
        filter: newFilter,
      };
    });
  };

  showAll = () => {
    this.setState(({ todoData, filter }) => {
      let newArr = [...todoData];
      newArr.forEach((item) => {
        item.visible = true;
      });

      let newFilter = [...filter];
      newFilter[0] = 'all';

      return {
        todoData: newArr,
        filter: newFilter,
      };
    });
  };

  render() {
    const { todoData } = this.state;
    const todoCount = todoData.length - todoData.filter((el) => el.done).length;

    return (
      <div>
        <NewTaskForm onItemAdded={this.addItem} />
        <TaskList todos={this.state.todoData} onDeleted={this.deleteItem} onToggleDone={this.onToggleDone} />
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
