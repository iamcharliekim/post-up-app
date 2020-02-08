import React from 'react';
import ReactDOM from 'react-dom';
import DateTimePicker from './DateTimePicker'

describe('DateTimePicker component', () => {
    it('renders without crashing', ()=> {
        const div = document.createElement('div');
        ReactDOM.render(<DateTimePicker  />, div);
        ReactDOM.unmountComponentAtNode(div)
    })
}) 