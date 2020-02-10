import React from 'react';
import ReactDOM from 'react-dom';
import Signin from './Signin';

describe('Signin component', () => {
    it('renders without crashing', ()=> {
        const div = document.createElement('div');
        ReactDOM.render(<Signin  />,  div);
        ReactDOM.unmountComponentAtNode(div)
    })
}) 