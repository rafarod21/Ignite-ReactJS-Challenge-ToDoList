import { useState } from 'react';
import { HiOutlineTrash, HiCheck } from 'react-icons/hi';

import styles from './styles.module.scss';

interface TaskProps {
  id: string;
  text: string;
  deleteTask: (id: string) => void;
  finishTask: (id: string) => void;
}

export function Task({ id, text, deleteTask, finishTask }: TaskProps) {
  const [checked, setChecked] = useState(false);

  function handleCheck() {
    setChecked(!checked);

    finishTask(id);
  }

  return (
    <div className={styles.taskContainer}>
      <button
        onClick={handleCheck}
        className={checked ? styles.checked : styles.noChecked}
      >
        {checked && <HiCheck />}
      </button>
      <span className={checked ? styles.through : styles.noThrough}>
        {text}
      </span>
      <button onClick={() => deleteTask(id)}>
        <HiOutlineTrash />
      </button>
    </div>
  );
}
