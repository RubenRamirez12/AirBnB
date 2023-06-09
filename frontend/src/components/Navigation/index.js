import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="NavBar">

      <NavLink exact to="/" className="Home-Icon">
      <i className="fa fa-dragon"></i>
      Airdnd
      </NavLink>

      {isLoaded && (
        <div className="userOptions">
        {sessionUser && <Link to="/spots/new" id="CreateNewSpot">Create a New Spot</Link>}
        <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
