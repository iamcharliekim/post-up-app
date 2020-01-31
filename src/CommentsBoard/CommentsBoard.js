import React from 'react';
import './CommentsBoard.css'
import CommentsService from './CommentsService';
import Comment from '../Comment/Comment';
import Context from '../Context/Context'
import moment from 'moment'


export default class CommentsBoard extends React.Component {
    static contextType = Context
    
    state = {
        game_id: this.props.game_id,
        comment: '',
        comments: []
    }

    componentDidMount(){
        // FILTER COMMENTS BY game_id
        let gameComments = this.context.comments.filter((comment)=> comment.game_id === this.state.game_id)
        this.setState({comments: gameComments})
    }

    commentHandler = (e) => {
        this.setState({comment: e.target.value})
    }

    onSubmitComment = (e) => {
        e.preventDefault()

        let commentObj = {
            user_name: '',
            comment: this.state.comment,
            game_id: this.props.game_id,
            date_created: (moment(moment.now()).format())
        }

        //POST-request comment 
        CommentsService.postComment(commentObj, this.props.game_id)
            .then(comment => {
                this.context.addComment(comment)

                let commentsCopy = [...this.state.comments]
                commentsCopy.push(comment)
                this.setState({comments: commentsCopy})
            })
    }

    render() {
        return (
                <div className="comments">
                    <h2>{this.state.comments.length} Comments</h2>
                    <div className="user-comments-wrapper">
                        <textarea 
                            className="comment-text-area" 
                            onChange={this.commentHandler}
                            value={this.state.comment}
                            />
                        <div className="comments-btn-wrapper">
                            <button className="submit-comment-btn" onClick={this.onSubmitComment}>Submit</button>
                        </div>
                    </div>

                    <div className="user-comments">
                        {  this.state.comments ? this.state.comments.map((comment, i) => <Comment key={i} userComment={comment}/>) : null }           
                    </div>
                </div>
        );
    }
}

