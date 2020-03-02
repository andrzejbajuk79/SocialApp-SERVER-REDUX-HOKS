import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {getPosts} from '../../actions/Post.actions';
import {Link} from 'react-router-dom';
import Spinner from '../../common/images/Spinner';
import PropTypes from 'prop-types';

// racfp
class Post extends Component {
 componentDidMount() {
  this.props.getPosts();
 }
 render() {
  return <div></div>;
 }
}

Post.propTypes = {
 getPosts: PropTypes.func.isRequired, //ptfr
 post: PropTypes.object.isRequired, //ptor
};
const mapStateToProps = state => ({
 post: postMessage.post,
});
export default connect(mapStateToProps, {getPosts})(Post);
