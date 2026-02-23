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

  const btnDelete = document.createElement("button");
  btnDelate.textContent = "Hapus";

  btnDelete.addEventListener("click", function () {
    li.remove();
  });

  li.appendChild(btnDelete);
  listTask.appendChild(li);

  inputTask.value = "";
});

inputTask.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
  }
});
