import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Route } from "react-router-dom";
import Catalog from '../src/components/Catalog'
import SpotDetails from "./components/SpotDetails";
import CreateSpotForm from "./components/CreateSpotForm";
import SpotsCurrent from "./components/SpotsCurrent";
import SpotUpdateForm from "./components/UserSpotOptionsModal/SpotUpdateForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded &&
        <Switch>

          <Route exact path="/">
            <Catalog />
          </Route>

          <Route path='/spots/new'>
            <CreateSpotForm />
          </Route>

          <Route path='/spots/current'>
            <SpotsCurrent />
          </Route>

          <Route path='/spots/:spotId/edit'>
            <SpotUpdateForm />
          </Route>

          <Route path="/spots/:spotId">
            <SpotDetails />
          </Route>


        </Switch>
      }
    </>
  );
}

export default App;
