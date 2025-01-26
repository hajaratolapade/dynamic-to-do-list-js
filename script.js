
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Function to add a new task
    function addTask(taskText, save = true) {
        // If taskText is not provided, get it from the input field and trim spaces
        taskText = taskText || taskInput.value.trim();

        // Check if the input is not empty
        if (taskText === '') {
            alert('Please enter a task!');
            return; // Exit the function if the input is empty
        }

        // Create a new list item element
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        listItem.classList.add('task-item');

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Add event listener to the remove button
        removeButton.onclick = () => {
            taskList.removeChild(listItem);
            removeTaskFromStorage(taskText);
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Add the list item to the task list
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = '';

        // Save to Local Storage if 'save' is true
        if (save) {
            saveTaskToStorage(taskText);
        }
    }

    // Function to save a task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' to avoid saving again
    }

    // Add event listener to the "Add Task" button
    addButton.addEventListener('click', () => addTask());

    // Add event listener to the input field for "Enter" key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});