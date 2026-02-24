let tasks = [];

const inputTask = document.getElementById("inputTask");
const btnAdd = document.getElementById("btnAdd");
const listTask = document.getElementById("listTask");

const filterAll = document.getElementById("filterAll");
const filterActive = document.getElementById("filterActive");
const filterCompleted = document.getElementById("filterCompleted");

let currentFilter = "all";

// ADD TASK TO DOM
function addTaskToDOM(task) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = task.text;
  span.classList.add("task-text");

  if (task.completed) {
    li.classList.add("completed");
  }

  // Toggle Complete
  span.addEventListener("click", function () {
    task.completed = !task.completed;
    saveToLocal();
    renderTasks(currentFilter);
  });

  // ACTION BUTTONS
  const actions = document.createElement("div");
  actions.classList.add("actions");

  // EDIT BUTTON
  const btnEdit = document.createElement("button");
  btnEdit.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';

  btnEdit.addEventListener("click", function (event) {
    event.stopPropagation();

    const inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.value = task.text;
    inputEdit.style.flex = "1";

    li.innerHTML = "";
    li.appendChild(inputEdit);
    inputEdit.focus();

    inputEdit.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        task.text = inputEdit.value.trim();
        saveToLocal();
        renderTasks(currentFilter);
      }
    });
  });

  // DELETE BUTTON
  const btnDelete = document.createElement("button");
  btnDelete.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

  btnDelete.addEventListener("click", function (event) {
    event.stopPropagation();

    li.style.opacity = "0";
    li.style.transform = "translateX(20px)";

    setTimeout(() => {
      tasks = tasks.filter((t) => t !== task);
      saveToLocal();
      renderTasks(currentFilter);
    }, 300);
  });

  actions.appendChild(btnEdit);
  actions.appendChild(btnDelete);

  li.appendChild(span);
  li.appendChild(actions);
  listTask.appendChild(li);
}

// ADD TASK
btnAdd.addEventListener("click", function () {
  const taskText = inputTask.value.trim();

  if (!taskText) {
    alert("Tidak Boleh Kosong!");
    return;
  }

  tasks.push({
    text: taskText,
    completed: false,
  });

  saveToLocal();
  renderTasks(currentFilter);
  inputTask.value = "";
});

inputTask.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    btnAdd.click();
  }
});

// FILTER
function renderTasks(filter = "all") {
  currentFilter = filter;
  listTask.innerHTML = "";

  setActiveFilter(filter);

  let filteredTasks = tasks;

  if (filter === "active") {
    filteredTasks = tasks.filter((t) => !t.completed);
  }

  if (filter === "completed") {
    filteredTasks = tasks.filter((t) => t.completed);
  }

  filteredTasks.forEach(addTaskToDOM);
  updateCounter();
}

function setActiveFilter(filter) {
  document.querySelectorAll(".filters button").forEach((btn) => {
    btn.classList.remove("active");
  });

  if (filter === "all") filterAll.classList.add("active");
  if (filter === "active") filterActive.classList.add("active");
  if (filter === "completed") filterCompleted.classList.add("active");
}

// COUNTER
function updateCounter() {
  const total = tasks.length;
  const active = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;

  document.getElementById("taskCounter").textContent =
    `Total: ${total} | Active: ${active} | Completed: ${completed}`;
}

// LOCAL STORAGE
function saveToLocal() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// LOAD
window.addEventListener("load", function () {
  const saved = JSON.parse(localStorage.getItem("tasks"));
  if (saved) tasks = saved;

  renderTasks();
});

filterAll.addEventListener("click", () => renderTasks("all"));
filterActive.addEventListener("click", () => renderTasks("active"));
filterCompleted.addEventListener("click", () => renderTasks("completed"));

const toggleTheme = document.getElementById("toggleTheme");
const themeIcon = toggleTheme.querySelector("i");

// Load saved theme
window.addEventListener("load", function () {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }
});

// Toggle click
toggleTheme.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    localStorage.setItem("theme", "light");
    themeIcon.classList.replace("fa-sun", "fa-moon");
  }
});
