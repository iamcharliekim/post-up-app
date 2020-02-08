import React from 'react';
import ReactDOM from 'react-dom';
import GoogleAutocomplete from './GoogleAutocomplete'


describe('GoogleAutocomplete component', () => {
    it('renders without crashing', ()=> {
    

        const div = document.createElement('div');
        ReactDOM.render(<GoogleAutocomplete  />, div);
        ReactDOM.unmountComponentAtNode(div)
    })
}) 