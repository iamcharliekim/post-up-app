import React from 'react';
import ReactDOM from 'react-dom';
import CreateGames from './CreateGames'


describe('CreateGames component', () => {
    it('renders without crashing', ()=> {
        const location = {
            pathname: '/create-games'
        }

        const match = {
            params: 2
        }

        const gamesList = {
            game_name: "",
            game_date: "",
            game_time: "",
            game_street: "",
            game_city: "",
            game_state: "",
            game_zip: "",
            game_lat: 0,
            game_lng: 0
        }


        

        const div = document.createElement('div');
        ReactDOM.render(<CreateGames location={location} match={match} />, div);
        ReactDOM.unmountComponentAtNode(div)
    })
}) 