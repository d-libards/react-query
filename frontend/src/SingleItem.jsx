import { useDeleteTask, useEditTask } from './reactQueryCustomHooks';

const SingleItem = ({ item }) => {
  const { editTask } = useEditTask();
  const { deleteTask, deleteLoading } = useDeleteTask();

  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => editTask({ isDone: !item.isDone, taskId: item.id })}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}
      >
        {item.title}
      </p>
      <button
        className="btn remove-btn"
        type="button"
        disabled={deleteLoading}
        onClick={() => deleteTask(item.id)}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
