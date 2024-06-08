import React,{useState} from 'react'
import styles from './FormTask.module.css';

export default function FormTask({addTask}) {
  const [taskName,setTaskName] = useState('');
  const [isLoading,setIsLoading] = useState(false);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setIsLoading(true);
    await addTask(taskName);
    setIsLoading(false);
    setTaskName('');
  }

  return (
    <form onSubmit={(e)=> handleSubmit(e)} className={styles.formTask}>
      <input value={taskName} onChange={(e)=> setTaskName(e.target.value)} className={styles.inputText} placeholder='Qual sua próxima tarefa?' type="text" />
      <button type='submit' className={styles.buttonForm}>{isLoading ? 'Adicionando...': 'Adicionar'}</button>
    </form>
  )
}
