import React from 'react';
import styles from './Home.module.css'
import Search from '../Search/Search';
import GamesListItem from '../GamesListItem/GamesListItem';
import Context from '../Context/Context'

export default class Home extends React.Component {
    static contextType = Context
    _isMounted = false



    state = {
        error: null,
        pathName:this.props.location.pathname,
        games: this.context.games,
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
            games = this.context.myGames
            
        } else {
            games = this.context.games 
        }

        return (
                <React.Fragment>
                    <div className={styles["games-list"]}>
                        {games.map((game, i) => {
                            return  <GamesListItem 

                                        key={i} 
                                        game={game}
                                        selectedGame={[game]}
                                        pathname={this.state.pathName}
                            />
                        })}
                    </div>
                </React.Fragment>
        );
    }
}

