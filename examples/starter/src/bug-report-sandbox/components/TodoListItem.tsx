import * as React from 'react';

interface Props {
  title: string;
  onRemoveClick: () => void;
}

function TodoListItem({ title, onRemoveClick }: Props) {
  return (
    <div style={getStyle()}>
      {title}
      <div
        style={{ color: 'darkred', float: 'right', cursor: 'pointer' }}
        onClick={onRemoveClick}
      >
        X
      </div>
    </div>
  );
}

const getStyle = (): React.CSSProperties => ({
  overflowX: 'hidden',
  textOverflow: 'ellipsis',
});

export default TodoListItem;
