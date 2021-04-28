import { el } from 'date-fns/locale';
import Colcade from 'colcade';
import {  format, formatDistance, formatRelative, subDays,
} from 'date-fns';

// DOM manipulation object 

export const domManipulator = (function () {
  // displays all todos in an arr to the DOM
  function renderTodos(todos, element) {

    // pick the relevent todo items

    const toDoList = todos[toDosManager.getCurrentProject()];
    // console.log(toDoList) 

    // clear out display before redisplaying all to-dos
    element.innerHTML = '';

    // We wont render an empty list of
    if (toDoList.length == 0) {
      return;
    }

    // Lets create a to-do element for each to to be stored in the passed arrayish/
    // and append them to the dom element to the functional list
    toDoList.forEach(todo, i) => {
// Creating the main todo body item 
const toDoBody = document.createElement('div');
toDoBody.classLis.add('todo');
toDoBody.classList.add(`priority-${todo.priority}`);
// We are assigning a unique value to each to-do element that will correspond to 

    }
  }

})