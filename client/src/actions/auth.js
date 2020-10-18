
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
const userType = localStorage.getItem('userType');
if(token){
    try {
        setAuthToken(token);
        let res ;
        let data = {
            'headers': {
                    "x-auth-token": token,
                    "x-auth" : token
            }
        }
        if(userType === "Student"){
            res = await axios.get('/api/students/me', data);
        }
        else if(userType === "Teacher"){
            res = await axios.get('/api/teachers/me',data);
        }
        else{
            res = await axios.get('/api/parents/me',data);
        }
        dispatch({type : AUTH_SUCCESS, payload : res.data})
    } catch (error) {
        dispatch({type : AUTH_FAILED  })
    }
}
}
export const registerUser = ({name , email, password, userType, studentId, standard, teacherId})=> async(dispatch)=>{
let newUser = {}
if(userType === "Student"){
    newUser = {
        name,
        email,
        password, studentId,class : standard
    }
}
else if(userType === "Teacher"){
    newUser = {
        name,
        email,
        password,teacherId
    }
}
else{
    newUser = {
        name,
        email,
        password, studentId
    }
}
const config = {
    headers : {
        'Content-Type' : 'application/json'
    }
}
const body = JSON.stringify(newUser);
try {
    let result ;
    if(userType === "Student"){
        result = await axios.post('/api/students/signup',body, config );
    }
    else if(userType === "Teacher"){
        result = await axios.post('/api/teachers/signup',body, config );
    }
    else{
        result = await axios.post('/api/parents/signup',body, config );
    }
    const payload = {
        token : result.headers['x-auth'],
        ...result.data,
        userType
    }
    console.log(payload);
    dispatch({type : REGISTER_SUCCESS , payload : payload });
    dispatch(loadUser());
    dispatch(setAlert('user successfully registered', 'success'));
} catch (err) {
    console.log(err.response);
    if(err.response){
        const errors = err.response.data.err;
        if(errors){
            dispatch(setAlert(errors, 'danger'));
            // errors.forEach((error)=>{
            //     dispatch(setAlert(error.msg, 'danger'));
            // });
        }
    }
    dispatch({type : REGISTER_FAILED})
}
}

export const loginUser = ({email , password,userType, studentId, teacherId})=> async (dispatch)=>{
let user;
if(userType === "Student"){
    user = {
        password,
        studentId
    }
}
else if(userType === "Teacher"){
    user = {
        password,
        teacherId
    }
}
else{
    user = {
        password,
        studentId
    }
}

const config = {
    headers : {
        'Content-Type' : 'application/json'
    }
}
const body = JSON.stringify(user);
let res;
try {
    if(userType === "Student"){
        res = await  axios.post('/api/students/signin',body , config);
    }
    else if(userType === "Teacher"){
        res = await  axios.post('/api/teachers/signin',body , config);
    }
    else{
        res = await  axios.post('/api/parents/signin',body , config);
    }
    const payload = {
        token : res.headers['x-auth'],
        ...res.data,
        userType
    }
    await dispatch({type : LOGIN_SUCCESS, payload : payload});
    dispatch(loadUser());
    dispatch(setAlert('user successfully logged in', 'success'));
} catch (error) {
    dispatch({type : LOGIN_FAILED});
    if(error.response){
        // const errors = error.response.data.err;
        const errors = error.response.data.message
        if(errors){
            dispatch(setAlert(errors, 'danger'));
            // errors.forEach((error)=>{
            //     dispatch(setAlert(error.msg, 'danger'));
            // })
        }
    }
}

}

export const logout = ()=> async (dispatch)=>{
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    let data = {
        'headers': {
                "x-auth-token": token,
                "x-auth" : token
        }
    }
    let res;
    try{
        if(userType === "Student"){
            res = await axios.delete(`/api/students/logout`,data )
        }
        else if(userType === "Teacher"){
            res = await axios.delete(`/api/teachers/logout`,data )
        }
        else{
            res = await axios.delete(`/api/parents/logout`,data )
        }
        dispatch({type : LOGOUT})
        dispatch({type : CLEAR_PROFILE})
    }
    catch(error){
        dispatch({type : LOGOUT})
        dispatch({type : CLEAR_PROFILE})
    }
    
}
