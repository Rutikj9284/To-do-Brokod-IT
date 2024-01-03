document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

const tasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push(taskInput.value);
    saveTasks();
    displayTasks();
    taskInput.value = "";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks.push(...JSON.parse(storedTasks));
        displayTasks();
    }
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span onclick="editTask(${index})">${task}</span>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function searchTasks() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.toLowerCase().includes(searchInput));
    displayFilteredTasks(filteredTasks);
}

function displayFilteredTasks(filteredTasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span onclick="editTask(${index})">${task}</span>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function editTask(index) {
    const newTaskText = prompt("Edit task:", tasks[index]);
    if (newTaskText !== null) {
        tasks[index] = newTaskText;
        saveTasks();
        displayTasks();
    }
}
