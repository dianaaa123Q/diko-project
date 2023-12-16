// Replace 'YOUR_API_URL' with your actual API endpoint
const apiUrl = 'https://657abd3f1acd268f9afbc3de.mockapi.io/user/tasks';

async function getTasks() {
    try {
        const response = await fetch(apiUrl);
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = task.name;
        taskList.appendChild(listItem);
    });
}

async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();

    if (taskName !== '') {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: taskName }),
            });

            if (response.ok) {
                taskInput.value = '';
                getTasks(); // Refresh the task list after adding a new task
            } else {
                console.error('Error adding task:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }
}

// Initial fetch of tasks when the page loads
getTasks();
