import { formatDistance, subDays } from 'date-fns';

formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true });
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
