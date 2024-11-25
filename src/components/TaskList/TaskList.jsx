import './TaskList.css';
import Task from '../Task';

const TaskList = ({ todos, onDeleted, onToggleDone }) => {
  return (
    <ul id="ul-task" className="todo-list">
      {todos.map((item) => {
        const { id, ...itemProps } = item;
        return <Task key={id} {...itemProps} onDeleted={() => onDeleted(id)} onToggleDone={() => onToggleDone(id)} />;
      })}
    </ul>
  );
};

export default TaskList;
