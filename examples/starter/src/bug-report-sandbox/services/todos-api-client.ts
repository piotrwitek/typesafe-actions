import { models } from '..';

const todos: models.Todo[] = [
  { id: '0', title: `YOLO dude, so let's build some real sh**!` },
];

export function getAll(): Promise<typeof todos> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(todos);
    }, 500);
  });
}
