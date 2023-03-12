import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttpHook from '../../hooks/use-http-hook';
const NewTask = (props) => {
  const {isLoading, error, sendRequest: sentTaskRequest} = useHttpHook();

  const createTask = (taskText, data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sentTaskRequest({
      url: 'https://react-custom-hooks-ccf33-default-rtdb.firebaseio.com/tasks.json',
      method: 'POST',
      body: JSON.stringify({ text: taskText }),
      headers: {
        'Content-Type': 'application/json',
      },
    }, createTask.bind(null, taskText))
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
