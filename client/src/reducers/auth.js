import {REGISTER_FAILED, 
    REGISTER_SUCCESS, 
    AUTH_FAILED, 
    AUTH_SUCCESS,
    LOGIN_SUCCESS, 
    LOGIN_FAILED , 
    LOGOUT,      
    DELETE_ACCOUNT
    } from '../actions/types';
const initialState = {
token : localStorage.getItem('token'),
isAuthenticated : false,
loading : true,
user : null
}

const authReducer = (state = initialState, action)=>{
const {type , payload} = action;
switch(type){
    case REGISTER_SUCCESS : 
    case LOGIN_SUCCESS :
        localStorage.setItem('token', payload.token)
        return {...state , user : payload, isAuthenticated : true, loading : false  }
    case REGISTER_FAILED :
    case AUTH_FAILED :
    case LOGIN_FAILED :
         localStorage.removeItem('token');
        return {...state , token : null, isAuthenticated : false, loading : false  }
    case AUTH_SUCCESS :
        return {...state, user : payload,  isAuthenticated : true, loading : false}
    // case AUTH_FAILED :
    //     return {...state , token : null, isAutheticated : false, loading : false  }
    case LOGOUT :
    case DELETE_ACCOUNT :
        localStorage.removeItem('token');
        return {
            token : localStorage.getItem('token'),
            isAuthenticated : false,
            loading : false,
            user : null
        }
    default : return {...state, loading : false};
}
}

export default authReducer;