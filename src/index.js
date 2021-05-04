import _ from 'lodash';
import $ from 'jquery';
import './assets/style.css';
import Icon from './assets/icon.png';
import Site from './modules/site';
import MyTodo from './modules/mytodo';

const renderProjects = (projects, activeProjectIndex) => {
  const projectsContainer = $('#projects');
  projectsContainer.empty();
  projects.forEach((project, index) => {
    projectsContainer.append(
      `<li class "project project${index}" data-id=${index}>${project.getName()}</li>`,
    );
  });
  $('.project').removeClass('active');
  $(`.project[data-id=${activeProjectIndex}]`).addClass('active');
};

const renderMyTodos = (activeProject) => {
  const todoContainer = $('#todos');

  todoContainer.empty();
  activeProject.getMyTodos().forEach((todo, index) => {
    const {
      title, description, dueDate, priority,
    } = todo.getInfo();

    todoContainer.append(

      `<li class="todo" data-id=${index}>
      <div class="todoTopContent">
      <p>${title}</p>
      <p><span>${dueDate}</span><span data-id=${index} class="delete">Delete</span></p>
      </div>
      <p class="todo-description">${description}</p>
      </li>`,
    );
  });

  $('#projectMyTodos').text(activeProject.getName());
};

const renderSelectedMyTodo = (todo, index) => {
  const info = todo.getInfo();
  $('#editActiveMyTodoFormContainer').show();
  $('#editActiveMyTodoFormContainer input[name=title]').val(info.title);
  $('#editActiveMyTodoFormContainer #todoDescription').text(info.decription);
  $('#editActiveMyTodoFormContainer select#priority').val(info.priority);
  $('#editActiveMyTodoFormContainer input[name=dueDate]').val(info.dueDate);
  $('#editActiveMyTodoFormContainer input[type=hidden]').val(index);
};

const main = () => {
  const site = Site.loadFromLocalStorage();
  renderProjects(site.getAllProjects(), site.getAllProjectsIndex());
  renderMyTodos(site.getActiveProject());
};