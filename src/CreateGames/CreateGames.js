import React from 'react';
import styles from './CreateGames.module.css'
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import Context from '../Context/Context';

import GamesApiService from '../Services/GamesApiService';
import GoogleAutocomplete from '../GoogleAutocomplete/GoogleAutocomplete';
import GoogleMapsComponent from '../GoogleMapsComponent/GoogleMapsComponent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import moment from 'moment';


export default class CreateGames extends React.Component {

static contextType = Context

    state = {
        mapsApiKey: 'AIzaSyDOvfuKaaRuYocVQWNl9ICi3wadIephDyc',
        games: [],
        mapSearchQuery: '',
        game_name: '',
        game_date: '',
        game_time: '',
        game_street: '',
        game_city: '',
        game_state: '',
        game_zip: '',
        error: null,
        addressString: '',
        game_lat: null,
        game_lng: null,
        game_coors: null,
        selectedGame: '',
        zoom: 8,

        path: this.props.location.pathname,
        game_id: +this.props.match.params.game_id,
        edit_game: false,
        gameToEdit: {}

    }

    componentDidMount(){

        const gamesList=[{
            game_name: this.state.game_name,
            game_date: this.state.game_date,
            game_time: this.state.game_time,
            game_street:this.state.game_street,
            game_city: this.state.game_city,
            game_state: this.state.game_state,
            game_zip: this.state.game_zip,
            game_lat: +this.state.game_lat,
            game_lng: +this.state.game_lng,
        }]

        console.log('gameslist', gamesList)

        // IF USER IS EDITING GAME, FIND GAME USING THE game_id PARAM AND POPULATE FORM FIELDS
        if (this.state.game_id){
            let game = this.context.games.find(game => game.id === this.state.game_id)

            this.setState({
                edit_game: true,
                game_name: game.game_name,
                game_date: game.game_date,
                game_time: game.game_time,
                game_street:game.game_street,
                game_city: game.game_city,
                game_state: game.game_state,
                game_zip: game.game_zip,
                game_lat: game.game_lat,
                game_lng: game.game_lng
            })
        }
    }

    onSetAddress = (addressString, zipCode, coors) => {
        // CALLED WHEN USER USES GOOGLE AUTOCOMPLETE TO AUTOFILL THE ADDRESS FIELDS
        let address = addressString.split(',')

        let game_street = address[0]
        let game_city = address[1]
        let game_state = address[2]
        let game_zip = zipCode
        let game_coors = coors
        let game_lat = coors.lat
        let game_lng =  coors.lng

        this.setState({
            game_street,
            game_city,
            game_state,
            game_zip,
            game_lat,
            game_lng,
            game_coors, 
            zoom: 10

        })
    }

    gameNameHandler = (e) => {
        this.setState({game_name: e.target.value})
    }
    
    gameDateHandler = (game_date) => {

        // PARSE DATE AND TIME IN PROPER FORMATS
        let date = moment(game_date).toDate()
        let game_time = new Date(moment(game_date).toDate().getTime()).toTimeString().split(' ')[0]
        
        this.setState({game_date: date, game_time})
    }

    gameTimeHandler = (game_time) => {
        this.setState({game_time})
    }

    gameStreetHandler = (e) => {
        this.setState({game_street: e.target.value})
    }

    gameCityHandler = (e) => {
        this.setState({game_city: e.target.value})
    }

    gameStateHandler = (e) => {
        this.setState({game_state: e.target.value})
    }

    gameZipHandler = (e) => {
        this.setState({game_zip: e.target.value})
    }

    mapSearchHandler = (e) => {
        this.setState({mapSearchQuery: e.target.value})
    }

    onSubmitHandler = (e) => {
        e.preventDefault();



        let gameObj = {
            game_name: this.state.game_name,
            game_date: this.state.game_date,
            game_time: this.state.game_time,
            game_street:this.state.game_street,
            game_city: this.state.game_city,
            game_state: this.state.game_state,
            game_zip: this.state.game_zip,
            game_lat: this.state.game_lat,
            game_lng: this.state.game_lng
        }

        if (!this.state.game_coors){
            // IF USER DOES NOT USE GOOGLE AUTOCOMPLETE TO FILL ADDRESS FIELDS, GRAB THE ADDRESS COORDINATES VIA GOOGLEMAPS API
            let geocodeAddress = `${this.state.game_street} ${this.state.game_city} ${this.state.game_state} ${this.state.game_zip}`
            let parsedGeoCodeAddress = geocodeAddress.split(' ').join('+')

            GamesApiService.getCoordinates(parsedGeoCodeAddress, this.state.mapsApiKey)
                .then(coors => {
                    gameObj.game_lat = coors.results[0].geometry.location.lat
                    gameObj.game_lng = coors.results[0].geometry.location.lng

                    this.state.edit_game ? this.putGame(this.state.game_id, gameObj) : this.postGame(gameObj)
                })
        }
        
        this.state.edit_game ? this.putGame(this.state.game_id, gameObj) : this.postGame(gameObj)

    }

