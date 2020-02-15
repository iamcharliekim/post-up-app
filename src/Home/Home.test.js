import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home'

describe('Home component', () => {
    it('renders without crashing', ()=> {
        const location = { pathname: "/games/19" }
        const div = document.createElement('div');
        ReactDOM.render(<Home location={location}  />, div);
        ReactDOM.unmountComponentAtNode(div)
    })
}) 