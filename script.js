document.addEventListener('DOMContentLoaded', () => {
    // 1. Select DOM elements
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    // 2. Load tasks from localStorage (or create an empty array if none exist)
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // 3. Function to render tasks to the UI
    function renderTasks() {
        // Clear the current list
        taskList.innerHTML = '';

        // Loop through tasks and create HTML elements for each
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;

            li.innerHTML = `
                <div class="task-content" onclick="toggleTask(${index})">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="event.stopPropagation(); toggleTask(${index})">
                    <span class="task-text">${task.text}</span>
                </div>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            `;
            
            taskList.appendChild(li);
        });
    }

    // 4. Function to add a new task
    function addTask() {
        const text = taskInput.value.trim();
        
        if (text !== '') {
            // Add task to array
            tasks.push({ text: text, completed: false });
            
            // Save to local storage and update UI
            saveAndRender();
            
            // Clear input field
            taskInput.value = '';
        }
    }

    // 5. Function to toggle task completion (attached to global window object for inline HTML onclick)
    window.toggleTask = function(index) {
        tasks[index].completed = !tasks[index].completed;
        saveAndRender();
    };

    // 6. Function to delete a task
    window.deleteTask = function(index) {
        tasks.splice(index, 1); // Remove 1 item at the specific index
        saveAndRender();
    };

    // 7. Helper function to save tasks to localStorage and re-render the UI
    function saveAndRender() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // 8. Event Listeners for adding tasks
    addBtn.addEventListener('click', addTask);
    
    // Allow pressing "Enter" key to add a task
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // 9. Initial render on page load
    renderTasks();
});