import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttpHook from './hooks/use-http-hook';
function App() {
  const [tasks, setTasks] = useState([]);
  const { isLoading, error , sendRequest: fetchRequest } = useHttpHook();
  useEffect(() => {
    const transformFunction = (data) => {
      const loadedTasks = [];
      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }
      setTasks(loadedTasks);
    }

    fetchRequest({ url: 'https://react-custom-hooks-ccf33-default-rtdb.firebaseio.com/tasks.json' }, transformFunction);
  }, [fetchRequest]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task)); // this is not required since we are 
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchRequest}
      />
    </React.Fragment>
  );
}

export default App;
