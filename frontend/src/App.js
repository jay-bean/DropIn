import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import * as sessionActions from "./store/session";
import SignupFormPage from "./components/SignupFormPage/SignupFormPage";
import Navigation from "./components/Navigation/Navigation";
import LoginForm from "./components/LoginFormPage/LoginFormPage";
import NewSkateparkForm from "./components/Skateparks/SkateparkForms/SkateparkForm";
import EditSkateparkForm from "./components/Skateparks/SkateparkForms/EditSkateparkForm";
import AllSkateparks from "./components/Skateparks/ExplorePage/Skateparks";
import SingleSkatepark from "./components/Skateparks/SingleSkatePark/SingleSkateparkPage";
import Homepage from "./components/HomePage/Homepage";
import Profile from './components/Profile/Profile/Profile'
import EditProfile from "./components/Profile/EditProfile/EditProfile";
import Footer from "./components/Footer/Footer";
import AboutPage from "./components/AboutPage/AboutPage";
import UsersReviews from "./components/Profile/Profile/UsersReviews";
import UsersSkateparks from "./components/Profile/Profile/UsersSkateparks";
import UsersFavorites from "./components/Profile/Profile/UsersFavorites";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import SearchBar from "./components/SearchBar/SearchBar";
import './index.css';

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
          <Route path="/profile/reviews" exact={true}>
            <UsersReviews />
          </Route>
          <Route path="/profile/favorites" exact={true}>
            <UsersFavorites />
          </Route>
          <Route path="/profile/skateparks" exact={true}>
            <UsersSkateparks />
          </Route>
          <Route path="/profile/edit" exact={true}>
            <EditProfile />
          </Route>
          <Route path="/skateparks" exact={true}>
            <AllSkateparks/>
          </Route>
          <Route path="/skateparks/Half pipe" exact={true}>
            <AllSkateparks tagId={1}/>
          </Route>
          <Route path="/skateparks/Bowl" exact={true}>
            <AllSkateparks tagId={2}/>
          </Route>
          <Route path="/skateparks/Pool" exact={true}>
            <AllSkateparks tagId={3}/>
          </Route>
          <Route path="/skateparks/Snake run" exact={true}>
            <AllSkateparks tagId={4}/>
          </Route>
          <Route path="/skateparks/Street" exact={true}>
            <AllSkateparks tagId={5}/>
          </Route>
          <Route path="/skateparks/Rails" exact={true}>
            <AllSkateparks tagId={6}/>
          </Route>
          <Route path="/skateparks/Ledges" exact={true}>
            <AllSkateparks tagId={7}/>
          </Route>
          <Route path="/skateparks/Pump Track" exact={true}>
            <AllSkateparks tagId={8}/>
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
          <Route path="/about" exact={true}>
            <AboutPage/>
          </Route>
          <Route path="/" exact={true}>
            <Homepage/>
          </Route>
          <Route path="/search" exact={true}>
            <SearchBar/>
          </Route>
          <Route path='*'>
            <PageNotFound/>
          </Route>
        </Switch>
      )}
      <Footer/>
    </div>
  );
}

export default App;
