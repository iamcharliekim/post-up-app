import React from 'react';
import styles from './Landing.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser, faBasketballBall, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import SignUp from '../SignUp/SignUp'
import Context from '../Context/Context'


export default class Landing extends React.Component {
    static contextType = Context

    render() {
        
        return (
            <React.Fragment>
                
                {
                
                !this.context.openNav ?

                <main role="main" className={styles["landing-wrapper"]}>
                    <section className={styles["section-1"]}>

                        <div className={styles["section-1-hero-div"]}>
                           <div className={styles["section-1-hero-text"]}>
                               <h1>WHO'S GOT NEXT?</h1>
                               <span>The Post-Up App makes it easier than ever to find and run pickup basketball games in your area</span>

                               <button>SIGN-UP NOW</button>
                            </div>
                        </div>
                    </section>

                    <section className={styles["section-2"]}>     
                            <div className={styles["section-2-card"]}>
                                <div className={styles["players-icon"]}>
                                    <FontAwesomeIcon icon={faUser} className={styles["icon"]}/>
                                </div>
                                <div className={styles["card-text-wrapper"]}>
                                    <p className={styles["card-text-main"]}>
                                        Find Players 
                                    </p>
                                </div>
                                <p className={styles["card-text-sub"]}>
                                    Search for players nearby and invite them to games
                                </p>
                            </div>
                            
                            <div className={styles["section-2-card"]}>
                                <div className={styles["players-icon"]}>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className={styles["ball-icon"]}/>
                                    <FontAwesomeIcon icon={faBasketballBall} className={styles["ball-pin"]}/>

                                </div>
                                <div className={styles["card-text-wrapper"]}>

                                    <p className={styles["card-text-main"]}>
                                        Find Games 
                                    </p>
                                </div>
                                <p className={styles["card-text-sub"]}>
                                    Post-Up will automatically search for games near your location 
                                </p>

                            </div>      

                            <div className={styles["section-2-card"]}>

                                <div className={styles["players-icon"]}>
                                    <FontAwesomeIcon icon={faBasketballBall} className={styles["ball-icon"]}/>
                                </div>

                                <div className={styles["card-text-wrapper"]}>
                                    <p className={styles["card-text-main"]}>
                                        Create Games 
                                    </p>
                                </div>
                                <p className={styles["card-text-sub"]}>
                                    Create your own games and invite other players in your area 
                                </p>
                            </div>
                    
                        
                    </section>

                    <section className={styles["section-3"]}>
                        <div className={styles["section-3-div-wrapper"]}>
                            <h1>TAKE A PEEK</h1>

                        <div className={styles["carousel-wrapper"]}>
                            <Carousel
                                showArrows={true}
                                showStatus={false}
                                showIndicators={false}
                                showThumbs={false}
                                infiniteLoop={true}
                                autoPlay={true}
                                transitionTime={500}
                                width='300px'
                                dynamicHeight={true}
                            > 
                                <div className={styles["home-games-wrapper"]}>
                                    <img src={require('../../src/findgames.png')} className={styles["home-screenshot"]} alt="findgames"/>
                                </div>   
                    

                                <div className={styles["home-games-wrapper"]}>
                                    <img src={require('../../src/creategames.png')} className={styles["home-screenshot"]} alt="creategames"/>
                                </div>   
                    

                                <div className={styles["home-games-wrapper"]}>
                                    <img src={require('../../src/getdetails.png')} className={styles["home-screenshot"]} alt="getdetails"/>
                                </div>   

                                <div className={styles["home-games-wrapper"]}>
                                    <img src={require('../../src/talktrash.png')} className={styles["create-screenshot"]} alt="talktrash"/>
                                </div>
                                </Carousel>                       
                            </div>

                            <div className={styles["screens-wrapper"]}>
                                    <div className={styles["home-games-wrapper"]}>
                                        <img src={require('../../src/findgames.png')} className={styles["home-screenshot"]} alt="findgames"/>
                                    </div>   
                        

                                    <div className={styles["home-games-wrapper"]}>
                                        <img src={require('../../src/creategames.png')} className={styles["home-screenshot"]} alt="creategames"/>
                                    </div>   


                                    <div className={styles["home-games-wrapper"]}>
                                        <img src={require('../../src/getdetails.png')} className={styles["home-screenshot"]} alt="getdetails"/>
                                    </div>   
                            </div>

                        </div>
                    </section>

                   <section className={styles["section-4"]}>
                    <h1>SIGN-UP TODAY</h1>

                    <SignUp/>

                   </section>
                    
                </main>

                : null
                
                }
            </React.Fragment>
        );
    }
}




// <div className={styles["create-games-wrapper"]}>
// <div className={styles["screen-label"]}>
//         <h1>
//             TALK TRASH
//         </h1>                                    
        
//         <span className={styles["card-text-sub"]}>
//             Work out any details not mentioned in the listing by using the comment board on each game.  Feel free to even talk a little trash :)
//         </span>
//     </div>
//     <img src={require('../../src/COMMENTBOARD-SCREEN.png')} className={styles["screenshot"]}/>
    
// </div>           