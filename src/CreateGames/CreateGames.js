import React from 'react';
import './CreateGames.css'
import GamesApiService from '../Services/GamesApiService';
import GoogleAutocomplete from '../GoogleAutocomplete/GoogleAutocomplete';
import Context from '../Context/Context';
import GoogleMapsComponent from '../GoogleMapsComponent/GoogleMapsComponent';
import DateTimePicker from '../DateTimePicker/DateTimePicker';

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
        if (this.state.game_id){
            let game = this.context.games.find(game => game.id === this.state.game_id)
            console.log(game)

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

    onSetAddress = (address, zipCode, coors) => {
        let addy = address.split(',')

        let game_street = addy[0]
        let game_city = addy[1]
        let game_state = addy[2]
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
    
    gameDateHandler = (date) => {
        this.setState({game_date: date})
    }

    gameTimeHandler = (date) => {
        this.setState({game_time: date})
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

        let newGame = {
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
            let geocodeAddress = `${this.state.game_street} ${this.state.game_city} ${this.state.game_state} ${this.state.game_zip}`
            let parsedGeoCodeAddress = geocodeAddress.split(' ').join('+')

            GamesApiService.getCoordinates(parsedGeoCodeAddress, this.state.mapsApiKey)
                .then(coors => {
                    newGame.game_lat = coors.results[0].geometry.location.lat
                    newGame.game_lng = coors.results[0].geometry.location.lng
                })
        }
        
        if (this.state.edit_game){
            // PUT-GAME
            GamesApiService.putGame(this.state.game_id, newGame)
                .then(res => {
                    console.log('PUTGAMERES', res)
                    this.updateGame(res)
                })
                .catch(res => {
                    this.setState({error: res.error})
                })
        } else {
            GamesApiService.postGame(newGame)
            .then(res => {
                this.addNewGame(newGame, res) 
            })
            .catch(res => {
                this.setState({error: res.error})
            })
        }


        
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
                    <div className="create-game-wrapper">
                        <header><h4>Create a game!</h4></header>
                        <form onSubmit={this.onSubmitHandler}>
                            <div className="form-row">
                                <label htmlFor="">Name:</label>
                                <input type="text" placeholder="Give your game a name" onChange={this.gameNameHandler} value={this.state.game_name}/>
                            </div>

                            {/* <div className="form-row">
                                <label htmlFor="">Date:</label>
                                <input type="date" onInput={this.gameDateHandler}/>
                            </div>        
                
                            <div className="form-row">
                                <label htmlFor="">Time:</label>
                                <input type="text" onInput={this.gameTimeHandler}/>
                            </div>   */}

                            <div className="form-row">
                                <DateTimePicker
                                    gameTimeHandler={this.gameTimeHandler}
                                    gameDateHandler={this.gameDateHandler}
                                
                                />
                            </div>

                            <div className="map-row">
                                <h3>Pick a court:</h3>
                                <div className="map">
                                    <div className="map-search">
                                        <GoogleAutocomplete onSetAddress = {this.onSetAddress}/>
                                    </div>

                                {/* { this.state.game_coors ? */}
                                    <GoogleMapsComponent
                                        loadingElement={<div style={{ height: '100%'}}/>}
                                        containerElement={<div style={{ height: '100%'}}/>}
                                        mapElement={<div style={{height: '100%'}}/>}
                                        lat={this.context.userCoords.lat}
                                        lng={this.context.userCoords.lng}
                                        gamesList={[{
                                            id: 'sometingUnique',
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

                    
                            <div className="address-manual">
                                <h3>Address:</h3>

                                <div className="form-row street">
                                    <label htmlFor="">Street:</label>
                                    <input type="text" onChange={this.gameStreetHandler} value={this.state.game_street}/>
                                </div>                      
                                
                                <div className="citystatezip">
                                    <div className="form-row city">
                                        <label htmlFor="">City:</label>
                                        <input type="text" onChange={this.gameCityHandler} value={this.state.game_city}/>
                                    </div>
                                    <div className="form-row state">
                                        <label htmlFor="">State:</label>
                                        <input type="text" onChange={this.gameStateHandler} value={this.state.game_state}/>
                                    </div>
                                </div>  

                                <div className="form-row zip">
                                    <label htmlFor="">Zip-code:</label>
                                    <input type="text" onChange={this.gameZipHandler} value={this.state.game_zip}/>
                                </div>
                            </div>


                            <div className="btns-panel">
                                <button type="submit">Submit</button>
                                <button>Cancel</button>
                            </div> 
                            
                        </form>    
                    </div>        
                </React.Fragment>
        );
    }
}

