import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {addLike, removeLike, deletePost} from '../../actions/Post.actions';
import Moment from 'react-moment';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import Spinner from '../../common/images/Spinner';
import PropTypes from 'prop-types';

class PostItem extends Component {
 onDeleteClick = id => () => {
  this.props.deletePost(id);
 };

 onLikeClick = id => () => {
  console.log(id);

  this.props.addLike(id);
 };

 onUnlikeClick = id => () => {
  this.props.removeLike(id);
 };

 findUserLike = likes => () => {
  const {auth} = this.props;
 };
 render() {
  const {
   post: {_id, text, name, user, likes, comments, date},
   auth,
  } = this.props;
  return (
   <div className='post bg-white p-1 my-1'>
    <div>
     <a href='profile.html'>
      <img
       className='round-img'
       src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
       alt=''
      />
      <h4>John Doe</h4>
     </a>
    </div>
    <div>
     <p className='my-1'>{text}</p>
     <p className='post-date'>
      Posted on
      <Moment format='YYY/MM/DD'>{date}</Moment>
     </p>
     <button
      onClick={this.onLikeClick(_id)}
      type='button'
      className='btn btn-light'
     >
      <i className='fas fa-thumbs-up'></i>{' '}
      {likes.length > 0 && <span>{likes.length}</span>}
     </button>
     {/* <button
      onClick={this.onLikeClick(_id)}
      type='button'
      className='btn btn-light mr-1'
     >
      <i
       className={classnames('fas fa-thumbs-up', {
        'text-info': this.findUserLike(likes),
       })}
      />
      <span className='badge badge-light'>{likes.length}</span>
     </button> */}

     <button
      onClick={this.onLikeClick(_id)}
      type='button'
      className='btn btn-light'
     >
      <i className='fas fa-thumbs-down'></i>
     </button>
     <Link to={`/post/${_id}`} className='btn btn-primary'>
      Discussion{' '}
      {comments.length > 0 && (
       <span className='comment-count'>{comments.length}</span>
      )}
     </Link>
     {!auth.loading && user === auth.user._id && (
      <button
       onClick={this.onDeleteClick(_id)}
       type='button'
       className='btn btn-danger'
      >
       <i className='fas fa-times'></i>
      </button>
     )}
    </div>
   </div>
  );
 }
}

PostItem.propTypes = {
 deletePost: PropTypes.func.isRequired,
 auth: PropTypes.object.isRequired, //ptor
 post: PropTypes.object.isRequired,
 addLike: PropTypes.func.isRequired,
 removeLike: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
 auth: state.auth,
});
export default connect(mapStateToProps, {addLike, removeLike, deletePost})(
 PostItem
);
