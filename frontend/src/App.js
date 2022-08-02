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

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact={true}>
          </Route>
          <Route path="/signup" exact={true}>
            <SignupFormPage />
          </Route>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/skateparks" exact={true}>
            <AllSkateparks/>
          </Route>
          <Route path="/skateparks/new" exact={true}>
            <NewSkateparkForm/>
          </Route>
          <Route path="/skateparks/:id/edit" exact={true}>
            <EditSkateparkForm/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
