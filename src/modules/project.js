import MyTodo from './mytodo';
var json = require('json');

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  static fromJSON(json) {
    const project = new Project(json.name);
  }
}