    putGame = (game_id, editedGame) => {
        return GamesApiService.putGame(game_id, editedGame)
                .then(res => {
                    this.updateGame(res)
                })
                .catch(res => {
                    this.setState({error: res.error})
                })
    }

    postGame = (newGame) => {
        return GamesApiService.postGame(newGame)
                .then(res => {
                    this.addNewGame(newGame, res) 
                })
                .catch(res => {
                    this.setState({error: res.error})
                })
    }

    addNewGame = (newGame, res) => {
        newGame.id = res[0].id
        newGame.created_by = res[0].created_by

        const gamesCopy = [...this.context.games]
        gamesCopy.push(newGame)
        this.context.updateGames(gamesCopy)

        const myGamesCopy = [...this.context.myGames]
        myGamesCopy.push(newGame)
        this.context.updateMyGames(myGamesCopy)
        this.props.history.push('/home')
    }

    updateGame = (editedGame) => {
        const gamesCopy = [...this.context.games]
        const gameIndex = gamesCopy.findIndex(game => game.id === editedGame.id)
        gamesCopy[gameIndex] = editedGame
        this.context.updateGames(gamesCopy)

        const myGamesCopy = [...this.context.myGames]
        const myGameIndex = myGamesCopy.findIndex(game => game.id === editedGame.id)
        myGamesCopy[myGameIndex] = editedGame
        this.context.updateMyGames(myGamesCopy)
        this.props.history.push('/home')
    }

    render() {
  
        return (
                <React.Fragment>
                    {
                        !this.context.openNav ?

                        <div className={styles["create-game-wrapper"]}>
                            <form onSubmit={this.onSubmitHandler}>
                                <div className={styles["form-row"]}>
                                    <label htmlFor="game_name">Name:</label>
                                    <input type="text" placeholder="Give your game a name" id="game_name" onChange={this.gameNameHandler} value={this.state.game_name}/>
                                </div>

                                <div className={styles["form-row"]}>
                                    <label htmlFor="date-picker">Date/Time</label>
                                        <DateTimePicker gameDateHandler={this.gameDateHandler} gameDate={this.state.game_date} gameTimeHandler={this.gameTimeHandler} edit = {this.state.game_id} startDate={this.state.game_date}/>
                                </div>

                                <div className={styles["map-row"]}>
                                    <div className={styles["map"]}>
                                        <div className={styles["map-search"]}>
                                            <GoogleAutocomplete onSetAddress = {this.onSetAddress}/>
                                            <div className={styles["icon-wrapper"]}>
                                                <FontAwesomeIcon icon={faSearch} className={styles["icon"]}/>
                                            </div>
                                        </div>

                                        <GoogleMapsComponent
                                            loadingElement={<div style={{ height: '100%'}}/>}
                                            containerElement={<div style={{ height: '100%'}}/>}
                                            mapElement={<div style={{height: '100%'}}/>}
                                            lat={this.context.userCoords.lat}
                                            lng={this.context.userCoords.lng}
                                            gamesList={[{
                                                game_name: this.state.game_name,
                                                game_date: this.state.game_date,
                                                game_time: this.state.game_time,
                                                game_street:this.state.game_street,
                                                game_city: this.state.game_city,
                                                game_state: this.state.game_state,
                                                game_zip: this.state.game_zip,
                                                game_lat: +this.state.game_lat,
                                                game_lng: +this.state.game_lng,
                                            }]}
                                            zoom={this.state.zoom}                          
                                        /> 
                                    </div>
                                </div>
             
                                <div className={styles["address-manual"]}>
                                    <div className={styles["form-row"]}>
                                        <label htmlFor="street">Street:</label>
                                        <input type="text" id="street" onChange={this.gameStreetHandler} value={this.state.game_street}/>
                                    </div>                      
                                    
                                    <div className={styles["form-row"]}>
                                        <label htmlFor="city">City:</label>
                                        <input type="text" id="city" onChange={this.gameCityHandler} value={this.state.game_city}/>
                                    </div>

                                    <div className={styles["form-row"]}>
                                        <label htmlFor="state">State:</label>
                                        <input type="text" id="state" onChange={this.gameStateHandler} value={this.state.game_state}/>
                                    </div>                  

                                    <div className={styles["form-row"]}>
                                        <label htmlFor="zip">Zip-code:</label>
                                        <input type="text" id="zip" onChange={this.gameZipHandler} value={this.state.game_zip}/>
                                    </div>
                                </div>

                                <div className={styles["btns-panel"]}>
                                    <button type="submit">Submit</button>
                                </div> 
                            </form>    
                        </div>       

                        : null

                    }
                     
                </React.Fragment>
        );
    }
}

