import React from 'react';
import './GamesListItem.css'
import GamesApiService from '../Services/GamesApiService';
import GoogleMapsComponent from '../GoogleMapsComponent/GoogleMapsComponent'

export default class GamesListItem extends React.Component {
    state = {
        rsvpCount: ''
    }




    componentDidMount(){
        console.log('gamesList', this.props.selectedGame)
        console.log(this.props.gameId)
        GamesApiService.postIncrementGameAttendance({game_id: this.props.gameId})
        .then(rsvpCount => {
            console.log('gameToIncrement', rsvpCount)

            this.setState({rsvpCount})
        })

    }

    incrementGameAttendance(e){

        console.log('incrementGameAttendance()', this.props.gameId)
        e.preventDefault()

        GamesApiService.postIncrementGameAttendance({game_id: this.props.gameId})
            .then(rsvpCount => {
                console.log('gameToIncrement', rsvpCount)

                this.setState({rsvpCount})
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="games-search-result">
                        <h1>{this.props.gamename}</h1>
                        <div className="game-when">
                        <span className="game-date">{this.props.gamedate}</span>
                        
                        <span className="game-time">{this.props.gametime}</span>
                        </div>
                        <div className="" style={{width: '100%', height: '100%'}}>

                        <GoogleMapsComponent
                            // googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing&key=AIzaSyDOvfuKaaRuYocVQWNl9ICi3wadIephDyc'}
                            loadingElement={<div style={{ height: '100%'}}/>}
                            containerElement={<div style={{ height: '400px'}}/>}
                            mapElement={<div style={{height: '100%'}}/>}
                            lat={this.props.gamelat}
                            lng={this.props.gamelng}
                            gamesList={this.props.selectedGame}

                        />
                        
                        
                        
                        </div>

                        <div className="address">
                            <a href="www.google.com">
                                <span>{`${this.props.gamestreet} ${this.props.gamecity} ${this.props.gamestate} ${this.props.gamezip}`}</span>
                            </a>
                        </div>

                        <div className="rsvp">{this.state.rsvpCount} <i>players attending</i></div>
                        <div className="rsvp-attending">
                            <button onClick={(e)=>this.incrementGameAttendance(e)}> Check-in</button>
                        </div>
                    </div>
            </React.Fragment>
        );
    }
}
