import * as React from 'react';
import { connect } from 'react-redux';

import { loadTodosAsync, saveTodosAsync } from '../actions';
import { RootState } from 'MyTypes';

const mapStateToProps = (state: RootState) => ({
  isLoading: state.sandbox.isLoadingTodos,
});

const dispatchProps = {
  loadTodos: loadTodosAsync.request,
  saveTodos: saveTodosAsync.request,
};

interface Props {
  isLoading: boolean;
  loadTodos: () => void;
  saveTodos: () => void;
}

type State = {};

class TodoActions extends React.Component<Props, State> {
  render() {
    const { isLoading, loadTodos, saveTodos } = this.props;
    return (
      <section>
        <button type="button" onClick={() => loadTodos()} disabled={isLoading}>
          Add
        </button>
        &nbsp;
        <button type="button" onClick={() => saveTodos()} disabled={isLoading}>
          Add
        </button>
      </section>
    );
  }
}

export default connect(
  mapStateToProps,
  dispatchProps
)(TodoActions);
