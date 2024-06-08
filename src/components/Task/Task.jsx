import React, { useState } from 'react';
import styles from './Task.module.css';
import removeIcon from '../../assets/remove.png';
import editIcon from '../../assets/edit.png';

export default function Task({taskName,colorIndex,taskId,deleteTask,editTask}) {
  const colors = ['orangeColor','blueColor','redColor'];
  const [isEditing,setIsEditing] = useState(false);
  const [newTaskName,setNewTaskName] = useState(taskName);
  const [editTaskId, setEditTaskId] = useState(null);

  const handleEditTask = (taskId) =>{
    setIsEditing(true);
    setNewTaskName(taskName);
    setEditTaskId(taskId);
  }

  const handleSaveTask = () =>{
    editTask(editTaskId,newTaskName);
    setIsEditing(false);
  }

  return (
    <>
      <div className={styles.taskBox}>
        <p className={`${styles.taskName} ${styles[colors[colorIndex % colors.length]]}`}  >
          {isEditing ? (
            <input type="text" onBlur={handleSaveTask} value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} />
          ):(
            <span className={styles.taskNameSpan}>{taskName}</span>
          )}
          <span>
            <img src={removeIcon} data-taskid={taskId} alt="RemoveIcon" onClick={(e) => deleteTask(e.target.dataset.taskid)} />
            <img src={editIcon} data-taskid={taskId} alt="EditIcon" onClick={(e) => handleEditTask(e.target.dataset.taskid)} />
          </span>
        </p>
      </div>
    </>
  )
}
