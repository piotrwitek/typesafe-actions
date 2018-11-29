import { Todo } from '../models';

let todos: Todo[] = [
  { id: '0', title: `YOLO dude, your snapshot was loaded successfully!` },
];

export function loadSnapshot(): Promise<Todo[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(todos);
    }, 500);
  });
}

export function saveSnapshot(data: Todo[]): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      todos = data;
      resolve();
    }, 500);
  });
}
