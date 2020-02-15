import React from 'react';

const Context = React.createContext({
  user_id: '',
  games: [],
  userCoords: { lat: null, lng: null },
  myGames: [],
  searchString: '',
  filteredGames: [],
  comments: [],
  filteredMyGames: [],
  openNav: '',
  onOpenNav: () => {},
  updateGames: () => {},
  updateMyGames: () => {},
  updateUserCoords: () => {},
  updateTesting: () => {},
  onSetAddress: () => {},
  getUserCoords: () => {},
  addComment: () => {},
  onSearchGames: () => {},
  filterGames: () => {}
});

export default Context;
