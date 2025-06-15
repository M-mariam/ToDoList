
interface Task {
  title: string;
  description: string;
  completed: boolean;
}

const taskTitle = document.getElementById('task-title') as HTMLInputElement;
const taskDescription = document.getElementById('task-description') as HTMLInputElement;
const addBtn = document.getElementById('add-btn') as HTMLButtonElement;
const updateBtn = document.getElementById('update-btn') as HTMLButtonElement;
const messageEl = document.getElementById('message')!;
const dataContainer = document.getElementById('data')!;

let Tasks: Task[] = [];
let taskIndex: number = -1;

const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
  Tasks = JSON.parse(storedTasks);
  displayTasks();
}

// Add Task
function AddTask(): void {
  if (taskTitle.value.trim() === '' || taskDescription.value.trim() === '') {
    messageEl.textContent = 'Please write a task';
    return;
  }

  const task: Task = {
    title: taskTitle.value.trim(),
    description: taskDescription.value.trim(),
    completed: false,
  };

  Tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(Tasks));
  displayTasks();
  clearInputs();
}

addBtn.addEventListener('click', AddTask);

// Display Tasks
function displayTasks(): void {
  let cartona = '';

  for (let i = 0; i < Tasks.length; i++) {
    const completedClass = Tasks[i].completed ? 'text-decoration-line-through opacity-75 text-success' : '';

    cartona += `
      <div class="  task-container d-flex rounded rounded-2 justify-content-between mb-1  py-1 px-3 align-items-center w-50 mx-auto">
        <div class="${completedClass}">
          <h3 class="text-capitalize text-light ">${Tasks[i].title}</h3>
          <p class="text-capitalize text-light p-0 m-0">${Tasks[i].description}</p>
        </div>
        <div>
          <button class="btn px-0 done" data-index="${i}">
            <i class="text-light fa-regular fa-circle-check"></i>
          </button>
          <button class="btn px-0 update" data-index="${i}">
            <i class="text-light fa-regular fa-pen-to-square"></i>
          </button>
          <button class="btn px-0 delete" data-index="${i}">
            <i class="text-light fa-regular fa-trash-can"></i>
          </button>
        </div>  
      </div>`;
  }

  dataContainer.innerHTML = cartona;

  document.querySelectorAll('.delete').forEach(btn =>
    btn.addEventListener('click', () => deleteTask(Number((btn as HTMLElement).dataset.index)))
  );

  document.querySelectorAll('.done').forEach(btn =>
    btn.addEventListener('click', () => taskCompleted(Number((btn as HTMLElement).dataset.index)))
  );

  document.querySelectorAll('.update').forEach(btn =>
    btn.addEventListener('click', () => setValues(Number((btn as HTMLElement).dataset.index)))
  );
}

// Clear input fields
function clearInputs(): void {
  taskTitle.value = '';
  taskDescription.value = '';
  // messageEl.textContent = '';
}

// Delete Task
function deleteTask(index: number): void {
  Tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(Tasks));
  displayTasks();
}

// Toggle Complete
function taskCompleted(index: number): void {
  Tasks[index].completed = !Tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(Tasks));
  displayTasks();
}

// Set values in input for update
function setValues(index: number): void {
  taskIndex = index;
  const task = Tasks[index];

  taskTitle.value = task.title;
  taskDescription.value = task.description;

  updateBtn.classList.remove( 'd-none');
  addBtn.style.display = 'none';
}

// Update Task
function updateTask(): void {
  if (taskIndex === -1) return;

  Tasks[taskIndex].title = taskTitle.value.trim();
  Tasks[taskIndex].description = taskDescription.value.trim();

  localStorage.setItem('tasks', JSON.stringify(Tasks));
  displayTasks();
  clearInputs();

  updateBtn.classList.add ('d-none');
  addBtn.style.display = 'block';
  taskIndex = -1;
}

updateBtn.addEventListener('click', updateTask);
