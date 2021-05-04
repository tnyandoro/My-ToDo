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

  const handleAddMyTodoShowForm = () => {
    $('#editActiveMyTodoFormContainer').hide();
    const formContainer = $('newMyTodoForm');
    formContainer.removeClass('hidden');
  };
  const handleSelectMyTodo = (event) => {
    $('newMyTodoForm').addClass('hidden');
    const index = $(event.currentTarget).data('id');
    const todos = site.getActiveProject().getMyTodos();
    const selectedMyTodo = todos[index];
    renderSelectedMyTodo(selectedMyTodo, index);
  };

  const handleMyTodoDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const index = $(event.target).data('id');
    site.removeMyTodoAt(index);
    renderMyTodos(site.getActiveProject());
    $('.todo').on('click', handleSelectMyTodo);
    $('.delete').on('click', handleMyTodoDelete);
  };

  const handleChangeActiveProject = (event) => {
    const index = $(event.currentTarget).data('id');
    site.setActiveProjectIndex(index);
    renderProjects(site.getAllprojects(), site.getActiveProjectIndex());
    renderMyTodos(site.getActiveProject());
    $('#editActiveMyTodoFormContainer').hide();
    $('.todo').on('click', handleSelectMyTodo);
    
  }
};