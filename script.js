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

        deleteBtn.on('click', function (e) {
            e.stopPropagation();
            todoItem.remove();
            removeTodoFromStorage(todo.text);
        });

        todoItem.on('click', function () {
            $('#taskText').text(todo.text);
            $('#taskModal').modal('show');
        });

        todoItem.append(todoText, deleteBtn); 
        todoList.append(todoItem); 
    };

    todoForm.on('submit', function (e) {
        e.preventDefault();
        const todoText = inputField.val().trim();
        if (todoText === '') return;

        const todo = {
            text: todoText,
        };

        addTodoToDOM(todo); 
        saveTodoToStorage(todo); 
        inputField.val(''); 
    });

    const saveTodoToStorage = (todo) => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const removeTodoFromStorage = (text) => {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos = todos.filter(todo => todo.text !== text);
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    loadTodos(); 
});
