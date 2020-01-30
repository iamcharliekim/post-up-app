import React from 'react';
import './GamesListItem.css'
import GamesApiService from '../Services/GamesApiService';
import GoogleMapsComponent from '../GoogleMapsComponent/GoogleMapsComponent'
import Moment from 'react-moment';
import 'moment-timezone';
import Context from '../Context/Context'
import { withRouter } from 'react-router-dom'
import CommentsBoard from '../CommentsBoard/CommentsBoard';



class GamesListItem extends React.Component {
    static contextType = Context

    state = {
        showRoster: false,
        rsvpCount: '',
        disableCheckInBtn: false,
        disableCheckOutBtn: true,
        pathname: this.props.pathname,
        addressString: '',

        gamesPage: this.props.location.state,

        game_name: !this.props.location.state ? this.props.gamename : this.props.location.state.gamesList[0].game_name,
        game_street: !this.props.location.state ? this.props.gamestreet : this.props.location.state.gamesList[0].game_street,
        game_city: !this.props.location.state ? this.props.gamecity : this.props.location.state.gamesList[0].game_city,
        game_state: !this.props.location.state ? this.props.gamestate : this.props.location.state.gamesList[0].game_state,
        game_zip: !this.props.location.state ? this.props.gamezip : this.props.location.state.gamesList[0].game_zip,


        selectedGame: !this.props.location.state ? this.props.selectedGame : this.props.location.state.gamesList,    
        game_id: !this.props.location.state ? +this.props.gameId : this.props.location.state.gamesList[0].id,
        game_lat: !this.props.location.state ? this.props.game_lat : this.props.location.state.lat,
        game_lng: !this.props.location.state ? this.props.game_lng : this.props.location.state.lng,

        attendance: null,
        rosterList: null,
    }

    componentDidMount(){
        let gameObj = this.props.location.state

        if (gameObj){ 
            this.setState({
                selectedGame: gameObj.gamesList,
                game_lat: +gameObj.lat,
                game_lng: +gameObj.lng
            })
        }

        this.formatAddressURI()

        // get and set rsvpCount
        GamesApiService.getAttendanceCount(this.state.game_id)
            .then(rsvpCount => {
                this.setState({rsvpCount})
            })

        // check and see if user is already attending and update check-in/out btn's disabled state 
        GamesApiService.getGameAttendance(this.state.game_id)
            .then(game => {     
                if (game){
                    console.log(game)

                    let userIsAttending = game.attendance.find(user => user.attending_user === +game.user_id)
                    console.log(userIsAttending)

                    if(userIsAttending){
                        this.setState({disableCheckInBtn: true, disableCheckOutBtn: false})
                    }

                    this.setState({attendance: game.attendance})

                    const rosterList = []
                    game.attendance.forEach(game=> {
                        GamesApiService.getUserName(game.attending_user)
                            .then(username => {
                                console.log(username.username)
                                rosterList.push({
                                    username: username.username,
                                    id: +game.attending_user
                                })
                            })
                    })

                    this.setState({rosterList})

                    console.log(this.state)

                } 
            })




    }

    incrementGameAttendance(e){
        e.preventDefault()
        e.stopPropagation()

        GamesApiService.postGameAttendance({game_id: this.state.game_id})
            .then(userObj => {
                console.log(userObj)
                let rosterCopy= [...this.state.rosterList]

                rosterCopy.push(userObj)

                this.setState({rsvpCount: this.state.rsvpCount + 1, disableCheckInBtn: true, disableCheckOutBtn: false, rosterList: rosterCopy})
            })
    }

    decrementGameAttendance(e){
        e.preventDefault()
        e.stopPropagation()

        GamesApiService.deleteGameAttendance(this.state.game_id)
            .then(userObj => {
                let rosterCopy= [...this.state.rosterList]

                let userIndex = rosterCopy.findIndex(user => user.id === userObj.id)
                rosterCopy.splice(userIndex, 1)

                this.setState({rsvpCount: this.state.rsvpCount -1, disableCheckInBtn: false, disableCheckOutBtn: true, rosterList: rosterCopy})
            })
    }

