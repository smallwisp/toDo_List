
class Todo {
    constructor(form, input, todoContainer, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoContainer = document.querySelector(todoContainer);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    clearStorage() {
        if (confirm('Желаете очистить localStorage?')) {
            localStorage.clear();
        }
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.id = todo.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
			<div class="todo-buttons">
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
			</div>`);

        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(event) {
        event.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        } else {
            confirm('Для работы со списками дел необходимо заполнять поле!');
        }
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(target) {
        target.closest('.todo-item').remove();
    }

    completedItem(target) {
        this.todoData.forEach(obj => {
            if (obj.key === target.closest(`.todo-item`).id) {
                obj.completed = !obj.completed;
                this.render();
            }
        });
    }

    handler() {
        this.todoContainer.addEventListener('click', event => {
            const target = event.target;
            if (target.classList.contains('todo-remove')) {
                this.deleteItem(target);
            }
            if (target.classList.contains('todo-complete')) {
                this.completedItem(target);
            }
        });
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
        this.clearStorage();
        this.handler();
    }

}

const todo = new Todo('.todo-control', '.header-input', '.todo-container', '.todo-list', '.todo-completed');

todo.init();

