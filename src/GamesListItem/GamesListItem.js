import moment from 'moment';
import React from 'react';
import { withRouter } from 'react-router-dom';
import CommentsBoard from '../CommentsBoard/CommentsBoard';
import Context from '../Context/Context';
import GoogleMapsComponent from '../GoogleMapsComponent/GoogleMapsComponent';
import GamesApiService from '../Services/GamesApiService';
import styles from './GamesListItem.module.css';

import {
  faMapMarkerAlt,
  faCalendarAlt,
  faClock,
  faUserCircle,
  faCaretDown
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class GamesListItem extends React.Component {
  static contextType = Context;

  state = {
    showRoster: false,
    rsvpCount: '',
    disableCheckInBtn: false,
    disableCheckOutBtn: true,
    addressString: '',
    pathname: this.props.pathname,
    gamesPage: this.props.location.state,

    attendance: null,
    rosterList: null,

    selectedGame: !this.props.location.state
      ? this.props.selectedGame
      : this.props.location.state.gamesList,
    game: this.props.location.state ? this.props.location.state.gamesList[0] : this.props.game,
    userIsAttending: null
  };

  componentDidMount() {
    let gameObj = this.props.location.state;

    if (gameObj) {
      this.setState({
        game: gameObj.gamesList[0],
        selectedGame: gameObj.gamesList,
        game_lat: +gameObj.lat,
        game_lng: +gameObj.lng
      });
    }

    this.formatAddressURI();

    let rsvpCount, attendance, disableCheckInBtn, disableCheckOutBtn, userIsAttending;
    const rosterList = [];

    GamesApiService.getAttendanceCount(this.state.game.id).then(rsvp => {
      rsvpCount = rsvp;

      GamesApiService.getGameAttendance(this.state.game.id).then(game => {
        if (game) {
          attendance = game.attendance;

          userIsAttending = game.attendance.find(user => user.attending_user === +game.user_id);

          if (userIsAttending) {
            disableCheckInBtn = true;
            disableCheckOutBtn = false;
            userIsAttending = true;
          }

          game.attendance.forEach(game => {
            GamesApiService.getUserName(game.attending_user).then(username => {
              rosterList.push({
                username: username.username,
                id: +game.attending_user
              });
            });
          });
          this.setState({
            rosterList,
            attendance,
            rsvpCount,
            disableCheckInBtn,
            disableCheckOutBtn,
            userIsAttending
          });
        }
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.game !== prevProps.game) {
      this.setState({ game: this.props.game });
    }
  }

  incrementRoster(e) {
    e.preventDefault();
    e.stopPropagation();

    GamesApiService.postGameAttendance({
      game_id: this.state.game.id
    }).then(userObj => {
      let rosterCopy = [...this.state.rosterList];
      rosterCopy.push(userObj);
      this.setState({
        rsvpCount: this.state.rsvpCount + 1,
        disableCheckInBtn: true,
        disableCheckOutBtn: false,
        rosterList: rosterCopy
      });
    });
  }

  decrementRoster(e) {
    e.preventDefault();
    e.stopPropagation();

    GamesApiService.deleteGameAttendance(this.state.game.id).then(userObj => {
      let rosterCopy = [...this.state.rosterList];

      let userIndex = rosterCopy.findIndex(user => user.id === userObj.id);
      rosterCopy.splice(userIndex, 1);

      this.setState({
        rsvpCount: this.state.rsvpCount - 1,
        disableCheckInBtn: false,
        disableCheckOutBtn: true,
        rosterList: rosterCopy
      });
    });
  }

  formatAddressURI = () => {
    let geocodeAddress = `${this.state.game.game_street}${this.state.game.game_city}${this.state.game.game_state} ${this.state.game.game_zip}`;
    let parsedGeoCodeAddress = geocodeAddress.split(' ').join('+');
    this.setState({ gameAddressString: parsedGeoCodeAddress });
  };

  editGame = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.history.push(`/edit-games/${this.props.selectedGame[0].id}`);
  };

  deleteGame = e => {
    e.preventDefault();
    e.stopPropagation();

    GamesApiService.deleteGame(this.props.selectedGame[0].id).then(res => {
      const gameIndex = this.context.games.findIndex(
        game => game.id === this.props.selectedGame[0].id
      );
      let gamesCopy = [...this.context.games];
      gamesCopy.splice(gameIndex, 1);
      this.context.updateGames(gamesCopy);

      const myGameIndex = this.context.myGames.findIndex(
        game => game.id === this.props.selectedGame[0].id
      );
      let myGamesCopy = [...this.context.myGames];
      myGamesCopy.splice(myGameIndex, 1);
      this.context.updateMyGames(myGamesCopy);
    });
  };

  openGame = () => {
    // IF CLICKING GAME-CARD TO OPEN GAMES-PAGE
    if (!this.state.gamesPage) {
      let gamesList = this.context.games.filter(game => game.id === this.state.game.id);

      this.props.history.push({
        pathname: `/games/${this.state.game.id}`,
        state: {
          gamesList,
          lat: +gamesList[0].game_lat,
          lng: +gamesList[0].game_lng,
          zoom: 10
        }
      });
    }
  };

  showRoster = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showRoster: !this.state.showRoster });
  };

  render() {
    let rosterList;
    rosterList = this.state.rosterList
      ? this.state.rosterList.map((username, i) => <span key={i}>{username.username}</span>)
      : null;

    let date = moment(this.state.game.game_date.split('T')[0]).format('MMMM Do YYYY');
    let time = moment(this.state.game.game_time, 'HH:mm:ss').format('hh:mm A');

    let gameStreet = this.state.game.game_street;
    let gameCityStateZip = `${this.state.game.game_city} ${this.state.game.game_state} ${this.state.game.game_zip}`;

    return (
      <React.Fragment>
        <div
          className={!this.state.gamesPage ? styles['games-search-result'] : styles['games-page']}
          onClick={this.openGame}
        >
          <header>
            <h1>{this.state.game.game_name}</h1>
          </header>

          <div className={styles['game-date']}>
            <div className={styles['icon-wrapper']}>
              <FontAwesomeIcon icon={faCalendarAlt} className={styles['icon']} />
            </div>
            <span className={styles['text-wrapper']}>{date}</span>
          </div>

          <div className={styles['game-time']}>
            <div className={styles['icon-wrapper']}>
              <FontAwesomeIcon icon={faClock} className={styles['icon']} />
            </div>
            <span className={styles['text-wrapper']}>{time}</span>
          </div>

          {this.state.gamesPage ? (
            <div className={styles['google-maps-wrapper']}>
              <GoogleMapsComponent
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '200px' }} />}
                mapElement={<div style={{ height: '100%' }} />}
                lat={+this.state.game.game_lat}
                lng={+this.state.game.game_lng}
                gamesList={this.state.selectedGame}
                zoom={10}
              />
            </div>
          ) : null}

          <div className={styles['address']}>
            <div className={styles['icon-wrapper']}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className={styles['icon']} />
            </div>

            <a
              href={`https://www.google.com/maps/dir/?api=1&origin=${this.context.userCoords.lat},${this.context.userCoords.lng}&destination=${this.state.gameAddressString}`}
              target="_blank"
              rel="noopener noreferrer"
              className="address-link"
              onClick={e => e.stopPropagation()}
            >
              <span className="game-street">{gameStreet}</span>
              <span className="game-city-state-zip">{gameCityStateZip}</span>
            </a>
          </div>

          <div
            className={this.state.gamesPage ? styles['rsvp-link'] : styles['rsvp']}
            onClick={this.showRoster}
          >
            <div className={styles['icon-wrapper']}>
              {!this.state.gamesPage ? (
                <FontAwesomeIcon icon={faUserCircle} className={styles['icon']} />
              ) : (
                <FontAwesomeIcon icon={faCaretDown} className={styles['icon']} />
              )}
            </div>
            <span className="text-wrapper">{this.state.rsvpCount} players attending</span>
          </div>

          <div
            className={
              this.state.showRoster && this.state.gamesPage
                ? styles['showRoster']
                : styles['hideRoster']
            }
          >
            {rosterList}
          </div>

          <div className={styles['rsvp-attending']}>
            <button onClick={e => this.incrementRoster(e)} disabled={this.state.disableCheckInBtn}>
              Check-in
            </button>
            <button onClick={e => this.decrementRoster(e)} disabled={this.state.disableCheckOutBtn}>
              Check-out
            </button>
          </div>

          {this.state.game.created_by === this.context.user_id ? (
            <div className={styles['edit-games-btns-wrapper']}>
              <button onClick={e => this.editGame(e)}> Edit</button>
              <button onClick={e => this.deleteGame(e)}> Delete</button>
            </div>
          ) : null}

          {this.state.gamesPage ? <CommentsBoard game_id={this.state.game.id} /> : null}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(GamesListItem);
