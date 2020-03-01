import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/Profile.actions';
import Spinner from '../../common/images/Spinner';
import {Link} from 'react-router-dom';
import {DashboardActions} from './DashboardActions';
const Dashboard = ({
 getCurrentProfile, //
 auth: {user},
 profile: {profile, loading},
}) => {
 useEffect(() => {
  getCurrentProfile();
 }, []);
 return loading && profile === null ? (
  <Spinner /> //
 ) : (
  <Fragment>
   <h1 className='large text-primary'>Dashboard</h1>
   <p className='lead'>
    <i className='fas fa-user'></i> Welcome {user && user.name}
   </p>
   {profile !== null ? ( //
    <Fragment>
     <DashboardActions />
    </Fragment>
   ) : (
    <Fragment>
     <p>You dont have a profile setup yet, please add some info</p>
     <Link to='/create-profile' className='btn btn-primary my-1'>
      Create Profile
     </Link>
    </Fragment>
   )}
  </Fragment>
 );
};

Dashboard.propTypes = {
 getCurrentProfile: PropTypes.func.isRequired, //ptfr
 auth: PropTypes.object.isRequired, //ptor
 profile: PropTypes.object.isRequired, //ptor
};

const mapStateToProps = state => ({
 profile: state.profile,
 auth: state.auth,
});

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);
