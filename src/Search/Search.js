import React from 'react';
import styles from'./Search.module.css'
import Context from '../Context/Context'

export default class Search extends React.Component {
    static contextType = Context



    render() {
        return (
            <React.Fragment>
            <div className={styles["search-games-wrapper"]}>
                    <input 
                        type="text" 
                        placeholder="Search for games" 
                        onChange={this.context.onSearchGames} 
                        value={this.context.searchString}/>  
            </div>      
            </React.Fragment>
        );
    }
}
