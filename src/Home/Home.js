import React from 'react';
import Context from '../Context/Context';
import GamesListItem from '../GamesListItem/GamesListItem';
import Search from '../Search/Search';
import styles from './Home.module.css';

export default class Home extends React.Component {
  static contextType = Context;

  render() {
    let games;

    if (this.props.location.pathname === '/my-games') {
      games = this.context.filteredMyGames;
    } else {
      games = this.context.filteredGames;
    }

    return (
      <React.Fragment>
        {!this.context.openNav ? (
          <React.Fragment>
            <Search />
            <div className={styles['games-list']}>
              {games.length === 0 ? <h1 className={styles['no-games']}>No games listed!</h1> : null}
              {games.map((game, i) => {
                return (
                  <GamesListItem
                    key={i}
                    game={game}
                    selectedGame={[game]}
                    pathname={this.props.location.pathname}
                  />
                );
              })}
            </div>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}
