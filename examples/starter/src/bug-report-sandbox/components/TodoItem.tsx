import * as React from 'react';

import { Todo } from '../models';

interface Props {
  item: Todo;
}

function TodoItem({ item }: Props) {
  return <div style={getStyle()}>{item.title}</div>;
}

const getStyle = (): React.CSSProperties => ({
  overflowX: 'hidden',
  textOverflow: 'ellipsis',
});

export default TodoItem;
