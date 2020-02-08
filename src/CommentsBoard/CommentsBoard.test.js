import React from 'react';
import ReactDOM from 'react-dom';
import CommentsBoard from './CommentsBoard'

describe('CommentsBoard component', () => {
    it('renders without crashing', ()=> {
        const game_id = 2
        const div = document.createElement('div');
        ReactDOM.render(<CommentsBoard  game_id={game_id}/>, div);
        ReactDOM.unmountComponentAtNode(div)
    })
}) 