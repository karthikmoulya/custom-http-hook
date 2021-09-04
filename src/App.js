import { useEffect, useState } from 'react';
import useHttp from './components/hooks/use-http';
import NewTask from './components/NewTask/NewTask';
import Tasks from './components/Tasks/Tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTasks = taskObj => {
      const loadedTasks = [];

      for (const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      }

      setTasks(loadedTasks);
    };
    fetchTasks(
      {
        url: 'https://react-http-348f1-default-rtdb.firebaseio.com/tasks.json',
      },
      transformTasks
    );
  }, [fetchTasks]);

  const taskAddHandler = task => {
    setTasks(prevTasks => prevTasks.concat(task));
  };
  return (
    <>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </>
  );
};

export default App;
