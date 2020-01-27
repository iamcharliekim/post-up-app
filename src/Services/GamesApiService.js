import TokenService from '../Services/TokenService'
import config from '../config'

const GamesApiService = {

    // POST_UP_GAMES METHODS
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

    getGameById(game_id){
        return fetch(`${config.API_ENDPOINT}/games/${game_id}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
                )
    },

    postGame(game){
      return fetch(`${config.API_ENDPOINT}/games`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'Authorization': `bearer ${TokenService.getAuthToken()}`
          },
          body: JSON.stringify(game),
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    },

    deleteGame(game_id){
      return fetch(`${config.API_ENDPOINT}/games/${game_id}`, {
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

    // POST_UP_GAMES_ATTENDANCE METHODS
    getAttendanceCount(game_id){
        return fetch(`${config.API_ENDPOINT}/games/attendance/rsvp/${game_id}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
                )
    },

    getGameAttendance(game_id){
        return fetch(`${config.API_ENDPOINT}/games/attendance/${game_id}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
                )
    },

    postGameAttendance(game_id){
      return fetch(`${config.API_ENDPOINT}/games/attendance`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': `bearer ${TokenService.getAuthToken()}`
        },
        body:JSON.stringify(game_id)
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json() 
        )
    },

    deleteGameAttendance(game_id){
      return fetch(`${config.API_ENDPOINT}/games/attendance/${game_id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'Authorization': `bearer ${TokenService.getAuthToken()}`
        }      
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
}

export default GamesApiService