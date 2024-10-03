const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

addTaskButton.addEventListener("click", () => {
    const task = taskInput.value;
    const priority = priorityInput.value;
    const deadline = deadlineInput.value;

    if (task.trim() === "" || deadline === "") {
        alert("Please enter a task and select a valid deadline.");
        return;
    }

    const selectedDate = new Date(deadline);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
        alert("Please select an upcoming date for the deadline.");
        return;
    }

    const taskItem = document.createElement("div");
    taskItem.classList.add("task");
    taskItem.innerHTML = `
        <p>${task}</p>
        <p>Priority: ${priority}</p>
        <p>Deadline: ${deadline}</p>
        <button class="mark-done   btn btn-success"   type="button">Mark As Done</button>
        <button class="edit-task  btn btn-warning"  type="button">Edit</button>
        <button class="delete-task  btn btn-danger" type="button">Delete</button>
    `;

    taskList.appendChild(taskItem);

    taskInput.value = "";
    priorityInput.value = "top";
    deadlineInput.value = "";
});

taskList.addEventListener("click", (event) => {
    const taskItem = event.target.parentElement;

    if (event.target.classList.contains("mark-done")) {
        event.target.textContent = "Completed";
        event.target.classList.remove("mark-done");
        event.target.classList.add("completed-task");
    } else if (event.target.classList.contains("delete-task")) {
        taskItem.remove(); // Remove task on clicking "Delete"
    } else if (event.target.classList.contains("edit-task")) {
        // Edit functionality: Populate the form with the existing task details
        const taskDetails = taskItem.querySelectorAll("p");
        taskInput.value = taskDetails[0].textContent;
        priorityInput.value = taskDetails[1].textContent.split(": ")[1].toLowerCase();
        deadlineInput.value = taskDetails[2].textContent.split(": ")[1];
        taskItem.remove(); // Remove old task for editing
    }
});
