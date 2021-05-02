import MyTodo from './mytodo';

const json = require('json');

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  static fromJSON(json) {
    const project = new Project(json.name);
    project.todos = json.todos.map(
      (todo) => new MyTodo(todo.title, todo.description, todo.dueDate, todo.priority),
    );
    return project;
  }

  getName() {
    return this.name;
  }

  getMytodos() {
    return this.mytodos;
  }
}