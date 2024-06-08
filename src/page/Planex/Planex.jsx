import React,{useEffect,useState} from 'react';
import styles from './Planex.module.css';
import FormTask from '../../components/FormTask/FormTask';
import Task from '../../components/Task/Task';
import user from '../../services/user';

export default function Planex() {
  const [isLoading,setIsLoading] = useState(false);
  const [tasks,setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);

  async function fetchData(){
    setIsLoading(true);
    const { data } = await user.getTasks();
    setTasks(data);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTask = async(taskName)=>{
   const {data, status, message} = await user.postTask(taskName);
   if(status === 201){
    setTasks([...tasks,data]);
   } else{
    setErrorMessage(message);
    setTimeout(()=>{
      setErrorMessage('');
    },3000)
   }
  }

  const handleEditTask = async(taskId,newTaskName)=>{
    const {status, message} = await user.updateTask(taskId,newTaskName);
    if(status !== 200){
     setErrorMessage(message);
     setTimeout(()=>{
      setErrorMessage('');
    },3000)
    } 
    fetchData();
   }

  const handleDeleteAll = async()=>{
  setIsLoading(true);
  const {status, message} = await user.deleteAllTasks();
    if(status === 204){
      setTasks([])
    } else{
      setErrorMessage(message);
      setTimeout(()=>{
        setErrorMessage('');
      },3000)
    }
    setIsLoading(false);
  }
  const handleDelete = async(taskId)=>{
    const {status, message} = await user.deleteTask(taskId);
    if(status === 204){
      setTasks(tasks.filter((task) => task._id !== taskId));
    } else{
      setErrorMessage(message);
      setTimeout(()=>{
        setErrorMessage('');
      },3000)
    }
    setIsLoading(false);
  }
  
  return (
    <>
      <section className={styles.containerPlanex}>
        <header className={styles.header}>
          <h1 className={styles.title}>PLAN<span>EX</span></h1>
          <p className={styles.subTitle}>Quais os planos para hoje?</p>
        </header>
        <FormTask addTask={handleAddTask} />
        {isLoading && <h1>Carregando...</h1>}
        {tasks && tasks.map( (task,index) =>{
          return <Task key={task._id}  taskName={task.description} colorIndex={index} 
                  taskId={task._id} deleteTask={handleDelete} editTask={handleEditTask} />
        } )}
        <div className={styles.inforMations}>
          <p>{tasks && tasks.length} Tarefas na lista</p>
          <button onClick={()=> handleDeleteAll()}>{isLoading ? 'Limpando...' : 'Limpar Lista'}</button>
        </div>
      </section>
    </>
  )
}
