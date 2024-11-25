import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import { Component } from 'react';

import './Task.css';
import '../TaskList/TaskList.css';

export default class Task extends Component {
  static defaultProps = {
    description: 'Default content (defaultProps)',
  };

  static propTypes = {
    description: PropTypes.string,
  };
  state = {
    editStatus: false,
    description: this.props.description,
  };
  setText = (text) => {
    this.setState({ editStatus: true });
    this.setState({ description: text });
  };
  editTaskText = () => {
    this.setState((state) => {
      return {
        editStatus: !state.editStatus,
      };
    });
  };
  keyUpEdit = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      if (this.state.description.trim() === '') return;
      this.setState({ editStatus: false });
    }
  };
  checkboxHandler = (e) => {
    this.setState({
      checked: e.target.checked,
    });
  };

  render() {
    const { id, created, onDeleted, onToggleDone, done } = this.props;
    let classNames = 'view';
    if (done) {
      classNames += ' completed';
    }

    return (
      <li key={id} className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onClick={onToggleDone}
            checked={done}
            onChange={this.checkboxHandler}
          />
          <label>
            {this.state.editStatus ? (
              <input
                type="text"
                className="input-edit"
                onKeyUp={this.keyUpEdit}
                onChange={(e) => this.setText(e.target.value)}
                value={this.state.description}
              ></input>
            ) : (
              <span className="description" onClick={onToggleDone}>
                {this.state.description}
              </span>
            )}
            <span className="created">{formatDistanceToNow(created)}</span>
          </label>
          <button className="icon icon-edit" onClick={this.editTaskText} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
      </li>
    );
  }
}
