import React from 'react';
import './Home.css'
import Search from '../Search/Search';
import GamesListItem from '../GamesListItem/GamesListItem';
import Context from '../Context/Context'

export default class Home extends React.Component {
    static contextType = Context
    _isMounted = false



    state = {
        error: null,
        pathName:this.props.location.pathname
    }

    componentDidMount(){
        this._isMounted = true
    }

    componentWillUnmount(){
        this._isMounted = false
    }

    render() {
        let games;

        if (this.props.location.pathname === '/my-games'){
            games = this.context.myGames.filter(game => game.game_name.includes(this.context.searchString))
        } else {
            console.log(this.context.searchString)
            games = this.context.games.filter(game => game.game_name.includes(this.context.searchString))
            console.log(games)
        }

        return (
                <React.Fragment>
                    <Search/>
                    <div className="games-list">
                        {games.map((game, i) => {
                            console.log(game)
                            return  <GamesListItem 
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
                                        pathname={this.state.pathName}
                            />
                        })}
                    </div>
                </React.Fragment>
        );
    }
}

