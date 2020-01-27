import config from '../config'
import TokenService from '../Services/TokenService'

const PlayersApiService = {
    getPlayers(){
        return fetch(`${config.API_ENDPOINT}/players`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
                )
    },

    getPlayer(playerId){
        return fetch(`${config.API_ENDPOINT}/players/${playerId}`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
                )
    },

    postPlayer(playerObj){
        return fetch(`${config.API_ENDPOINT}/players`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
            // players Obj
            }),
          })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },

    putPlayer(playerId, playerObj){
        return fetch(`${config.API_ENDPOINT}/players/${playerId}`, {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                // player-OBJECT
            }),
          })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },

    deletePlayer(playerId){
        return fetch(`${config.API_ENDPOINT}/players/${playerId}`, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`
            },
          })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    }


}

export default PlayersApiService
