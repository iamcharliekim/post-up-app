import React from 'react';
import './Comment.css'
import moment from 'moment'

export default class Comment extends React.Component {
    state = {
        comment: this.props.userComment
    }    

    render() {
        let postedDate = moment(this.state.comment.date_created, "YYYY-MM-DDTHH:mm:ss.SSSSZ", true).local()

        return (
                <div className="user-comment">
                    <div className="user-comment-row-1">
                        <h4 className="user-name">{this.state.comment.user_name}</h4>
                        <span className="user-commented-time">
                                { postedDate.fromNow()}
                        </span>
                    </div>
                    <span className="comment-text">{this.state.comment.comment}</span>
                </div>                        
        );
    }
}

