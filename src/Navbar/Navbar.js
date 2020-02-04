import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom'
import TokenService from '../Services/TokenService';
import { withRouter } from 'react-router-dom'
import Context from '../Context/Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBasketballBall } from '@fortawesome/free-solid-svg-icons'

class Navbar extends React.Component {
    static contextType = Context

    onSignOut = (e) => {
        TokenService.clearAuthToken()
    }

    render() {
        // let navLinks

        // if (!TokenService.hasAuthToken()) {
        //     navLinks = [<Link to="/sign-in" key="1">Sign-In</Link>, <Link to="/sign-up" key="2">Sign-Up</Link>] 
        // } else {
        //     navLinks = [<Link to="/home" key="0">Home</Link>, <Link to="/create-games" key="3">+ Create</Link>, <Link to="/my-games" key="4">My Games</Link>, <Link to="/sign-in" key="5" onClick={this.onSignOut}>Sign-Out</Link> ] 
        // }

        return (
                <nav className={styles["navbar"]}>
                    <div className={styles["inner-nav"]}>
                        <Link to="/landing" className={styles["logo"]}>
                        <FontAwesomeIcon icon={faBasketballBall} className={styles["icon"]}/>

                            <h1>Post-Up</h1>
                        </Link>

                      

                    <div className={styles["hamburger"]} onClick={this.context.onOpenNav}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>


                    </div>
                </nav>
        );
    }
}

export default withRouter(Navbar)