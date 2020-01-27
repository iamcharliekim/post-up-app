import React from 'react';
import './Home.css'
import Search from '../Search/Search';
import GamesApiService from '../Services/GamesApiService';
import GamesListItem from '../GamesListItem/GamesListItem';

export default class Home extends React.Component {
    _isMounted = false

    state = {
        games: [],
        error: null,
        userCoords: {
            lat: '',
            lng: ''
        }
    }

    componentDidMount(){
        this._isMounted = true

        if (this.props.location.pathname === '/my-games'){
            GamesApiService.getGamesByUserId()
                .then(gamesByUser => {
                    this.setState({games: gamesByUser})
                })
        } else {
            GamesApiService.getAllGames()
            .then(allGames => {
                if (this._isMounted){
                    this.setState({games: allGames})
                }
            })
        }

        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=> {
                if (this._isMounted){
                    this.setState({userCoords: { lat: position.coords.latitude, lng: position.coords.longitude}})
                }
            })
        } else {
            console.log('Geolocation is not supported by this browser')
        }
    }

    componentWillUnmount(){
        this._isMounted = false
    }

    render() {
        return (
            <React.Fragment>
                <Search/>
                <div className="games-list">
                    {this.state.games.map((game, i) => {
                        return <GamesListItem 
                                    gamename={game.game_name} 
                                    gamedate={game.game_date}
                                    gametime={game.game_time}
                                    gamestreet={game.game_street}
                                    gamecity={game.game_city}
                                    gamestate = {game.game_state}
                                    gamezip = {game.game_zip}
                                    gamelat = {game.game_lat}
                                    gamelng = {game.game_lng}
                                    key={i} 
                                    gameId={game.id}
                                    selectedGame={[game]}
                        />
                    })}
                </div>
            </React.Fragment>
        );
    }
}

