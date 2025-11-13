(function () {
  const STORAGE_KEY = "qa_task_app_tasks_v1";

  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  const taskCounter = document.getElementById("task-counter");
  const filterSelect = document.getElementById("filter-select");
  const clearCompletedBtn = document.getElementById("clear-completed");

  let tasks = [];
  let currentFilter = "all";

  function loadTasks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      tasks = raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn("Could not parse tasks from storage", e);
      tasks = [];
    }
  }

  function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function createTask(title) {
    return {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
  }

  function renderTasks() {
    taskList.innerHTML = "";

    const filtered = tasks.filter((task) => {
      if (currentFilter === "active") return !task.completed;
      if (currentFilter === "completed") return task.completed;
      return true;
    });

    if (filtered.length === 0) {
      const empty = document.createElement("li");
      empty.className = "task-item";
      empty.innerHTML =
        '<p class="task-title" style="color: var(--text-muted);">No tasks yet. Add one above to start testing.</p>';
      taskList.appendChild(empty);
    } else {
      filtered.forEach((task) => {
        const li = document.createElement("li");
        li.className = "task-item";
        li.dataset.id = task.id;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;

        const content = document.createElement("div");
        content.className = "task-content";

        const title = document.createElement("p");
        title.className = "task-title";
        if (task.completed) title.classList.add("completed");
        title.textContent = task.title;

        const meta = document.createElement("p");
        meta.className = "task-meta";
        const date = new Date(task.createdAt);
        meta.textContent = `Created: ${date.toLocaleString()}`;

        content.appendChild(title);
        content.appendChild(meta);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.type = "button";
        deleteBtn.textContent = "Delete";

        actions.appendChild(deleteBtn);

        li.appendChild(checkbox);
        li.appendChild(content);
        li.appendChild(actions);

        taskList.appendChild(li);
      });
    }

    updateCounter();
  }

  function updateCounter() {
    const count = tasks.length;
    const activeCount = tasks.filter((t) => !t.completed).length;
    let label = `${count} task${count === 1 ? "" : "s"}`;
    if (count > 0) {
      label += ` • ${activeCount} active`;
    }
    taskCounter.textContent = label;
  }

  function handleAddTask(event) {
    event.preventDefault();
    const value = taskInput.value.trim();
    if (!value) return;

    const newTask = createTask(value);
    tasks.unshift(newTask);
    saveTasks();
    taskInput.value = "";
    renderTasks();
  }

  function handleListClick(event) {
    const li = event.target.closest(".task-item");
    if (!li) return;

    const id = li.dataset.id;
    if (!id) return;

    if (event.target.classList.contains("task-checkbox")) {
      toggleTask(id, event.target.checked);
    } else if (event.target.classList.contains("delete-btn")) {
      deleteTask(id);
    }
  }

  function toggleTask(id, completed) {
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, completed } : task
    );
    saveTasks();
    renderTasks();
  }

  function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    renderTasks();
  }

  function handleFilterChange(event) {
    currentFilter = event.target.value;
    renderTasks();
  }

  function handleClearCompleted() {
    const hasCompleted = tasks.some((t) => t.completed);
    if (!hasCompleted) return;
    tasks = tasks.filter((t) => !t.completed);
    saveTasks();
    renderTasks();
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    renderTasks();

    taskForm.addEventListener("submit", handleAddTask);
    taskList.addEventListener("click", handleListClick);
    filterSelect.addEventListener("change", handleFilterChange);
    clearCompletedBtn.addEventListener("click", handleClearCompleted);
  });
})();
