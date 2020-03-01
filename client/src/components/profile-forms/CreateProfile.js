import React, {useState, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProfile} from '../../actions/Profile.actions';
//racfp
const CreateProfile = ({createProfile, history}) => {
 const [formData, setFormData] = useState({
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  githubusername: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: '',
 });
 const [displaySocialInputs, toggleSocialInputs] = useState(false);
 const {
  company,
  website,
  location,
  status,
  skills,
  githubusername,
  bio,
  twitter,
  facebook,
  linkedin,
  youtube,
  instagram,
 } = formData;
 const onSubmit = e => {
  e.preventDefault();
  console.log(formData);

  createProfile(formData, history);
 };
 const onChange = e =>
  setFormData({...formData, [e.target.name]: e.target.value});
 return (
  <Fragment>
   <h1 className='large text-primary'>Create Your Profile</h1>
   <p className='lead'>
    <i className='fas fa-user'></i> Let's get some information to make your
    profile stand out
   </p>
   <small>* = required field</small>
   <form className='form' onSubmit={e => onSubmit(e)}>
    <div className='form-group'>
     <select value={status} onChange={e => onChange(e)} name='status'>
      <option value='0'>* Select Professional Status</option>
      <option value='Developer'>Developer</option>
      <option value='Junior Developer'>Junior Developer</option>
      <option value='Senior Developer'>Senior Developer</option>
      <option value='Manager'>Manager</option>
      <option value='Student or Learning'>Student or Learning</option>
      <option value='Instructor'>Instructor or Teacher</option>
      <option value='Intern'>Intern</option>
      <option value='Other'>Other</option>
     </select>
     <small className='form-text'>
      Give us an idea of where you are at in your career
     </small>
    </div>
    <div className='form-group'>
     <input
      type='text'
      placeholder='Company'
      value={company}
      onChange={e => onChange(e)}
      name='company'
     />
     <small className='form-text'>
      Could be your own company or one you work for
     </small>
    </div>
    <div className='form-group'>
     <input
      type='text'
      placeholder='Website'
      value={website}
      onChange={e => onChange(e)}
      name='website'
     />
     <small className='form-text'>Could be your own or a company website</small>
    </div>
    <div className='form-group'>
     <input
      type='text'
      placeholder='Location'
      value={location}
      onChange={e => onChange(e)}
      name='location'
     />
     <small className='form-text'>
      City & state suggested (eg. Boston, MA)
     </small>
    </div>
    <div className='form-group'>
     <input
      type='text'
      placeholder='* Skills'
      value={skills}
      onChange={e => onChange(e)}
      name='skills'
     />
     <small className='form-text'>
      Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
     </small>
    </div>
    <div className='form-group'>
     <input
      type='text'
      placeholder='Github Username'
      value={githubusername}
      onChange={e => onChange(e)}
      name='githubusername'
     />
     <small className='form-text'>
      If you want your latest repos and a Github link, include your username
     </small>
    </div>
    <div className='form-group'>
     <textarea
      placeholder='A short bio of yourself'
      value={bio}
      onChange={e => onChange(e)}
      name='bio'
     ></textarea>
     <small className='form-text'>Tell us a little about yourself</small>
    </div>

    <div className='my-2'>
     <button
      onClick={() => toggleSocialInputs(!displaySocialInputs)}
      type='button'
      className='btn btn-light'
     >
      Add Social Network Links
     </button>
     <span>Optional</span>
    </div>
    {displaySocialInputs && (
     <Fragment>
      <div className='form-group social-input'>
       <i className='fab fa-twitter fa-2x'></i>
       <input
        type='text'
        placeholder='Twitter URL'
        value={twitter}
        onChange={e => onChange(e)}
        name='twitter'
       />
      </div>

      <div className='form-group social-input'>
       <i className='fab fa-facebook fa-2x'></i>
       <input
        type='text'
        placeholder='Facebook URL'
        value={facebook}
        onChange={e => onChange(e)}
        name='facebook'
       />
      </div>

      <div className='form-group social-input'>
       <i className='fab fa-youtube fa-2x'></i>
       <input
        type='text'
        placeholder='YouTube URL'
        value={youtube}
        onChange={e => onChange(e)}
        name='youtube'
       />
      </div>

      <div className='form-group social-input'>
       <i className='fab fa-linkedin fa-2x'></i>
       <input
        type='text'
        placeholder='Linkedin URL'
        value={linkedin}
        onChange={e => onChange(e)}
        name='linkedin'
       />
      </div>

      <div className='form-group social-input'>
       <i className='fab fa-instagram fa-2x'></i>
       <input
        type='text'
        placeholder='Instagram URL'
        value={instagram}
        onChange={e => onChange(e)}
        name='instagram'
       />
      </div>
     </Fragment>
    )}
    <button type='submit' className='btn btn-primary my-1'>
     Submit{' '}
    </button>

    <Link className='btn btn-light my-1' href='dashboard.html'>
     Go Back
    </Link>
   </form>
  </Fragment>
 );
};

CreateProfile.propTypes = {
 profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
 profile: state.profile,
});

export default connect(mapStateToProps, {createProfile})(
 withRouter(CreateProfile)
);
