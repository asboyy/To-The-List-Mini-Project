let tasks = [];

const inputTask = document.getElementById("inputTask");
const btnAdd = document.getElementById("btnAdd");
const listTask = document.getElementById("listTask");

function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.textContent = task.text;

  if (task.completed) {
    li.classList.add("completed");
  }
  li.addEventListener("click", function () {
    task.completed = !task.completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    li.classList.toggle("completed");
  });

  //Buat Tombol DELETE
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Hapus";
  //Event Delete
  btnDelete.addEventListener("click", function (event) {
    event.stopPropagation();

    tasks = tasks.filter(function (t) {
      return t !== task;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    li.remove();
  });

  // Fitur Edit //
  li.addEventListener("dblclick", function () {
    const inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.value = task.text;

    li.textContent = "";
    li.appendChild(inputEdit);
    inputEdit.focus();

    inputEdit.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        task.text = inputEdit.value;

        localStorage.setItem("tasks", JSON.stringify(tasks));

        li.textContent = task.text;
        li.appendChild(btnDelete);

        if (task.completed) {
          li.classList.add("completed");
        }
      }
    });
  });

  li.appendChild(btnDelete);
  listTask.appendChild(li);
}
//Tombol Tambah //
btnAdd.addEventListener("click", function () {
  const taskText = inputTask.value;

  if (taskText === "") {
    alert("Tidak Boleh Kosong!");
    return;
  }

  const newTask = {
    text: taskText,
    completed: false,
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  addTaskToDOM(newTask);

  inputTask.value = "";
});

inputTask.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    btnAdd.click();
  }
});

//Update filters//
const filterAll = document.getElementById("filterAll");
const filterActive = document.getElementById("filterActive");
const filterCompleted = document.getElementById("filterCompleted");

function renderTasks(filter = "All") {
  listTask.innerHTML = "";

  let filteredTasks = tasks;

  if (filter === "active") {
    filteredTasks = tasks.filter((task) => !task.completed);
  }

  if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  filteredTasks.forEach((task) => {
    addTaskToDOM(task);
  });
}

window.addEventListener("load", function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (savedTasks) {
    tasks = savedTasks;
  }

  renderTasks();

  //Event Filter//
  filterall.addEventListener("click", function () {
    renderTasks("all");
  });

  filterActive.addEventListener("click", function () {
    renderTasks("active");
  });

  filterCompleted.addEventListener("click", function () {
    renderTasks("completed");
  });
});
