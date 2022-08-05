import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/Navigation";
import LoginForm from "./components/LoginFormPage/LoginFormPage";
import NewSkateparkForm from "./components/Skateparks/SkateparkForm";
import EditSkateparkForm from "./components/Skateparks/EditSkateparkForm";
import AllSkateparks from "./components/Skateparks/Skateparks";
import SingleSkatepark from "./components/Skateparks/SingleSkateparkPage"
import Homepage from "./components/HomePage/Homepage";
import './index.css';
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div id="full-page-container">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup" exact={true}>
            <SignupFormPage />
          </Route>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/profile" exact={true}>
            <Profile />
          </Route>
          <Route path="/profile/edit" exact={true}>
            <EditProfile />
          </Route>
          <Route path="/skateparks" exact={true}>
            <AllSkateparks/>
          </Route>
          <Route path="/skateparks/new" exact={true}>
            <NewSkateparkForm/>
          </Route>
          <Route path="/skateparks/:id" exact={true}>
            <SingleSkatepark/>
          </Route>
          <Route path="/skateparks/:id/edit" exact={true}>
            <EditSkateparkForm/>
          </Route>
          <Route path="/" exact={true}>
            <Homepage/>
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
