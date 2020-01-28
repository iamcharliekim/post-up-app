import React from 'react'

const Context = React.createContext({
    updateGames: ()=> {},
    updateMyGames: ()=> {},
    updateUserCoords: ()=> {},
    updateTesting: ()=> {},
    onSetAddress: ()=> {},
    games: [],
    userCoords: {
        lat: 39.2453574, lng: -77.28408639999999
    },
    myGames: [],
})

export default Context