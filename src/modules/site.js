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

  static loadFromLocalStorage(){
    const data = localStorage.getItem('data')
    const site = new Site();
    if (!data){ 
      return site;
    }
    
    const json = JSON.parse(data);
    site.activeProjectIndex = json.activeProjectIndex;
    site.projects = json.projects.map((p) => Project.fromJSON(p));
    return site;
  }

  saveToLocalStorage() {
    const data = JSON.stringify(this);
    localStorage.setItem('data', data);
  }

  getActiveProjectIndex(){
    return this.activeProjectIndex;
  }

  setActiveProjectIndex(index) {
    this.activeProjectIndex = index;
    this.saveToLocalStorage();
  }
  getActiveProject() {
    return this.projects[this.activeProjectIndex];
  }

  getAllProjects() {
    return this.projects;
  }

  addNewProject(name) {
    const project = new Project(name);
    this.projects.push(project);
    this.saveToLocalStorage();
  }

  removeProjectAt(index) {
    if (this.projects.length === 1) {
      return;
    }
    this.projects.splice(index, 1);
    this.activeProjectIndex = 0;
    this.saveToLocalStorage();
  }
  
  addMyTodo(title, description, dueDate, priority) {
    const activeProject = this.getActiveProject();
    activeProject.addMyTodo(title, description, dueDate, priority);
    this.saveToLocalStorage();
  }

  removeMyTodoAt(index) { 
    const activeProject = this.getActiveProject();
    activeProject.removeMyTodoAt(index);
    this.saveToLocalStorage();
  }

  updateMyTodo(todo, index) {
    const  activeProject = this.getActiveProject();
    activeProject.updateMyTodo(todo, index);
    this.saveToLocalStorage();
  }
}
export default Site;