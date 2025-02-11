let tasks = [];

const getTasks = () => tasks;

let idTask = 0;

const addTask = (title) => {
  const newTask = {
    id: idTask++,
    title: title,
    finished: false,
  };
  tasks.push(newTask);
};

function deleteTask(id) {
  indexTask = tasks.findIndex((element) => element === id);
  tasks.splice(indexTask, 1);
  return true;
}

function editTask(id, title, finished) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    if (title !== undefined) task.title = title; // Atualiza o título, se fornecido
    if (finished !== undefined) task.finished = finished; // Atualiza o status, se fornecido
    return true; // Indica que a tarefa foi editada com sucesso
  }
  return false; // Indica que a tarefa não foi encontrada
}

module.exports = { getTasks, addTask, deleteTask, editTask };
