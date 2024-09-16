$(document).ready(function () {
    const todoForm = $('.todo-form');
    const inputField = $('.input-field');
    const todoList = $('.todo-list');

    const loadTodos = () => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => addTodoToDOM(todo));
    };

    const addTodoToDOM = (todo) => {
        const todoItem = $('<li>').addClass('todo-item list-group-item d-flex justify-content-between align-items-center'); // Додано клас 'todo-item'
        const todoText = $('<span>').addClass('todo-text').text(todo.text);
        const deleteBtn = $('<button>').addClass('btn btn-danger btn-sm').text('Видалити');

        // Видалення завдання
        deleteBtn.on('click', function (e) {
            e.stopPropagation();
            todoItem.remove();
            removeTodoFromStorage(todo.text);
        });

        // Показ модального вікна при натисканні на завдання
        todoItem.on('click', function () {
            $('#taskText').text(todo.text);
            $('#taskModal').modal('show');
        });

        todoItem.append(todoText, deleteBtn); // Додаємо елементи всередині <li>
        todoList.append(todoItem); // Додаємо <li> в <ul>
    };

    // Додавання завдання через форму
    todoForm.on('submit', function (e) {
        e.preventDefault();
        const todoText = inputField.val().trim();
        if (todoText === '') return;

        const todo = {
            text: todoText,
        };

        addTodoToDOM(todo); // Додає завдання до DOM
        saveTodoToStorage(todo); // Зберігає завдання в localStorage
        inputField.val(''); // Очищення поля вводу
    });

    // Збереження завдань до localStorage
    const saveTodoToStorage = (todo) => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    // Видалення завдання з localStorage
    const removeTodoFromStorage = (text) => {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos = todos.filter(todo => todo.text !== text);
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    loadTodos(); // Завантаження збережених завдань
});
