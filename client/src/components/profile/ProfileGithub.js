import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getGithubRepos} from '../../actions/Profile.actions';

class ProfileGithub extends Component {
 constructor(props) {
  super(props);
  this.state = {
   clientId: '26c196bacea7db10cf48',
   clientSecret: '0885cb690e07d2a93a6afb0891fb552fd9f7aa53',
   count: 5,
   sort: 'created: asc',
   repos: [],
  };
 }

 componentDidMount() {
  const {username} = this.props;
  const {count, sort, clientId, clientSecret} = this.state;
  console.log(username);

  this.props.getGithubRepos(username);
  // fetch(
  //  `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
  // )
  //  .then(res => res.json())
  //  .then(data => {
  //   if (this.refs.myRef) {
  //    this.setState({repos: data});
  //   }
  //  })
  //  .catch(err => console.log(err));
 }

 render() {
  const {repos} = this.props;

  const repoItems = repos.map(repo => (
   <div key={repo.id} className='card card-body mb-2'>
    <div className='row'>
     <div className='col-md-6'>
      <h4>
       <Link to={repo.html_url} className='text-info' target='_blank'>
        {repo.name}
       </Link>
      </h4>
      <p>{repo.description}</p>
     </div>
     <div className='col-md-6'>
      <span className='badge badge-info mr-1'>
       Stars: {repo.stargazers_count}
      </span>
      <span className='badge badge-secondary mr-1'>
       Watchers: {repo.watchers_count}
      </span>
      <span className='badge badge-success'>Forks: {repo.forks_count}</span>
     </div>
    </div>
   </div>
  ));
  return (
   <div ref='myRef'>
    <hr />
    <h3 className='mb-4'>Latest Github Repos</h3>
    {repoItems}
   </div>
  );
 }
}

ProfileGithub.propTypes = {
 username: PropTypes.string.isRequired, //ptsr
 getGithubRepos: PropTypes.func.isRequired, //ptfr
 repos: PropTypes.array.isRequired, //ptar
};
const mapStateToProps = state => ({
 repos: state.profile.repos,
});

export default connect(mapStateToProps, {getGithubRepos})(ProfileGithub);
