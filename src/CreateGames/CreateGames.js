import moment from 'moment';
import React from 'react';
import config from '../config';
import Context from '../Context/Context';

import GoogleAutocomplete from '../GoogleAutocomplete/GoogleAutocomplete';
import GoogleMapsComponent from '../GoogleMapsComponent/GoogleMapsComponent';
import GamesApiService from '../Services/GamesApiService';

import styles from './CreateGames.module.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class CreateGames extends React.Component {
  static contextType = Context;

  state = {
    edit_game: false,
    error: null,
    zoom: 8,
    game_id: +this.props.match.params.game_id,
    game_name: '',
    game_date: moment(new Date().toISOString().split('T')[0]).format('YYYY-MM-DD'),
    game_time: '',
    game_street: '',
    game_city: '',
    game_state: '',
    game_zip: '',
    game_lat: null,
    game_lng: null,
    game_coors: null
  };

  componentDidMount() {
    let time = new Date().toString().split(' ');
    time = time[4].split(':');
    let formattedTime = `${time[0]}:${time[1]}`;

    this.setState({ game_time: formattedTime });

    // IF USER IS EDITING GAME, FIND GAME USING THE game_id PARAM AND POPULATE FORM FIELDS
    if (this.state.game_id) {
      let game = this.context.games.find(game => game.id === this.state.game_id);
      let game_date = moment(game.game_date.split('T')[0]).format('YYYY-MM-DD');

      this.setState({
        edit_game: true,
        game_name: game.game_name,
        game_date,
        game_time: game.game_time,
        game_street: game.game_street,
        game_city: game.game_city,
        game_state: game.game_state,
        game_zip: game.game_zip,
        game_lat: game.game_lat,
        game_lng: game.game_lng
      });
    }
  }

  onSetAddress = (addressString, zipCode, coors) => {
    // CALLED WHEN USER USES GOOGLE AUTOCOMPLETE TO AUTOFILL THE ADDRESS FIELDS
    let address = addressString.split(',');

    this.setState({
      game_street: address[0],
      game_city: address[1],
      game_state: address[2],
      game_zip: zipCode,
      game_lat: coors.lat,
      game_lng: coors.lng,
      game_coors: coors,
      zoom: 10
    });
  };

  gameNameHandler = e => {
    this.setState({ game_name: e.target.value });
  };

  gameDateHandler = e => {
    this.setState({ game_date: e.target.value });
  };

  gameTimeHandler = e => {
    this.setState({ game_time: e.target.value });
  };

  gameStreetHandler = e => {
    this.setState({ game_street: e.target.value });
  };

  gameCityHandler = e => {
    this.setState({ game_city: e.target.value });
  };

  gameStateHandler = e => {
    this.setState({ game_state: e.target.value });
  };

  gameZipHandler = e => {
    this.setState({ game_zip: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    let game_date = new Date(this.state.game_date).toISOString();

    let gameObj = {
      game_name: this.state.game_name,
      game_date,
      game_time: this.state.game_time,
      game_street: this.state.game_street,
      game_city: this.state.game_city,
      game_state: this.state.game_state,
      game_zip: this.state.game_zip,
      game_lat: this.state.game_lat,
      game_lng: this.state.game_lng
    };

    // IF USER DOES NOT USE GOOGLE AUTOCOMPLETE TO FILL ADDRESS FIELDS, GRAB THE ADDRESS COORDINATES VIA GOOGLEMAPS API
    if (!this.state.game_coors) {
      let parsedGeoCodeAddress = `${this.state.game_street} ${this.state.game_city} ${this.state.game_state} ${this.state.game_zip}`
        .split(' ')
        .join('+');

      GamesApiService.getCoordinates(parsedGeoCodeAddress, config.GOOGLE_MAPS_API_KEY)
        .then(coors => {
          gameObj.game_lat = coors.results[0].geometry.location.lat;
          gameObj.game_lng = coors.results[0].geometry.location.lng;

          this.state.edit_game ? this.putGame(this.state.game_id, gameObj) : this.postGame(gameObj);
        })
        .catch(res => {
          this.setState({ error: res.error });
        });
    }
    this.state.edit_game ? this.putGame(this.state.game_id, gameObj) : this.postGame(gameObj);
  };

  putGame = (game_id, editedGame) => {
    return GamesApiService.putGame(game_id, editedGame)
      .then(res => {
        this.updateGame(res);
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  postGame = newGame => {
    return GamesApiService.postGame(newGame)
      .then(res => {
        this.addNewGame(newGame, res);
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  addNewGame = (newGame, res) => {
    newGame.id = res[0].id;
    newGame.created_by = res[0].created_by;

    const gamesCopy = [...this.context.games];
    gamesCopy.push(newGame);
    this.context.updateGames(gamesCopy);

    const myGamesCopy = [...this.context.myGames];
    myGamesCopy.push(newGame);
    this.context.updateMyGames(myGamesCopy);
    this.props.history.push('/home');
  };

  updateGame = editedGame => {
    const gamesCopy = [...this.context.games];
    const gameIndex = gamesCopy.findIndex(game => game.id === editedGame.id);
    gamesCopy[gameIndex] = editedGame;
    this.context.updateGames(gamesCopy);

    const myGamesCopy = [...this.context.myGames];
    const myGameIndex = myGamesCopy.findIndex(game => game.id === editedGame.id);
    myGamesCopy[myGameIndex] = editedGame;
    this.context.updateMyGames(myGamesCopy);
    this.props.history.push('/home');
  };

  render() {
    return (
      <React.Fragment>
        {!this.context.openNav ? (
          <div className={styles['create-game-wrapper']}>
            <form onSubmit={this.onSubmitHandler}>
              <div className={styles['form-row']}>
                <label htmlFor="game_name">Name:</label>
                <input
                  type="text"
                  placeholder="Give your game a name"
                  id="game_name"
                  onChange={this.gameNameHandler}
                  value={this.state.game_name}
                  required
                />
              </div>

              <div className={styles['form-row']}>
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  onChange={this.gameDateHandler}
                  value={this.state.game_date}
                  id="date"
                  required
                  className={styles['date-input']}
                />
              </div>

              <div className={styles['form-row']}>
                <label htmlFor="time">Time</label>
                <input
                  type="time"
                  onChange={this.gameTimeHandler}
                  value={this.state.game_time}
                  id="time"
                  required
                  className={styles['date-input']}
                />
              </div>

              <div className={styles['map-row']}>
                <div className={styles['map']}>
                  <div className={styles['map-search']}>
                    <GoogleAutocomplete onSetAddress={this.onSetAddress} />
                    <div className={styles['icon-wrapper']}>
                      <FontAwesomeIcon icon={faSearch} className={styles['icon']} />
                    </div>
                  </div>

                  <GoogleMapsComponent
                    loadingElement={<div style={{ height: '100%' }} />}
                    containerElement={<div style={{ height: '100%' }} />}
                    mapElement={<div style={{ height: '100%' }} />}
                    lat={this.context.userCoords.lat}
                    lng={this.context.userCoords.lng}
                    gamesList={[
                      {
                        game_name: this.state.game_name,
                        game_date: this.state.game_date,
                        game_time: this.state.game_time,
                        game_street: this.state.game_street,
                        game_city: this.state.game_city,
                        game_state: this.state.game_state,
                        game_zip: this.state.game_zip,
                        game_lat: +this.state.game_lat,
                        game_lng: +this.state.game_lng
                      }
                    ]}
                    zoom={this.state.zoom}
                  />
                </div>
              </div>

              <div className={styles['address-manual']}>
                <div className={styles['form-row']}>
                  <label htmlFor="street">Street:</label>
                  <input
                    type="text"
                    id="street"
                    onChange={this.gameStreetHandler}
                    value={this.state.game_street}
                    required
                  />
                </div>

                <div className={styles['form-row']}>
                  <label htmlFor="city">City:</label>
                  <input
                    type="text"
                    id="city"
                    onChange={this.gameCityHandler}
                    value={this.state.game_city}
                    required
                  />
                </div>

                <div className={styles['form-row']}>
                  <label htmlFor="state">State:</label>
                  <input
                    type="text"
                    id="state"
                    onChange={this.gameStateHandler}
                    value={this.state.game_state}
                    required
                  />
                </div>

                <div className={styles['form-row']}>
                  <label htmlFor="zip">Zip-code:</label>
                  <input
                    type="text"
                    id="zip"
                    onChange={this.gameZipHandler}
                    value={this.state.game_zip}
                    required
                  />
                </div>
              </div>

              <div className={styles['btns-panel']}>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}
