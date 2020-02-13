import React from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom'
import Navbar from './Navbar/Navbar';
import { Link, Route } from 'react-router-dom'
import SignUp from './SignUp/SignUp';
import Landing from './Landing/Landing';
import SignIn from './SignIn/SignIn';
import TokenService from './Services/TokenService';
import Home from './Home/Home'
import CreateGames from './CreateGames/CreateGames';
import Context from './Context/Context'
import GamesApiService from './Services/GamesApiService';
import GamesListItem from './GamesListItem/GamesListItem';
import CommentsService from './CommentsBoard/CommentsService';
import styles from './App.module.css'
import Footer from './Footer/Footer'


export default class App extends React.Component {
  static contextType = Context

  state = {
    games: [],
    filteredGames: [],

    myGames: [],
    filteredMyGames: [],

    comments: [],
    userCoords: {
        lat: null,
        lng: null
    },

    searchString: '',

    openNav: false,

    user_id: null
  }

  componentDidMount(){
    if (TokenService.hasAuthToken()){
      // GET USER-COORDS
      this.getUserCoords();

      // GET ALL GAMES
      GamesApiService.getAllGames()
        .then(res => {
            // FILTER MY-GAMES USING USER-ID FROM RES 
            let games = res.games
            let myGames = games.filter((game)=> game.created_by === res.user_id)

                // GET ALL COMMENTS
                CommentsService.getComments()
                .then(comments => {

                  // SET STATE
                  this.setState({
                    games,
                    myGames,
                    filteredGames: games,
                    filteredMyGames: myGames,
                    comments,
                    user_id: res.user_id
                  })
                })
        })
    }
  }

  onOpenNav = () => {
    this.setState({openNav: !this.state.openNav})
  }

  onSearchGames = (e) => {
    const searchString = e.target.value;

    const gamesCopy = [...this.state.games]
    const myGamesCopy = [...this.state.myGames]

    this.setState({
      filteredGames: gamesCopy.filter(game => game.game_name.toLowerCase().includes(searchString.toLowerCase())), 
      filteredMyGames: myGamesCopy.filter(game => game.game_name.toLowerCase().includes(searchString.toLowerCase())),
      searchString
    });
  }

  addComment = (comment) => {
    const commentsCopy = [...this.state.comments]
    commentsCopy.push(comment)
    this.setState({comments: commentsCopy})
  }

  updateGames = (games) => {
    this.setState({filteredGames: games, games})
  }

  updateUserCoords = (userCoords) => {
    this.setState({userCoords})
  }

  updateMyGames = (myGames) => {
    this.setState({filteredMyGames: myGames, myGames})
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

  setPath = (path) => {
    this.setState({path})
  }
  
  signout = () => {
    TokenService.clearAuthToken()
    this.onOpenNav()
  }

  render(){
    const contextVal = {
      updateGames: this.updateGames,
      updateMyGames: this.updateMyGames,

      games: this.state.games,
      filteredGames: this.state.filteredGames,

      myGames: this.state.myGames,
      filteredMyGames: this.state.filteredMyGames,

      userCoords: this.state.userCoords,
      getUserCoords: this.getUserCoords,
      
      comments: this.state.comments,
      addComment: this.addComment,

      onSearchGames: this.onSearchGames,
      searchString: this.state.searchString,

      openNav: this.state.openNav,
      onOpenNav: this.onOpenNav,

      user_id: this.state.user_id
    }

    let navLinks

    if (!TokenService.hasAuthToken()) {
        navLinks = [
          <Link to="/sign-in" key="1" className={styles["nav-link"]} onClick={this.onOpenNav}>Sign-In</Link>, 
          <Link to="/sign-up" key="2" className={styles["nav-link"]} onClick={this.onOpenNav}>Sign-Up</Link>
        ] 
    } else {
        navLinks = [
          <Link to="/home" key="0" className={styles["nav-link"]} onClick={this.onOpenNav} >Home</Link>, 
          <Link to="/create-games" key="3" className={styles["nav-link"]} onClick={this.onOpenNav}>+ Create</Link>, 
          <Link to="/my-games" key="4" className={styles["nav-link"]} onClick={this.onOpenNav}>My Games</Link>, 
          <Link to="/sign-in" key="5" className={styles["nav-link"]} onClick={this.signout}>Sign-Out</Link> ] 
    }


    return (
      <BrowserRouter>
        <Context.Provider value={contextVal}>
          <main className={styles["App"]}>
            <Navbar loggedIn={TokenService.hasAuthToken()}/>

        {
            this.state.openNav ?
            
            <div className={styles["nav-links-wrapper"]}>
            { navLinks.map(link => {
                return link
            }) }
            </div> :
            null

        }

      
            { TokenService.hasAuthToken() ? <Redirect to='/home'/> : <Redirect to='/landing'/> }
            
            <Route path="/sign-up" exact component={SignUp}/>
            <Route path="/sign-in" exact component={SignIn}/>
            <Route path="/home" exact component={Home}/>
            <Route path="/my-games" exact component={Home}/>
            <Route path="/edit-games/:game_id" exact component={CreateGames}/>
            <Route path="/landing" exact component={Landing}/>
            <Route path="/create-games" exact component={CreateGames}/>
            <Route path="/games/:game_id" exact component={GamesListItem}/>
      
            { !this.state.openNav ? <Footer/> : null  }  
          </main>
        </Context.Provider>
      </BrowserRouter>
    );

  }

}

