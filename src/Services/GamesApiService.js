import TokenService from '../Services/TokenService'
import config from '../config'

const GamesApiService = {
    getAllGames(){
        return fetch(`${config.API_ENDPOINT}/games`, {
          method: 'GET',
          headers: {}
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
                )
    },

    getGamesByUserId(){  
      return fetch(`${config.API_ENDPOINT}/games/mygames`, {
        method: 'GET',
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
    },

    getGameById(gameId){
        return fetch(`${config.API_ENDPOINT}/games/${gameId}`, {
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

    postGame(gameObj){
        return fetch(`${config.API_ENDPOINT}/games`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(gameObj),
          })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },

    putGame(gameId, gameObj){
        return fetch(`${config.API_ENDPOINT}/games/${gameId}`, {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                // GAME-OBJECT
            }),
          })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },

    deleteGame(gameId){
        return fetch(`${config.API_ENDPOINT}/games/${gameId}`, {
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
    },

    postIncrementGameAttendance(gameId){
      return fetch(`${config.API_ENDPOINT}/games/attendance`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': `bearer ${TokenService.getAuthToken()}`
        },
        body:JSON.stringify(gameId)
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json() 
        )
    }


}

export default GamesApiService