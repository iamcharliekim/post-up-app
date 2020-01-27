import React from 'react';
import './SignUp.css'
import AuthApiService from '../../src/Services/AuthApiService';


export default class SignUp extends React.Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        user_name: '',
        password: '',
    }

    firstNameHandler = (e) => {
        this.setState({first_name: e.target.value})
        console.log(this.state)
    }

    lastNameHandler = (e) => {
        this.setState({last_name: e.target.value})
        console.log(this.state)
    }

    emailHandler = (e) => {
        this.setState({email: e.target.value})
        console.log(this.state)
    }

    userNameHandler = (e) => {
        this.setState({user_name: e.target.value})
        console.log(this.state)
    }

    passwordHandler = (e) => {
        this.setState({password: e.target.value})
        console.log(this.state)
    }

    onSubmitHandler = (e) => {
        e.preventDefault()

        const newUser = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            user_name: this.state.user_name,
            password: this.state.password
        }

        AuthApiService.postUser(newUser)
            .then((res )=> {

                this.setState({
                    first_name: '',
                    last_name: '',
                    email: '',
                    user_name: '',
                    password: '',
                })

                this.props.history.push('/sign-in')

            })
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.onSubmitHandler}>
                    <fieldset>
                        <legend>Sign-Up</legend>

                        <label htmlFor="firstname">
                            First Name: 
                            <input type="text" id="firstname" onInput={this.firstNameHandler}/>
                        </label> 

                        <label htmlFor="lastname">
                            Last Name: 
                            <input type="text" id="lastname" onInput={this.lastNameHandler}/>
                        </label> 

                        <label htmlFor="email">
                            Email: 
                            <input type="email" id="email" onInput={this.emailHandler}/>
                        </label> 

                        <label htmlFor="username">
                            Username: 
                            <input type="text" id="username" onInput={this.userNameHandler}/>
                        </label> 

                        <label htmlFor="password">
                            Password:
                            <input type="password" id="password" onInput={this.passwordHandler}/>
                        </label> 

                        <div className="btns-div">
                            <button className="sign-up-btn">Sign Up</button>
                        </div>
                    </fieldset>
                </form>            
                </React.Fragment>
        );
    }
}
