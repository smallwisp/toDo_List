'use strict'

const todoControl = document.querySelector('.todo-control'),
headerinput = document.querySelector('.header-input'),
todoList = document.querySelector('.todo-list'),
todoCompleted = document.querySelector('.todo-completed');

const todoData = [
   
   
];

const render = function() {
   todoList.textContent = '';
   todoCompleted.textContent = '';
   todoData.forEach(item => {
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
         render();
      })
      const todoRemove = document.querySelector('.todo-remove');
      todoRemove.addEventListener('click', function() {
         li.remove();
         render();
         
      })
   })

};

todoControl.addEventListener('submit', function(event) {
   event.preventDefault();

   const newTodo = {
      value: headerinput.value,
      completed: false,
   };

   todoData.push(newTodo);

   render();
});

render();

