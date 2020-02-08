import React from 'react';
import styles from'./Search.module.css'
import Context from '../Context/Context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


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
                        value={this.context.searchString}
                        />  
                    <FontAwesomeIcon icon={faSearch} className={styles["icon"]}/>
            </div>      
            </React.Fragment>
        );
    }
}
