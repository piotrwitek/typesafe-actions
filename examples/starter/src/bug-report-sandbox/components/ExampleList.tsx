import * as React from 'react';
import { connect } from 'react-redux';

import { RootState } from '../../store';
import { models, selectors } from '../';
import ExampleItem from './ExampleItem';

interface Props {
  items: models.SandboxItem[];
}

function ExampleList({ items = [] }: Props) {
  return (
    <ul style={getStyle()}>
      {items.map(todo => (
        <li key={todo.id}>
          <ExampleItem item={todo} />
        </li>
      ))}
    </ul>
  );
}

const getStyle = (): React.CSSProperties => ({
  textAlign: 'left',
  margin: 'auto',
  maxWidth: 500,
});

const mapStateToProps = (state: RootState) => ({
  items: selectors.getItems(state.sandbox),
});

export default connect(mapStateToProps)(ExampleList);
