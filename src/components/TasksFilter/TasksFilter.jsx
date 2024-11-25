import { Component } from 'react';

import './TasksFilter.css';

export default class TasksFilter extends Component {
  state = {
    arr: 1,
  };

  render() {
    const { showDone, showActive, showAll, filter } = this.props;
    let classNameAll = 'view';
    let classNameActive = 'view';
    let classNameDone = 'view';

    if (filter[0] === 'all') {
      classNameAll += ' selected';
    }
    if (filter[0] === 'active') {
      classNameActive += ' selected';
    }

    if (filter[0] === 'done') {
      classNameDone += ' selected';
    }

    return (
      <ul className="filters">
        <li>
          <button className={classNameAll} onClick={showAll}>
            All
          </button>
        </li>
        <li>
          <button className={classNameActive} onClick={showActive}>
            Active
          </button>
        </li>
        <li>
          <button className={classNameDone} onClick={showDone}>
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
