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
            games = this.context.filteredMyGames
        } else {
            games = this.context.filteredGames
        }

        return (
                <React.Fragment>
                    { 
                    
                    !this.context.openNav ?
                        <React.Fragment>
                            <Search/>
                            <div className={styles["games-list"]}>
                                {games.map((game, i) => {
                                    return  <GamesListItem 
                                            key={i} 
                                            game={game}
                                            selectedGame={[game]}
                                            pathname={this.props.location.pathname}
                                />
                                })}
                            </div>
                        </React.Fragment>                    
                            
                            : null
                    }
                
                </React.Fragment>
        );
    }
}

