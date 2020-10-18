import React, {Fragment, useEffect} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard'
import Register from './components/auth/Register';
import Alert from './components/layout/Alert'
import store from './store'
import PrivateRoute from './components/routing/PrivateRoute'
import {loadUser} from './actions/auth'
import {BrowserRouter as Router, Route , Switch } from 'react-router-dom';

const App = ()=> {
  useEffect(() => {
    store.dispatch(loadUser());
}, []);
 return (<Router>
    <Fragment>
      <Navbar></Navbar>
      <Route exact path = "/" component = {Landing} />
      <section className = "container">
                <Alert></Alert>
                <Switch>
                    <Route exact path = "/register" component = {Register}></Route>
                    {/* <Route exact path = "/profiles" component = {Profiles}></Route> */}
                    <Route exact path = "/login" component = {Login}></Route>
                    <PrivateRoute exact path = "/dashboard" component = {Dashboard}></PrivateRoute>
                    {/* <Route exact path = "/profile/:id" component = {Profile}></Route>
                    <PrivateRoute exact path = "/dashboard" component = {Dashboard}></PrivateRoute>
                    <PrivateRoute exact path = "/create-profile" component = {CreateProfile}></PrivateRoute>
                    <PrivateRoute exact path = "/edit-profile" component = {EditProfile}></PrivateRoute>
                    <PrivateRoute exact path = "/add-experience" component = {AddExperience}></PrivateRoute>
                    <PrivateRoute exact path = "/add-education" component = {AddEducation}></PrivateRoute>
                    <PrivateRoute exact path = "/posts" component = {Posts}></PrivateRoute>
                    <PrivateRoute exact path = "/posts/:id" component = {Post}></PrivateRoute> */}
                </Switch>
            </section>
  </Fragment>
</Router>);
}
export default App;
