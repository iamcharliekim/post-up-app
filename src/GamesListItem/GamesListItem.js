import React from 'react';
import './GamesListItem.css'
import GamesApiService from '../Services/GamesApiService';
import GoogleMapsComponent from '../GoogleMapsComponent/GoogleMapsComponent'
import Moment from 'react-moment';
import 'moment-timezone';
import Context from '../Context/Context'


export default class GamesListItem extends React.Component {
    static contextType = Context

    state = {
        rsvpCount: '',
        disableCheckInBtn: false,
        disableCheckOutBtn: true,
        gameAddressString: '',
    }

    componentDidMount(){
        this.formatAddressURI()

        // get and set rsvpCount
        GamesApiService.getAttendanceCount(this.props.gameId)
            .then(rsvpCount => {
                this.setState({rsvpCount})
            })

        // check and see if user is already attending and update check-in/out btn's disabled state 
        GamesApiService.getGameAttendance(this.props.gameId)
            .then(userIsAttending => {           
                if (userIsAttending){
                    this.setState({disableCheckInBtn: true, disableCheckOutBtn: false})
                } 
            })
    }

    incrementGameAttendance(e){
        e.preventDefault()

        GamesApiService.postGameAttendance({game_id: this.props.gameId})
            .then(rsvpCount => {
                this.setState({rsvpCount, disableCheckInBtn: true, disableCheckOutBtn: false})
            })
    }

    decrementGameAttendance(e){
        e.preventDefault()

        GamesApiService.deleteGameAttendance(this.props.gameId)
            .then(rsvpCount => {
                this.setState({rsvpCount, disableCheckInBtn: false, disableCheckOutBtn: true})
            })
    }

    formatAddressURI = () => {
        let geocodeAddress = `${this.props.gamestreet}${this.props.gamecity}${this.props.gamestate} ${this.props.gamezip}`
        let parsedGeoCodeAddress = geocodeAddress.split(' ').join('+')
        this.setState({gameAddressString: parsedGeoCodeAddress})

    }

    render() {
        return (
            <React.Fragment>
                <div className="games-search-result">
                        <h1>{this.props.gamename}</h1>
                        <div className="game-when">
                        <span className="game-date">
                            <Moment format={"dddd, MMMM Do YYYY, h:mm A"}>
                                {this.props.gamedate}

                            </Moment>
                        </span>
                        
                        {/* <span className="game-time">

                        </span> */}
                        </div>
                        <div className="" style={{width: '100%', height: '100%'}}>

                        <GoogleMapsComponent
                            // googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing&key=AIzaSyDOvfuKaaRuYocVQWNl9ICi3wadIephDyc'}
                            loadingElement={<div style={{ height: '100%'}}/>}
                            containerElement={<div style={{ height: '400px'}}/>}
                            mapElement={<div style={{height: '100%'}}/>}
                            lat={+this.props.gamelat}
                            lng={+this.props.gamelng}
                            gamesList={this.props.selectedGame}
                            zoom={10}

                        />
                        
                        
                        
                        </div>

                        <div className="address">
                            <a href={`https://www.google.com/maps/dir/?api=1&origin=${this.context.userCoords.lat},${this.context.userCoords.lng}&destination=${this.state.gameAddressString}`}>
                                <span>{`${this.props.gamestreet} ${this.props.gamecity} ${this.props.gamestate} ${this.props.gamezip}`}</span>
                            </a>
                        </div>

                        <div className="rsvp">{this.state.rsvpCount} <i>players attending</i></div>
                        <div className="rsvp-attending">
                            <button onClick={(e)=>this.incrementGameAttendance(e)} disabled={this.state.disableCheckInBtn}> Check-in</button>
                            <button onClick={(e)=>this.decrementGameAttendance(e)} disabled={this.state.disableCheckOutBtn}> Check-out</button>
                        </div>
                    </div>
            </React.Fragment>
        );
    }
}
