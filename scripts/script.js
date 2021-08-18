'use strict'

const todoControl = document.querySelector('.todo-control'),//форма
headerInput = document.querySelector('.header-input'),
todoList = document.querySelector('.todo-list'),//список задач
todoCompleted = document.querySelector('.todo-completed'),// выполненные задачи
headerBtn = document.querySelector('.header-button');
const todoRemove = document.getElementsByClassName('todo-remove')[0];

let clearLocalStorage = function() {
   if (confirm('Желаете очистить localStorage?')) {
      localStorage.clear();
   }
};

clearLocalStorage();

const todoData = JSON.parse(localStorage.getItem('toDo')) || [];

const render = function() {
   todoList.textContent = '';
   todoCompleted.textContent = '';
   todoData.forEach((item, index) => {
      const li = document.createElement('li');
      li.classList.add('todo-item');
      li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
      '<div class="todo-buttons">' + 
      '<button class="todo-remove"></button>' + 
      '<button class="todo-complete"></button>' + 
      '</div>';

      if (item.completed) {
         todoCompleted.append(li);
      } else {
         todoList.append(li);
      }

      const btnTodoComplete = li.querySelector('.todo-complete');

      btnTodoComplete.addEventListener('click', function() {
         item.completed = !item.completed;
         localStorage.setItem(`toDo`, `${JSON.stringify(todoData)}`);
         console.log(todoData);
         render();
      });

      const todoRemove = li.getElementsByClassName('todo-remove')[0];
      console.log(todoRemove);
      todoRemove.addEventListener('click', function() {
         todoData.splice(index, 1);
         console.log(todoData);
         render();
         
      })
   })

};

headerInput.addEventListener('input', () => {
   if (headerInput.value === '') {
      headerBtn.setAttribute('disabled', 'disabled');
   } else {
      headerBtn.removeAttribute('disabled');
   }
   console.log(headerInput.value);
});

todoControl.addEventListener('submit', function(event) {
   event.preventDefault();

   const newTodo = {
      value: headerInput.value,
      completed: false,
   };

   todoData.push(newTodo);
   headerInput.value = null;

   render();
});

headerBtn.addEventListener('click', () => {
   localStorage.setItem(`toDo`, `${JSON.stringify(todoData)}`);
});

if (todoRemove) {
   todoRemove.addEventListener('click', () => {
      localStorage.setItem(`toDo`, `${JSON.stringify(todoData)}`);
   });
}

render();

