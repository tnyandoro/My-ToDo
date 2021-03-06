class MyTodo {
  constructor(title, decription, dueDate, priority) {
    this.title = title;
    this.description = decription;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  getData() {
    return {
      title: this.title,
      description: this.description,
      priority: this.priority,
      dueDate: this.dueDate,
    };
  }
}

export default MyTodo;
