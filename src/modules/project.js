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

  getMyTodos() {
    return this.mytodos;
  }

  addMyTodo(title, description, dueDate, priority) {
    this.todos.push(new MyTodo(title, description, dueDate, priority));
  }

  removeMyTodoAt(index) {
    this.todos.splice(index, 1);
  }

  updateTodo(todo, index) {
    this.todos[index] = todo;
  }
}