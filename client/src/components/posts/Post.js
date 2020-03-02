import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {getPosts} from '../../actions/Post.actions';
import {Link} from 'react-router-dom';
import Spinner from '../../common/images/Spinner';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import PostFeed from './PostFeed';

// racfp
class Post extends Component {
 componentDidMount() {
  this.props.getPosts();
 }
 render() {
  const {posts, loading} = this.props.post;
  let postContent;

  if (posts === null || loading) {
   postContent = <Spinner />;
  } else {
   postContent = <PostFeed posts={posts} />;
  }

  return (
   <div className='feed'>
    <div className='container'>
     <div className='row'>
      <div className='col-md-12'>
       <PostForm />
       {postContent}
      </div>
     </div>
    </div>
   </div>
  );
 }
}

Post.propTypes = {
 getPosts: PropTypes.func.isRequired, //ptfr
 post: PropTypes.object.isRequired, //ptor
};
const mapStateToProps = state => ({
 post: state.post,
});
export default connect(mapStateToProps, {getPosts})(Post);
