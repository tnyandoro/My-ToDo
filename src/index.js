import { $ } from "jquery";
import './assets/style.css';
import { MyTodo} from './modules/mytodo'
import { Site } from './modules/site'

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
    $('.project').on('click', handleChangeActiveProject);
  };

  const handleAddProjectShowForm = () => {
    const form = $('#newProjectForm');
    form.removeClass('hidden');
  };

  const handleAddNewProject = (event) => {
    event.preventDefault();
    const form = $(event.target);
    const projectName = form.serializeArray()[0].value;
    site.addNewProject(projectName);
    renderProjects(site.getAllProjects(), site.getActiveProjectIndex());

    form[0].reset();

    form.addClass('hidden');

    $('.project').on('click', handleChangeActiveProject);
  };

  const handleAddNewMyTodo = () => {
    event.preventDefault();
    const form = $(event.target);
    const todo = form.serializeArray();
    site.addMyTodo(todo[0].value, todo[1].value, todo[3].value, todo[2].value);
    renderMyTodos(site.getActiveProject());
    $('.todo').on('click', handleSelectMyTodo);
    $('.delete').on('click', handleMyTodoDelete);
    form[0].reset();
    $('#newMyTodoForm').addClass('hidden');
  };

  const handleEditMyTodo = (event) => {
    event.preventDefault();
    const form = $(event.target);
    const todoUpdates = form.serializeArray();
    const index = Number(todoUpdates[4].value);
    const activeProject = site.getActiveProject();
    const updatedMyTodo = new MyTodo(
      todoUpdates[0].value,
      todoUpdates[1].value,
      todoUpdates[3].value,
      todoUpdates[2].value,
    );

    site.updateMyTodo(updatedMyTodo, index, activeProject);
    form[0].reset();
    $('.editActiveMyTodoFormContainer').hide();
    renderMyTodos(activeProject);
    $('.todo').on('.click', handleSelectMyTodo);
    $('.delete').on('.click', handleMyTodoDelete);
  };

  $('.project').on('click', handleChangeActiveProject);
  $('.todo').on('click', handleSelectMyTodo);
  $('.newProjectBtn').on('click', handleAddProjectShowForm);
  $('#newProjectForm').on('submit', handleAddNewProject);
  $('newMyTodoBtn').on('click', handleAddMyTodoShowForm);
  $('todoForm').on('submit', handleAddNewMyTodo);
  $('#editActiveMyTodoForm').on('submit', handleEditMyTodo);
  $('.delete').on('click', handleMyTodoDelete);
  $('#editActiveMyTodoFormContainer').hide();
  window.$ = $;
};

$(main);