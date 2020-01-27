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



export default class App extends React.Component {
  state = {
    
  }

   componentDidMount(){
     console.log('TEST')
   }


  render(){
    console.log('testing')
    return (
      <BrowserRouter>
      <main className='App'>
        <Navbar loggedIn={TokenService.hasAuthToken()}/>
  
        { TokenService.hasAuthToken() ? <Redirect to='/home'/> : <Redirect to='/sign-in'/> }
        
  
  
        <Route path="/sign-up" exact component={SignUp}/>
        <Route path="/sign-in" exact component={SignIn}/>
        <Route path="/home" exact component={Home}/>
        <Route path="/my-games" exact component={Home}/>
        <Route path="/landing" exact component={Landing}/>
        <Route path="/create-games" exact component={CreateGames}/>
  
  
        {/* <Footer/> */}
      </main>
      </BrowserRouter>
    );

  }

}

