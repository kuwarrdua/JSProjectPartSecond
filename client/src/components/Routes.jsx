import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import Login from './sessions/login';
import Logout from './sessions/logout';

import Cars from './cars/Index';
import NewBlog from './cars/New';
import EditBlog from './cars/Edit';

function Routes ({user, setUser}) {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/about" component={About}/>
      <Route exact path="/login" render={
        renderProps => <Login
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/logout" render={
        renderProps => <Logout
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/cars" render={
        renderProps => <Cars
          {...renderProps}
          user={user}
        />
      }/>
      <Route exact path="/cars/new" component={NewBlog}/>
      <Route exact path="/cars/edit" component={EditBlog}/>
    </Switch>
  );
}
export default Routes;