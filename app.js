var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.getElementById("todo");
var completedTasksHolder = document.getElementById("completed");

var createNewTaskElement = function (taskString) {

    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = document.createElement("label");

    var editInput = document.createElement("input");
    var editButton = document.createElement("button");

    var deleteButton = document.createElement("button");
    var deleteButtonImg = document.createElement("img");

    listItem.className = "list__item";

    label.innerText = taskString;
    label.className = 'task label';

    checkBox.type = "checkbox";
    checkBox.className = "input-checkbox";
    editInput.type = "text";
    editInput.className = "task-input input";

    editButton.innerText = "Edit";
    editButton.className = "button edit__btn";

    deleteButton.className = "delete__btn button";
    deleteButtonImg.src = './remove.svg';
    deleteButtonImg.className = "btn__img delete-btn__img";
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

var addTask = function () {
    console.log("Add Task...");
    if (!taskInput.value) return;

    var listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";

}

var editTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    var listItem = this.parentNode;

    var editInput = listItem.querySelector(".task-list__input");
    var label = listItem.querySelector(".task__edit");
    var editBtn = listItem.querySelector(".edit__btn");
    var containsClass = listItem.classList.contains("task-list__input_edit");
    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
        label.classList.remove("task__edit");
        editInput.classList.remove("task-list__input_edit");
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
        label.classList.add("task__edit");
        editInput.classList.add("task-list__input_edit");
    }
    listItem.classList.toggle("task-list__input_edit");
};

//Delete task.
var deleteTask = function () {
    console.log("Delete Task...");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
}

var taskCompleted = function () {
    console.log("Complete Task...");
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function () {
    console.log("Incomplete Task...");
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function () {
    console.log("AJAX Request");
}

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");

    var checkBox = taskListItem.querySelector(".input-checkbox");
    var editButton = taskListItem.querySelector(".edit__btn");
    var deleteButton = taskListItem.querySelector(".delete__btn");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}