    formatAddressURI = () => {
        let geocodeAddress = `${this.state.game_street}${this.state.game_city}${this.state.game_state} ${this.state.game_zip}`
        let parsedGeoCodeAddress = geocodeAddress.split(' ').join('+')
        this.setState({gameAddressString: parsedGeoCodeAddress})
    }

    editGame = (e) => { 
        e.preventDefault()
        e.stopPropagation()

        console.log('editGame()')
        this.props.history.push(`/edit-games/${this.props.selectedGame[0].id}`)

    }

    deleteGame = (e) => { 
        e.preventDefault()
        GamesApiService.deleteGame(this.props.selectedGame[0].id)
            .then(res => {
                const gameIndex = this.context.games.findIndex(game => game.id === this.props.selectedGame[0].id)
                let gamesCopy = [...this.context.games]
                gamesCopy.splice(gameIndex, 1)
                this.context.updateGames(gamesCopy)

                const myGameIndex = this.context.myGames.findIndex(game => game.id === this.props.selectedGame[0].id)
                let myGamesCopy = [...this.context.myGames]
                myGamesCopy.splice(myGameIndex, 1)
                this.context.updateMyGames(myGamesCopy)

                this.props.history.push('/home')
            })
    }

    openGame = (game_id) => {
        if (!this.state.gamesPage){
            let gamesList = this.context.games.filter(game => game.id === +this.props.gameId)

            this.props.history.push({
                pathname: `/games/${this.props.gameId}`,
                state: {
                    gamesList: gamesList,
                    lat: +gamesList[0].game_lat,
                    lng: +gamesList[0].game_lng,
                    zoom: 10
                }
            })
        }
    }

    showRoster = (e) => {
        e.preventDefault()
        e.stopPropagation()

        this.setState({showRoster: !this.state.showRoster})

        console.log('show roster')
        console.log(this.state.rosterList)
    }
    render() {
        let rosterList;
        if (this.state.rosterList){
             rosterList = this.state.rosterList.map((username, i) => {
            return <li key={i}>{username.username}</li>
        })
        }

        console.log(this.props.location.state , this.state.game_name)
        return (
            <React.Fragment>
                <div className={!this.state.gamesPage ? "games-search-result" : "games-page"} onClick={()=>this.openGame(this.props.gameId)}> 
  
                        <h1>{this.state.game_name}</h1>
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
                            lat={+this.state.game_lat}
                            lng={+this.state.game_lng}
                            gamesList={this.state.selectedGame}
                            zoom={10}

                        />
                        
                        
                        
                        </div>

                        <div className="address">
                            <a href={`https://www.google.com/maps/dir/?api=1&origin=${this.context.userCoords.lat},${this.context.userCoords.lng}&destination=${this.state.gameAddressString}`} target="_blank" rel="noopener noreferrer">
                                <span>{`${this.state.game_street} ${this.state.game_city} ${this.state.game_city} ${this.state.game_zip}`}</span>
                            </a>
                        </div>

                        <div className={this.state.gamesPage ? "rsvp-link" : "rsvp"} onClick={this.showRoster}>{this.state.rsvpCount} <i>players attending</i></div>

                        <ul className={this.state.showRoster && this.state.gamesPage ? "showRoster" : "hideRoster" }>
                            {rosterList}
                        </ul>

                        <div className="rsvp-attending">
                            <button onClick={(e)=>this.incrementGameAttendance(e)} disabled={this.state.disableCheckInBtn}> Check-in</button>
                            <button onClick={(e)=>this.decrementGameAttendance(e)} disabled={this.state.disableCheckOutBtn}> Check-out</button>
                            {
                                this.state.pathname === '/my-games' ?
                                <div className="edit-games-btns-wrapper">
                                    <button onClick={(e)=>this.editGame(e)}> Edit</button>
                                    <button onClick={(e)=>this.deleteGame(e)}> Delete</button>
                                </div>
                                : null
                            }
       
                        </div>
                        {
                            this.state.gamesPage ? 
                            
                                <CommentsBoard
                                    game_id={this.state.game_id}
                                />                    
                             : null

                        }
                        </div>
            </React.Fragment>
        );
    }
}

export default withRouter(GamesListItem)