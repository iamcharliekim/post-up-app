import React from 'react';
import './Search.css'

export default function Search(props) {
    return (
        <React.Fragment>
            <div className="search-games-wrapper">
                <input type="text" placeholder="Search for games"/>
                <button>Search</button>
            </div>

            
        </React.Fragment>
    );
}
