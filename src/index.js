import { el } from 'date-fns/locale';
import Colcade from 'colcade';
import {
  format, formatDistance, formatRelative, subDays,
} from 'date-fns';

// DOM manipulation object 

export const domManipulator = (function () {
  // displays all todos in an arr to the DOM
  function renderTodos(todos, element) {

    // pick the relevent todo items

    const toDoList = todos[toDosManager.getCurrentProject()];
    // console.log(toDoList) 
  }

})