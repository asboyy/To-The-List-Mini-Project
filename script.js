const inputTask = document.getElementById("inputTask");
const btnAdd = document.getElementById("btnAdd");
const listTask = document.getElementById("listTask");

btnAdd.addEventListener("click", function () {
  const taskText = inputTask.value;

  if (taskText === "") {
    alert("Tidak Boleh Kosong!");
    return;
  }

  const li = document.createElement("li");
  li.textContent = taskText;
  li.addEventListener("click", function () {
    li.classList.toggle("completed");
  });

  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Hapus";

  btnDelete.addEventListener("click", function (event) {
    event.stopPropagation();
    li.remove();
  });

  li.appendChild(btnDelete);
  listTask.appendChild(li);

  inputTask.value = "";
});

inputTask.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    btnAdd.click();
  }
});
