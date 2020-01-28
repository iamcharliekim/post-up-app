import React from 'react';
import './SignIn.css'
import TokenService from '../Services/TokenService'
import AuthApiService from '../Services/AuthApiService';


export default class SignIn extends React.Component {
    state = {
        username: '',
        password: '',
        error: null
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        const {username, password} = e.target
        const user = {user_name: username.value, password: password.value }
        
        AuthApiService.loginUser(user)
            .then(res => {
                if (!res.ok){
                    throw new Error('Something went wrong!')
                }
                return res.json()
            })
            .then(res => {

                TokenService.saveAuthToken(res.authToken)
                this.props.history.push('/home')
                
            })
            .catch(res => {
                this.setState({error: res.error})
            })
    }

    userNameHandler = (e) => {
        this.setState({username: e.target.value})
    }

    passwordHandler = (e) => {
        this.setState({password: e.target.value})
    }
    


    render() {

        return (
            <React.Fragment>

                <h1>{this.state.error? this.state.error : null}</h1> 

                <form onSubmit={this.onSubmitHandler}>
                    <fieldset>
                        <legend>Sign-In</legend>

                        <label htmlFor="username">
                            Username: 
                            <input type="text" id="username" onChange={this.userNameHandler} value={this.state.username}/>
                        </label> 

                        <label htmlFor="password">
                            Password:
                            <input type="password" id="password" onChange={this.passwordHandler} value={this.state.password}/>
                        </label> 

                        <div className="btns-div">
                            <button className="sign-in-btn">Sign In</button>
                        </div>
                    </fieldset>
                </form>
            </React.Fragment>
        );
    }
}
