import React, { useState} from 'react';
import './GoogleMapsComponent.css'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

function Map(props){
    const [selectedGame, setSelectedGame ] = useState(null);

    return (
        <GoogleMap defaultZoom={8} defaultCenter={{ lat: +props.lat, lng: +props.lng}}>
            {props.gamesList.map((game) => {
                return <Marker 
                            key={game.id}
                            position={{lat: +game.game_lat, lng: +game.game_lng}}
                            onClick={()=> setSelectedGame(game)}
                            />
            })}

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