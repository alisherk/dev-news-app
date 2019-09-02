import React, { Fragment, useEffect, useContext } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import M from 'materialize-css';
import { FirebaseContext } from '../../firebase';

function Header() {
  const { user, firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);
  }, []);

  return (
    <Fragment>
      <div className='navbar-fixed'>
        <nav>
          <div className='nav-wrapper orange accent-2 lighten-2'>
            <div className='container'>
              <NavLink to='/' className='brand-logo left'>
                <img src='/logo.png' alt='hacker-news' className='logo' />
              </NavLink>
              <span
                style={{ cursor: 'pointer' }}
                data-target='mobile-nav'
                className='sidenav-trigger right hide-on-med-and-up'
              >
                <i className='material-icons white-text'>menu</i>
              </span>

              <ul className='right hide-on-small-and-down'>
                <li>
                  <NavLink to='/top'> Top 5 </NavLink>
                </li>
                <li>
                  <NavLink to='/search'> Search </NavLink>
                </li>
                <li>{user && <NavLink to='/create'> Share </NavLink>}</li>
                <li>
                  {user ? (
                    <div className='pink-text'>
                      {user.displayName} |
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => firebase.logout()}
                      >
                        {' '}
                        Logout
                      </span>
                    </div>
                  ) : (
                    <NavLink to='/login'> Login </NavLink>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <ul className='sidenav' id='mobile-nav'>
        <li>
          <NavLink to='/top'> Top 5 </NavLink>
        </li>
        <li>
          <NavLink to='/search'> Search </NavLink>
        </li>
        <li>
          <NavLink to='/create'> Create </NavLink>
        </li>
        <li>
          {user ? (
              <NavLink to={''}
                style={{ cursor: 'pointer' }}
                onClick={() => firebase.logout()}
              >
                {' '}
                Logout
              </NavLink>
          ) : (
            <NavLink to='/login'> Login </NavLink>
          )}
        </li>
      </ul>
    </Fragment>
  );
}

export default withRouter(Header);
