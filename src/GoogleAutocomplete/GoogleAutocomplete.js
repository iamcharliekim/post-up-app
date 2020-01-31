import React from 'react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import styles from './GoogleAutocomplete.module.css'

export default function GoogleAutocomplete(props) {
    const [address, setAddress] = React.useState('')

    const handleSelect = async value => {
        const results = await geocodeByAddress(value)
        const latLng = await getLatLng(results[0])

        let zipCode;

        results[0].address_components.forEach((comp)=> {
            if (comp.types.includes('postal_code')){
                zipCode = comp.long_name

                setAddress(value)
                props.onSetAddress(value, zipCode, latLng)
            } else {
                const apiKey = 'AIzaSyDOvfuKaaRuYocVQWNl9ICi3wadIephDyc'
                let apiCall = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng.lat},${latLng.lng}&key=${apiKey}`              
                
                fetch(apiCall).then(res => {
                    if(res.status ===200){
                        return res.json()
                    } else {
                        throw new Error(res.statusText)
                    }
                })
                .then(res => {
                    res.results.forEach(result => {
                        result.address_components.forEach(comp => {
                            if (comp.types.includes('postal_code')){
                                zipCode = comp.long_name
                                setAddress(value)
                                props.onSetAddress(value, zipCode, latLng)
                            }
                        })
                    })
                })
            }
        })
    }


    return (

        <div className={styles["places-autocomplete"]}>
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
                >
                    
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                       <div className={styles["places-search-wrapper"]}>
                           <input {...getInputProps({ placeholder: "Search for a court"})}
                                type="text" 
                                className={styles["places-search-input"]}
                                />

                                <div className={styles["places-suggestions-wrapper"]}>
                                    {loading ? <div>...loading</div> : null}

                                    { 

                                    suggestions.map((suggestion)=> {
                                        const style ={
                                            backgroundColor: suggestion.active ? 'lightgray' : 'white'
                                        }
                                        
                                        return (
                                            <div className={styles["suggestions-div"]} {...getSuggestionItemProps(suggestion, {style})}>
                                                {suggestion.description}
                                            </div>
                                        );
                                    })

                                    }
                                </div>
                       </div>
                    )}
            </PlacesAutocomplete>
        </div>
    );
}

