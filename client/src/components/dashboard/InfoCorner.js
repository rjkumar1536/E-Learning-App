import React , {Fragment, useState} from 'react'
import { Link , Redirect} from 'react-router-dom';
// import axios from 'axios';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/action';
import PropTypes from 'prop-types';

let information = {
    "Teacher" : [
        {
            id : 1001,
            text : "A Five days online workshop on Outcome-based education and NBA Accreditation Process, October 19-23, 2020",
        },
        {
            id : 1002,
            text : "Dear Teachers, School will remain closed tomorrow i.e. 17 April 2019 on account of Mahavir Jayanti. -Principal"
        },
        {
            id : 1003,
            text : "Dear Teachers,  This is to inform that School will remain closed from 1 January to 15 January 2019 for Winter Vacations and will re-open on 16 January 2019.  -PRINCIPAL  "
        }
    ],
    "Parent" : [
        {
            id : 2001,
            text : "Students who belong to Rajasthan state can apply for the scholarship on sso.rajasthan.gov.in. The last date is 30.11.2020"
        },
        {
            id : 2002,
            text : "Dear Parents,  This is to inform that School will remain closed from 1 January to 15 January 2019 for Winter Vacations and will re-open on 16 January 2019.  -PRINCIPAL  "
        }
    ],
    "Student" : [
        {
            id : 3001,
            text : "Students who belong to Rajasthan state can apply for the scholarship on sso.rajasthan.gov.in. The last date is 30.11.2020"
        },
        {
            id : 3002,
            text : "The last date for payment of Tuition fee is extended up to 25.07.2020"
        },
        {
            id : 3003,
            text : "Dear Students,  This is to inform that School will remain closed from 1 January to 15 January 2019 for Winter Vacations and will re-open on 16 January 2019.  -PRINCIPAL  "
        },
        {
            id : 3004,
            text : "Dear Students, School will remain closed tomorrow i.e. 17 April 2019 on account of Mahavir Jayanti. -Principal"
        },
    ]
}

const InfoCorner = ()=>{
    const userType = localStorage.getItem("userType");
    return (<Fragment>
        <div className = "latest__list">
            <h1 className = "list__header">Latest News</h1>
            <div className = "list__news">
                <marquee direction = "up" height = "10%" vspace = {10} scrollDelay = "20" behaviour = "alternate">
                {   
                     information[userType].map((item, index)=>{
                        return (
                            <Fragment>
                                <li className = "news__style" key = {item.id}>
                                {item.text}
                                </li>
                            </Fragment>
                            )
                    })
                }
                </marquee>
            </div>
        </div>
    </Fragment>)
}

export default connect()(InfoCorner);