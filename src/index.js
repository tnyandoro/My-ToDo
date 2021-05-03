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