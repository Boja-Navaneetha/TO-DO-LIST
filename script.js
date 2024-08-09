const taskInput = document.querySelector('.task-input');
const statusInput = document.querySelector('.status-input');
const deadlineInput = document.querySelector('.deadline-input');
const addButton = document.querySelector('.add-button');
const todosHtml = document.querySelector('.todos');
let todosJson = JSON.parse(localStorage.getItem('todos')) || [];

showTodos();

function getTodoHtml(todo, index) {
  return /* html */ `
    <tr>
      <td>${todo.name}</td>
      <td>${todo.status}</td>
      <td>${todo.deadline}</td>
      <td class="actions">
        <button class="edit" onclick="editTask(${index})"><i class="fa fa-pencil-alt"></i> Edit</button>
        <button class="delete" onclick="remove(${index})"><i class="fa fa-trash-alt"></i> Delete</button>
      </td>
    </tr>
  `;
}

function showTodos() {
  if (todosJson.length === 0) {
    todosHtml.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 20px;">No tasks available</td></tr>';
  } else {
    todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
  }
}

function addTodo() {
  const task = taskInput.value.trim();
  const status = statusInput.value.trim();
  const deadline = deadlineInput.value.trim();

  if (task && status && deadline) {
    todosJson.unshift({ name: task, status: status, deadline: deadline });
    localStorage.setItem('todos', JSON.stringify(todosJson));
    taskInput.value = '';
    statusInput.value = '';
    deadlineInput.value = '';
    showTodos();
  }
}

addButton.addEventListener('click', addTodo);

function editTask(index) {
  const task = todosJson[index];
  taskInput.value = task.name;
  statusInput.value = task.status;
  deadlineInput.value = task.deadline;

  remove(index);
}

function remove(index) {
  todosJson.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todosJson));
  showTodos();
}
