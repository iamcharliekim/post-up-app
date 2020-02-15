import React from 'react';
import styles from './Comment.module.css';

export default class Comment extends React.Component {
  state = {
    comment: this.props.userComment
  };

  render() {
    return (
      <div className={styles['user-comment']}>
        <div className={styles['user-comment-row-1']}>
          <h4 className={styles['user-name']}>{this.state.comment.user_name}</h4>
        </div>
        <span className={styles['comment-text']}>{this.state.comment.comment}</span>
      </div>
    );
  }
}
