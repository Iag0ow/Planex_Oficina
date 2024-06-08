import api from "../utils/api";

const getTasks = async() =>{
  try {
    const response = await api.get('/tasks');
    return response;
  } catch (error) {
    return {
      status: error.response.data.statusCode || 500,
      message: error.response.data.message || 'Ocorreu um erro inesperado'
    }
  }
}
const postTask = async (taskName) =>{
  const obj = { description: taskName };
  try {
    const response = await api.post('/tasks',obj);
    return response;
  } catch (error) {
    return {
      status: error.response.data.statusCode || 500,
      message: error.response.data.message || 'Ocorreu um erro inesperado'
    }
  }
}

const updateTask = async (taskId,taskName) =>{
  const obj = { description: taskName };
  try {
    const response = await api.patch(`/tasks/${taskId}`,obj);
    return response;
  } catch (error) {
    return {
      status: error.response.data.statusCode || 500,
      message: error.response.data.message || 'Ocorreu um erro inesperado'
    }
  }
}

const deleteTask = async (taskId) =>{
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response;
  } catch (error) {
    return {
      status: error.response.data.statusCode || 500,
      message: error.response.data.message || 'Ocorreu um erro inesperado'
    }
  }
}

const deleteAllTasks = async () =>{
  try {
    const response = await api.delete(`/tasks`);
    return response;
  } catch (error) {
    return {
      status: error.response.data.statusCode || 500,
      message: error.response.data.message || 'Ocorreu um erro inesperado'
    }
  }
}


const user = {
  getTasks,
  postTask,
  updateTask,
  deleteTask,
  deleteAllTasks
}

export default user;