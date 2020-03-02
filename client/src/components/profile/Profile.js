import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../common/images/Spinner';

import {getProfileById} from '../../actions/Profile.actions';
import {Link} from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';

class Profile extends Component {
 componentDidMount() {
  console.log(this.props.match.params.id);

  this.props.getProfileById(this.props.match.params.id);
 }

 componentWillReceiveProps(nextProps) {
  if (nextProps.profile.profile === null && this.props.profile.loading) {
   this.props.history.push('/not-found');
  }
 }
 render() {
  const {profile, loading} = this.props.profile;
  let profileContent;

  if (profile === null || loading) {
   profileContent = <Spinner />;
  } else {
   profileContent = (
    <Fragment>
     <ProfileHeader profile={profile} />
     <ProfileAbout profile={profile} />
     <ProfileCreds
      education={profile.education}
      experience={profile.experience}
     />
     {profile.githubusername ? (
      <ProfileGithub username={profile.githubusername} />
     ) : null}
     <Link to='/profiles' className='btn btn-light mb-3 float-left'>
      Back To Profiles
     </Link>
    </Fragment>
   );
  }
  return <Fragment>{profileContent}</Fragment>;
 }
}
Profile.propTypes = {
 getProfileById: PropTypes.func.isRequired,
 profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
 profile: state.profile,
});

export default connect(mapStateToProps, {getProfileById})(Profile);
