import React from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {logout} from '../../actions/auth';
import { Fragment } from 'react';


const Navbar = ({isAuthenticated, logout,loading}) => {
    const authLinks = (
    <ul>
        {/* <li><Link to="/profiles">Developers</Link></li> */}
        <li>
            <Link to="/dashboard">
                <i className = "fas fa-user" />{' '}
                <span className = "hide-sm">Dashboard</span>
            </Link>
        </li>
        {/* <li><Link to="/posts">Posts</Link></li> */}
        <li>
            <a onClick = {logout} href = "/">
                <i className = "fas fa-sign-out-alt" />{' '}
                <span className = "hide-sm">Logout</span>
            </a>
        </li>
    </ul>);
const guestLinks = 
    (<ul>
        {/* <li><Link to="/profiles">Developers</Link></li> */}
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
    </ul>);

    return (
        <div>
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"><i className="fas fa-code"></i> Home</Link>
                </h1>
                {!loading && <Fragment>{( isAuthenticated ?authLinks: guestLinks)}</Fragment>}
            </nav>
        </div>
    )
}

const mapStateToProps = (state)=> {
    return {
        isAuthenticated : state.authReducer.isAuthenticated,
        loading : state.authReducer.loading
    }
}
Navbar.propTypes = {
    logout : PropTypes.func.isRequired,
    isAuthenticated : PropTypes.bool.isRequired,
    loading : PropTypes.bool.isRequired,
}
export default connect(mapStateToProps, {logout})(Navbar);