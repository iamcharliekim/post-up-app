import config from '../config'
import TokenService from '../Services/TokenService'


const CommentsService = {
    getComments(){
        return fetch(`${config.API_ENDPOINT}/games/comments`, {
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

    postComment(comment){
      return fetch(`${config.API_ENDPOINT}/games/comments`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'Authorization': `bearer ${TokenService.getAuthToken()}`
          },
          body: JSON.stringify(comment),
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    },

    putComment(comment, game_id){
      return fetch(`${config.API_ENDPOINT}/games/comments`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'Authorization': `bearer ${TokenService.getAuthToken()}`
          },
          body: JSON.stringify(comment),
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    },

    deleteComment(comment_id){
      return fetch(`${config.API_ENDPOINT}/games/comments/${comment_id}`, {
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


}

export default CommentsService