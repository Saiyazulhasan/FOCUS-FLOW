 // DOM Elements 
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Render todos on screen
function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = todo.text;

    const actions = document.createElement("div");
    actions.classList.add("actions");

    // Done button
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✓";
    doneBtn.classList.add("done");
    doneBtn.onclick = () => toggleComplete(index);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.classList.add("delete");
    deleteBtn.onclick = () => deleteTodo(index);

    actions.appendChild(doneBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    todoList.appendChild(li);
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

// Add new todo
function addTodo() {
  const text = todoInput.value.trim();
  if (text === "") return;

  todos.push({ text, completed: false });
  todoInput.value = "";
  renderTodos();
}

// Toggle complete
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

// Delete todo
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Event listeners
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});

// Initial render
renderTodos(); 

