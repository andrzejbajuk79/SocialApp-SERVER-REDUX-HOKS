import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile, deleteAccount} from '../../actions/Profile.actions';
import Spinner from '../../common/images/Spinner';
import {Link} from 'react-router-dom';
import {DashboardActions} from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
 deleteAccount,
 getCurrentProfile, //
 auth: {user},
 profile: {profile, loading},
}) => {
 useEffect(() => {
  getCurrentProfile();
 }, [getCurrentProfile]);

 const onDeleteClick = () => e => {
  deleteAccount();
 };
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
     <Experience experience={profile.experience} />
     <Education education={profile.education} />
     <div className='my-2'>
      <button onClick={onDeleteClick()} className='btn btn-danger'>
       <i className='fas fa-user-minus'></i>
       Delete My Account
      </button>
     </div>
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
 deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
 profile: state.profile,
 auth: state.auth,
});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(
 Dashboard
);
