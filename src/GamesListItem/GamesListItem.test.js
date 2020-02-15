import React from 'react';
import ReactDOM from 'react-dom';
import GamesListItem from './GamesListItem';
import { BrowserRouter } from 'react-router-dom';

describe('GamesListItem component', () => {
  it('renders without crashing', () => {
    const game = {
      id: 19,
      created_by: 2,
      game_name: 'Dogwood Park',
      game_date: '2020-02-05T04:00:00.691Z',
      game_time: '20:00:00',
      game_street: 'Dogwood Park',
      game_city: ' Monroe Street',
      game_state: ' Rockville',
      game_zip: '20852',
      game_lat: '39.0712654',
      game_lng: '-77.1527529'
    };

    const location = {
      pathname: '/games/19',
      state: { gamesList: Array(1), lat: 39.0712654, lng: -77.1527529, zoom: 10 },
      search: '',
      hash: '',
      key: 'xgccbx'
    };

    const div = document.createElement('div');

    ReactDOM.render(
      <BrowserRouter>
        <GamesListItem game={game} location={location} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
