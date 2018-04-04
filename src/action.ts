function action<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}

const createUser = (id: number, name: string) => action('GET_USER', { id, name });
const result = createUser(1, 'Piotr');
