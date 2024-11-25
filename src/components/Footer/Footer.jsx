import { Component } from 'react';

import TasksFilter from '../TasksFilter';

import './Footer.css';

export default class Footer extends Component {
  render() {
    const { todoCount, showDone, showActive, showAll, filter } = this.props;
    const { onDeleteCompleted } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{todoCount} items left</span>
        <TasksFilter filter={filter} showAll={showAll} showDone={showDone} showActive={showActive} />
        <button className="clear-completed" onClick={onDeleteCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
