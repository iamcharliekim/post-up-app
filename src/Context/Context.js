import React from 'react'

const Context = React.createContext({
    updateGames: ()=> {},
    updateMyGames: ()=> {},
    updateUserCoords: ()=> {},
    updateTesting: ()=> {},
    onSetAddress: ()=> {},
    getUserCoords: ()=> {},
    games: [],
    userCoords: {
        lat: null, lng: null
    },
    myGames: [],

    searchString: '',
    onSearchGames: ()=> {},
    filterGames: () => {},
    filteredGames: [],

    comments: [],
    addComment: ()=> {}
})

export default Context