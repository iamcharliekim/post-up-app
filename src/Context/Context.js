import React from 'react'

const Context = React.createContext({
    user_id: '',
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
    addComment: ()=> {},
    filteredMyGames: [],

    openNav: '',
    onOpenNav:()=> {}
})

export default Context