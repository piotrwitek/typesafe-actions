import { RootState } from 'MyTypes';
import * as React from 'react';
import { connect } from 'react-redux';

import { actions } from '..';

interface Props {
  addItem: (title: string) => any;
}

type State = {
  title: string;
};

class TodoForm extends React.Component<Props, State> {
  readonly state = { title: '' };

  handleTitleChange: React.ReactEventHandler<HTMLInputElement> = ev => {
    this.setState({ title: ev.currentTarget.value });
  };

  handleAddClick = () => {
    this.props.addItem(this.state.title);
    this.setState({ title: '' });
  };

  render() {
    const { title } = this.state;

    return (
      <form>
        <input
          style={{ width: 450 }}
          type="text"
          placeholder="Enter new item"
          value={title}
          onChange={this.handleTitleChange}
        />
        &nbsp;
        <button type="button" onClick={this.handleAddClick} disabled={!title}>
          Add
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});

export default connect(
  mapStateToProps,
  {
    addItem: (title: string) => actions.addTodo({ title }),
  }
)(TodoForm);
