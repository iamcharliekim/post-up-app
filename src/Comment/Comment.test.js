import React from 'react';
import ReactDOM from 'react-dom';
import Comment from './Comment';

describe('Comment component', () => {
  it('renders without crashing', () => {
    const testComment = {
      id: 25,
      user_id: 1,
      user_name: 'cwkim3',
      comment: 'test',
      game_id: 19,
      date_created: '2020-02-07T18:14:20.000Z',
      date_modified: null
    };

    const div = document.createElement('div');
    ReactDOM.render(<Comment userComment={testComment} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
