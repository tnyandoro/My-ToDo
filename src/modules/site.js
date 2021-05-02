import Project from './project';

class Site {
  constructor() {
    const description = 'Describe your Todo';
    const priority = 'high';
    const dueDate = '2021, 4, 02',

    const p1 = new Project('Project 1'); 
    p1.addMyTodo('MyTodo 1', description, dueDate, priority);
    p1.addMyTodo('MyTodo 2', description, '2021, 4, 02', 'low');
    p1.addMyTodo('MyTodo 3', description, dueDate, 'medium');

    this.projects = [p1];
    this.activeProjectIndex = 0;
  }
}