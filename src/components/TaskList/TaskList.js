import './TaskList.css';
import Task from '../Task';

const TaskList = ({ todos, onDeleted, onToggleDone }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return <Task key={id} {...itemProps} onDeleted={() => onDeleted(id)} onToggleDone={() => onToggleDone(id)} />;
  });

  return (
    <ul id="ul-task" className="todo-list">
      {elements}
    </ul>
  );
};

export default TaskList;
