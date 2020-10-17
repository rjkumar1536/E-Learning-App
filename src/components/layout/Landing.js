import React from 'react'
import {Link , Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types'

const Landing = ({auth : {isAuthenticated , loading}}) => {
    if(!loading && isAuthenticated){
        return <Redirect to = "/dashboard"/>
    }
    return (
        <div>
             <section className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                    <h1 className="x-large">E-Learning Classroom</h1>
                    <p className="lead">
                        Bring Student/Educators/Parents On Common Platform Where Learning is No More Distance Learning
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        <Link to="/login" className="btn btn-light">Login</Link>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

Landing.propTypes = {
    auth : PropTypes.object.isRequired,
}
const mapStateToProps = (state)=>({
    auth : state.authReducer
})
export default connect(mapStateToProps)(Landing);