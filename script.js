let tasks = [];

const inputTask = document.getElementById("inputTask");
const btnAdd = document.getElementById("btnAdd");
const listTask = document.getElementById("listTask");

function addTaskToDOM(taskText) {
  const li = document.createElement("li");
  li.textContent = taskText;

  li.addEventListener("click", function () {
    li.classList.toggle("completed");
  });

  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Hapus";

  btnDelete.addEventListener("click", function (event) {
    event.stopPropagation();

    //hapus dari array
    tasks = tasks.filter(function (task) {
      return task !== taskText;
    });
    //update localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    //Hapus dari DOM
    li.remove();
  });

  li.appendChild(btnDelete);
  listTask.appendChild(li);
}

btnAdd.addEventListener("click", function () {
  const taskText = inputTask.value;

  if (taskText === "") {
    alert("Tidak Boleh Kosong!");
    return;
  }

  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  addTaskToDOM(taskText);

  inputTask.value = "";
});

inputTask.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    btnAdd.click();
  }
});

window.addEventListener("load", function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (savedTasks) {
    tasks = savedTasks;

    tasks.forEach(function (task) {
      addTaskToDOM(task);
    });
  }
});
