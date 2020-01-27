import React from 'react';
import './CreateGames.css'
import GamesApiService from '../Services/GamesApiService';
import GoogleAutocomplete from '../GoogleAutocomplete/GoogleAutocomplete';
import Context from '../Context/Context';
import GoogleMapsComponent from '../GoogleMapsComponent/GoogleMapsComponent';

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
        selectedGame: ''
    }

    componentDidMount(){
        

    }

    onSetAddress = (address, zipCode, coors) => {
        console.log(coors)

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

        })

        console.log(this.state)
    }

    gameNameHandler = (e) => {
        this.setState({game_name: e.target.value})
    }
    
    gameDateHandler = (e) => {
        this.setState({game_date: e.target.value})
    }

    gameTimeHandler = (e) => {
        this.setState({game_time: e.target.value})
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
        console.log(this.state.mapSearchQuery)

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
            // add game-coors 
            let googleGetCoorsURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${parsedGeoCodeAddress}&key=${this.state.mapsApiKey}`

            fetch(googleGetCoorsURL).then(res => {
                if(res.status ===200){
                    return res.json()
                } else {
                    throw new Error(res.statusText)
                }
            }).then(coors => {
                newGame.game_lat = coors.results[0].geometry.location.lat
                newGame.game_lng = coors.results[0].geometry.location.lng

                console.log('manualFillNewGame', newGame)

                GamesApiService.postGame(newGame)
                .then(res => {
                    this.props.history.push('/home')

                })
                .catch(res => {
                    this.setState({error: res.error})
                })
            })
        } else {
            console.log('autofillNewGame', newGame)

            GamesApiService.postGame(newGame)
            .then(res => {
                this.props.history.push('/home')

            })
            .catch(res => {
                this.setState({error: res.error})
            })
        }

    }


    render() {

        return (
            <React.Fragment>
                <div className="create-game-wrapper">
                    <header><h4>Create a game!</h4></header>
                    <form onSubmit={this.onSubmitHandler}>
                        <div className="form-row">
                            <label htmlFor="">Name:</label>
                            <input type="text" placeholder="Give your game a name" onInput={this.gameNameHandler}/>
                        </div>

                        <div className="form-row">
                            <label htmlFor="">Date:</label>
                            <input type="date" onInput={this.gameDateHandler}/>
                        </div>        
            
                        <div className="form-row">
                            <label htmlFor="">Time:</label>
                            <input type="text" onInput={this.gameTimeHandler}/>
                        </div>  

                        <div className="map-row">
                            <h3>Pick a court:</h3>
                            <div className="map">
                                <div className="map-search">
                                    <GoogleAutocomplete onSetAddress = {this.onSetAddress}/>
                                </div>

                            { this.state.game_coors ?
                                <GoogleMapsComponent
                                    loadingElement={<div style={{ height: '100%'}}/>}
                                    containerElement={<div style={{ height: '100%'}}/>}
                                    mapElement={<div style={{height: '100%'}}/>}
                                    lat={+this.state.game_lat}
                                    lng={+this.state.game_lng}
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
                                        lat: +this.state.game_lat,
                                        lng: +this.state.game_lng,
                                    }]}                          
                                
                                /> : null
                                }

                                
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

