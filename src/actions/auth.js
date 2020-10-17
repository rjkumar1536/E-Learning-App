
import {REGISTER_FAILED, 
    REGISTER_SUCCESS ,
    AUTH_FAILED, 
    AUTH_SUCCESS,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    CLEAR_PROFILE,
    LOGOUT} from './types';
import axios from 'axios';
import {setAlert} from './action';
import setAuthToken from '../utils/setAuthToken'

export const loadUser = ()=> async (dispatch, getState)=>{
const token = localStorage.getItem('token');
if(token){
    try {
        setAuthToken(token);
        const res = await axios.get('/api/auth');
        dispatch({type : AUTH_SUCCESS, payload : res.data})
    } catch (error) {
        dispatch({type : AUTH_FAILED  })
    }
}
}
export const registerUser = ({name , email, password, userType, regID, regIDs})=> async(dispatch)=>{
let newUser = {}
if(userType === "Student"){
    newUser = {
        name,
        email,
        password, regID
    }
}
else if(userType === "Teacher"){
    newUser = {
        name,
        email,
        password
    }
}
else{
    newUser = {
        name,
        email,
        password, regIDs : regIDs.split(",")
    }
}
const config = {
    headers : {
        'Content-Type' : 'application/json'
    }
}
const body = JSON.stringify(newUser);
try {
    let result = await axios.post('/api/users',body, config );
    dispatch({type : REGISTER_SUCCESS , payload : result.data });
    dispatch(loadUser());
    dispatch(setAlert('user successfully registered', 'success'));
} catch (err) {
    const errors = err.response.data.errors;
    if(errors){
        errors.forEach((error)=>{
            dispatch(setAlert(error.msg, 'danger'));
        });
    }
    dispatch({type : REGISTER_FAILED})
}
}

export const loginUser = ({email , password,userType})=> async (dispatch)=>{
const user = {
    email,
    password
}

const config = {
    headers : {
        'Content-Type' : 'application/json'
    }
}
const body = JSON.stringify(user);

try {
    const res = await  axios.post('/api/auth',body , config);
    await dispatch({type : LOGIN_SUCCESS, payload : res.data});
    dispatch(loadUser());
    dispatch(setAlert('user successfully logged in', 'success'));
} catch (error) {
    dispatch({type : LOGIN_FAILED});
    const errors = error.response.data.errors;
    if(errors){
        errors.forEach((error)=>{
            dispatch(setAlert(error.msg, 'danger'));
        })
    }
}

}

export const logout = ()=> (dispatch)=>{
dispatch({type : LOGOUT})
dispatch({type : CLEAR_PROFILE})
}
