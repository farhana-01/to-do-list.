document.addEventListener('DOMContentLoaded', loadTasks);

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', modifyTask);

function addTask(e) {
  e.preventDefault();

  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(taskText));
  
  const editBtn = document.createElement('span');
  editBtn.className = 'edit';
  editBtn.appendChild(document.createTextNode('Edit'));
  li.appendChild(editBtn);

  const deleteBtn = document.createElement('span');
  deleteBtn.className = 'delete';
  deleteBtn.appendChild(document.createTextNode('Delete'));
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
  
  saveTask(taskText);

  taskInput.value = '';
}

function modifyTask(e) {
  if (e.target.classList.contains('edit')) {
    const li = e.target.parentElement;
    const taskText = li.firstChild.textContent;

    taskInput.value = taskText;
    taskList.removeChild(li);
    removeTask(taskText);
  } else if (e.target.classList.contains('delete')) {
    const li = e.target.parentElement;
    const taskText = li.firstChild.textContent;

    taskList.removeChild(li);
    removeTask(taskText);
  }
}

function saveTask(task) {
  let tasks = getTasks();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(task) {
  let tasks = getTasks();
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
  let tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(task));
    
    const editBtn = document.createElement('span');
    editBtn.className = 'edit';
    editBtn.appendChild(document.createTextNode('Edit'));
    li.appendChild(editBtn);

    const deleteBtn = document.createElement('span');
    deleteBtn.className = 'delete';
    deleteBtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}





