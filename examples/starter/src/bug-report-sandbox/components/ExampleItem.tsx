import * as React from 'react';
import { SandboxItem } from '../models';

interface Props {
  item: SandboxItem;
}

function ExampleItem({ item }: Props) {
  return (
    <div style={getStyle()}>
      {item.title}
    </div>
  );
}

const getStyle = (): React.CSSProperties => ({
  overflowX: 'hidden',
  textOverflow: 'ellipsis',
});

export default ExampleItem;
