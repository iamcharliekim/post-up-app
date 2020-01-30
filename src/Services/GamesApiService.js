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

    putGame(game_id, game){
      return fetch(`${config.API_ENDPOINT}/games/${game_id}`, {
          method: 'PUT',
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
              : res
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
    
    getUserName(user_id){
        return fetch(`${config.API_ENDPOINT}/user/${user_id}`, {
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

    getCoordinates(parsedGeoCodeAddress, apiKey){
      let googleGetCoorsURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${parsedGeoCodeAddress}&key=${apiKey}`
      return fetch(googleGetCoorsURL).then(res => {
          if(res.status ===200){
              return res.json()
          } else {
              throw new Error(res.statusText)
          }
      })
  }

}



export default GamesApiService