import React from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom'
import Navbar from './Navbar/Navbar';
import { Route } from 'react-router-dom'
import SignUp from './SignUp/SignUp';
import Landing from './Landing/Landing';
import SignIn from './SignIn/SignIn';
import './App.css'
import TokenService from './Services/TokenService';
import Home from './Home/Home'
import CreateGames from './CreateGames/CreateGames';
import Context from './Context/Context'
import GamesApiService from './Services/GamesApiService';
import GamesListItem from './GamesListItem/GamesListItem';
import CommentsService from './CommentsBoard/CommentsService';
import Search from './Search/Search';


export default class App extends React.Component {
  static contextType = Context

  state = {
    games: [],
    myGames: [],
    comments: [],
    userCoords: {
        lat: null,
        lng: null
    },
    searchString: ''
  }

  componentDidMount(){
    // GET USER-COORDS
    this.getUserCoords();

    // GET ALL GAMES
    GamesApiService.getAllGames()
      .then(games => {
        if(games){
          this.setState({games})
        }
      })

    // GET USER'S GAMES
    GamesApiService.getGamesByUserId()
      .then(myGames => {
        if (myGames){
          this.setState({myGames})
        }
      })

    // GET ALL COMMENTS
    CommentsService.getComments()
      .then(comments => {
        this.setState({comments})

      })
  }

  onSearchGames = (e) => {
    this.setState({searchString: e.target.value})
  }

  addComment = (comment) => {
    const commentsCopy = [...this.state.comments]
    commentsCopy.push(comment)
    this.setState({comments: commentsCopy})
  }

  updateGames = (games) => {
    this.setState({games})
  }

  updateUserCoords = (userCoords) => {
    this.setState({userCoords})
  }

  updateMyGames = (myGames) => {
    this.setState({myGames})
  }

  getUserCoords = () => {
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=> {              
          this.setState({userCoords: {
            lat: position.coords.latitude, 
            lng: position.coords.longitude
          }
        })
      })
    } else {
      console.log('Geolocation is not supported by this browser')
    }
  }
  

  render(){
    const contextVal = {
      updateGames: this.updateGames,
      updateMyGames: this.updateMyGames,
      games: this.state.games,
      myGames: this.state.myGames,
      getUserCoords: this.getUserCoords,
      userCoords: this.state.userCoords,
      comments: this.state.comments,
      addComment: this.addComment,
    }

    return (
      <BrowserRouter>
        <Context.Provider value={contextVal}>
          <main className='App'>
            <Navbar loggedIn={TokenService.hasAuthToken()}/>
      
            { TokenService.hasAuthToken() ? <Redirect to='/home'/> : <Redirect to='/sign-in'/> }
            

            <Route path="/sign-up" exact component={SignUp}/>
            <Route path="/sign-in" exact component={SignIn}/>
            <Route path="/home" exact component={Home}/>
            <Route path="/my-games" exact component={Home}/>
            <Route path="/edit-games/:game_id" exact component={CreateGames}/>
            <Route path="/landing" exact component={Landing}/>
            <Route path="/create-games" exact component={CreateGames}/>
            <Route path="/games/:game_id" exact component={GamesListItem}/>
      
      
            {/* <Footer/> */}
          </main>
        </Context.Provider>
      </BrowserRouter>
    );

  }

}

