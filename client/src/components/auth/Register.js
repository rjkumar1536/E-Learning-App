import React , {Fragment, useState} from 'react'
import { Link , Redirect} from 'react-router-dom';
// import axios from 'axios';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/action';
import PropTypes from 'prop-types';
// import Alert from '../layout/Alert';
import {registerUser} from '../../actions/auth';

const Register = ({setAlert, registerUser, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name : '',
        email : '',
        password : '',
        password2 : '',
        studentId : '',
        standard : '',
        // regIDs : '',
        teacherId : '',
        userType : 'Student'
    });

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name] : e.target.value});
    }
    const handleSubmit =  (e)=>{
        e.preventDefault();
        if(formData.password !== formData.password2){
            setAlert("password don't match", 'danger');
        }

        registerUser({name , email, password, studentId,userType, standard, teacherId});

        
    //     const newUser = {
    //         name,
    //         email,
    //         password
    //     }
    //     const config = {
    //         headers : {
    //             'Content-Type' : 'application/json'
    //         }
    //     }
    //     const body = JSON.stringify(newUser);
    //     console.log(body, config)
    //     try {
    //         let result = await axios.post('/api/users',body, config )
    //         console.log(result);
    //     } catch (error) {
    //         console.error(error);
    //     }
    }

    const {name, email , password, password2, studentId, userType,  standard ,teacherId} = formData;
    if(isAuthenticated){
        return <Redirect to = "/dashboard"></Redirect>
    }
    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form"  onSubmit = {(e)=> handleSubmit(e)}>
                {/* <div className="form-group"> */}
                    <div className="btn-group" data-toggle="buttons">
                        <label className="btn btn-primary active">
                            <input type="radio" name="userType" id="option1" value = "Student" autoComplete="off" checked = {userType === "Student" } onChange = {(e)=>handleChange(e)} />Student
                        </label>

                        <label className="btn btn-primary">
                            <input type="radio" name="userType" id="option2" autoComplete="off" value = "Teacher" checked = {userType === "Teacher" } onChange = {(e)=>handleChange(e)} />Teacher
                        </label>

                        <label className="btn btn-primary">
                            <input type="radio" name="userType" id="option3" autoComplete="off" checked = {userType === "Parent" } value = "Parent" onChange = {(e)=>handleChange(e)} />Parent
                        </label>

                    </div>
                {/* </div> */}
                <div className="form-group">
                <input type="text" placeholder="Name" name="name" value = {name} onChange = {(e)=>handleChange(e)}  />
                </div>
                {
                    userType === "Student" && <div className="form-group">
                    <input type="text" placeholder="Registration ID" name="studentId" value = {studentId} onChange = {(e)=>handleChange(e)}  />
                    </div>
                }
                {
                    userType === "Student" && <div className="form-group">
                    <input type="text" placeholder="Class" name="standard" value = {standard} onChange = {(e)=>handleChange(e)}  />
                    </div>
                }
                {
                    userType === "Parent" && <div className="form-group">
                    <input type="text" placeholder="Child Registration ID" name="studentId" value = {studentId} onChange = {(e)=>handleChange(e)}  />
                    </div>
                }
                {
                    userType === "Teacher" && <div className="form-group">
                    <input type="text" placeholder="Teacher Id" name="teacherId" value = {teacherId} onChange = {(e)=>handleChange(e)}  />
                    </div>
                }
                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" value = {email} onChange = {(e)=>handleChange(e)} />
                <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small>
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    // minLength="6"
                    value = {password}
                    onChange = {(e)=>handleChange(e)}
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    // minLength="6"
                    value = {password2}
                    onChange = {(e)=>handleChange(e)}
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert : PropTypes.func.isRequired,
    registerUser : PropTypes.func.isRequired,
    isAuthenticated : PropTypes.bool.isRequired,
}
const mapStateToProps = (state)=>{
    return {isAuthenticated : state.authReducer.isAuthenticated}
}
// const mapDispatchToProps = (msg , alertType)=>{
//     return {
//         setAlert : dispatch(setAlert(msg , alertType));
//     }
// }
export default connect(mapStateToProps, {setAlert, registerUser})(Register)