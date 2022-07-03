import { useState } from 'react';
import { BiPlusCircle } from 'react-icons/bi';

import LogoImg from './assets/Logo.svg';
import ClipboardImg from './assets/Clipboard.png';

import { Task } from './components/Task';

import styles from './App.module.scss';

interface Task {
  id: string;
  text: string;
  complete: boolean;
}

function App() {
  const [totalTasks, setTotalTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [newTask, setNewTask] = useState('');

  function handleCreateTask() {
    if (newTask.length < 3) {
      alert('Nova tarefa não pode ter menos de 3 caracteres');
      return;
    }

    const task: Task = {
      id: Math.random().toString(36).slice(2),
      text: newTask,
      complete: false,
    };

    setTotalTasks([...totalTasks, task]);
    setNewTask('');
  }

  function handleDeleteTask(id: string) {
    const filterTasks = totalTasks.filter((task) => {
      if (task.id === id) {
        if (task.complete) {
          setCompletedTasks(completedTasks - 1);
        }

        return false;
      }

      return true;
    });

    setTotalTasks(filterTasks);
  }

  function handleFinishTask(id: string) {
    let completedTasksIncrement = 0;

    const newTotalTask = totalTasks.map((task) => {
      if (task.id === id) task.complete = !task.complete;
      if (task.complete) completedTasksIncrement += 1;

      return task;
    });

    setTotalTasks(newTotalTask);
    setCompletedTasks(completedTasksIncrement);
  }

  return (
    <div className={styles.app}>
      <header>
        <img src={LogoImg} alt='ToDo' />
      </header>
      <div className={styles.content}>
        <div className={styles.newTask}>
          <input
            type='text'
            placeholder='Adicione uma nova tarefa'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleCreateTask}>
            Criar <BiPlusCircle />
          </button>
        </div>

        <div className={styles.tasksContainer}>
          <header>
            <div className={styles.createdTasks}>
              <strong>Tarefas criadas</strong>
              <strong>{totalTasks.length}</strong>
            </div>
            <div className={styles.completedTasks}>
              <strong>Concluídas</strong>
              <strong>
                {completedTasks} de {totalTasks.length}
              </strong>
            </div>
          </header>

          {totalTasks.length <= 0 ? (
            <div className={styles.noTasksWrapper}>
              <img src={ClipboardImg} alt='Prancheta vazia' />
              <span>Você ainda não tem tarefas cadastradas</span>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          ) : (
            <div className={styles.tasksWrapper}>
              {totalTasks.map((task) => (
                <Task
                  key={task.id}
                  id={task.id}
                  text={task.text}
                  deleteTask={handleDeleteTask}
                  finishTask={handleFinishTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
