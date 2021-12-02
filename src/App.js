import { Route, Switch } from "react-router-dom";

import AllMeetupsPage from "./pages/AllMeetups";
import FavouritesPage from "./pages/Favorites";
import NewMeetupsPage from "./pages/NewMeetups";
import Layout from "./components/layout/Layout";
import PinedMeetups from "./pages/PinedMeetups";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact={true}>
          <AllMeetupsPage />
        </Route>
        <Route path="/new-meetup">
          <NewMeetupsPage />
        </Route>
        <Route path="/favourites">
          <FavouritesPage />
        </Route>

        <Route path="/pinedMeetups">
          <PinedMeetups />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
