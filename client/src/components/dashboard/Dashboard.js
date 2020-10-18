import React , {Fragment, useState} from 'react'
import { Link , Redirect} from 'react-router-dom';
// import axios from 'axios';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/action';
import PropTypes from 'prop-types';
import InfoCorner from './InfoCorner';

const Dashboard = ()=>{
    return (
        <Fragment>
            <div className = "dashboard">
                <div className = "left__section">
                </div>
                <div className = "right__section">
                    <InfoCorner></InfoCorner>
                </div>
            </div>
        </Fragment>
    )
}

export default connect()(Dashboard)