import React, { useState, useContext} from 'react';
import './GoogleMapsComponent.css'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import Context from '../Context/Context';

function Map(props){
    const [selectedGame, setSelectedGame ] = useState(null);
    const userContext = useContext(Context)

    console.log(props)

    let center;

    if (!props.gamesList[0].game_lat){
        center = { lat: userContext.userCoords.lat, lng: userContext.userCoords.lng }
    } else {
        center = { lat: +props.gamesList[0].game_lat, lng: +props.gamesList[0].game_lng}
    }

    return (
        <GoogleMap zoom={props.zoom} center={center}>

            {
            
                props.gamesList.map((game) => {
                    return <Marker 
                                key={game.id}
                                position={{lat: +game.game_lat, lng: +game.game_lng}}
                                onClick={()=> setSelectedGame(game)}
                                />
                })
            
            }

            {selectedGame && (
                <InfoWindow position={{lat: +selectedGame.game_lat, lng: +selectedGame.game_lng}} onCloseClick={()=> setSelectedGame(null)}>
                    <div> <h2>Put something useful here</h2> </div>
                </InfoWindow>
            )}
        </GoogleMap>
    )
}

const GoogleMapsComponent = withGoogleMap((Map));

export default GoogleMapsComponent