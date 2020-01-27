import React from 'react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import './GoogleAutocomplete.css'

export default function GoogleAutocomplete(props) {
    const [address, setAddress] = React.useState('')

    const handleSelect = async value => {
        const results = await geocodeByAddress(value)
        const latLng = await getLatLng(results[0])

        let zipCode;

        results[0].address_components.forEach((comp)=> {
            if (comp.types.includes('postal_code')){
                zipCode = comp.long_name
            }
        })

        setAddress(value)
        props.onSetAddress(value, zipCode, latLng)
    }


    return (

        <div className="places-autocomplete">
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
                >
                    
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                       <div className="places-search-wrapper">
                           <input {...getInputProps({ placeholder: "Search for a court"})}
                                type="text" 
                                className="places-search-input"
                                />

                                <div className="places-suggestions-wrapper">
                                    {loading ? <div>...loading</div> : null}

                                    { 

                                    suggestions.map((suggestion)=> {
                                        const style ={
                                            backgroundColor: suggestion.active ? 'lightgray' : 'white'
                                        }
                                        
                                        return (
                                            <div className="suggestions-div" {...getSuggestionItemProps(suggestion, {style})}>
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

