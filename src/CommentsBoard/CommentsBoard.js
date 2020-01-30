import React from 'react';
import './CommentsBoard.css'
import CommentsService from '../Services/CommentsService';

export default class CommentsBoard extends React.Component {
    state = {
        comment: '',

    }

    componentDidMount(){
        console.log(this.props)
    }

    onSubmitComment = (e) => {
        e.preventDefault()

        //POST-request comment 
        CommentsService.postComment(this.state.comment, this.props.game_id)
            .then(res => {
                console.log('postComment() response:', res)
            })
        
    }


    render() {

        return (
                <div className="comments">
                    <h2>239 Comments</h2>
                    <div className="user-comments-wrapper">
                        <textarea 
                            className="comment-text-area" 
                            onChange={this.onSubmitComment}
                            />
                        <div className="comments-btn-wrapper">
                            <button className="submit-comment-btn">Submit</button>
                        </div>
                    </div>

                    <div className="user-comments">
                        <div className="user-comment">
                            <div className="user-comment-row-1">
                                <h4 className="user-name">newlybewly</h4>
                                <span className="user-commented-time">
                                    2 hours ago
                                </span>
                            </div>
                            <span className="comment-text">Is everyone gonna be there?</span>
                        </div>                        
                        
                        <div className="user-comment">
                            <div className="user-comment-row-1">
                                <h4 className="user-name">iamcharliekim</h4>
                                <span className="user-commented-time">
                                    5 hours ago
                                </span>
                            </div>
                            <span className="comment-text">Can't wait!</span>
                        </div>       

                        <div className="user-comment">
                            <div className="user-comment-row-1">
                                <h4 className="user-name">jun923</h4>
                                <span className="user-commented-time">2 days ago</span>
                            </div>
                            <span className="comment-text">ima smoke alll yall!!! </span>
                        </div>                        
                        
                        <div className="user-comment">
                            <div className="user-comment-row-1">
                                <h4 className="user-name">cwkim3</h4>
                                <span className="user-commented-time">
                                    1 week ago
                                </span>
                            </div>
                            <span className="comment-text">8==========D ~~~~~</span>
                        </div>                        
                        
      
                    </div>

                </div>
        );
    }
}

