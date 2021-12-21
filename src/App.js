import { Route, Switch } from "react-router-dom";
import { useContext } from "react";

import AllMeetupsPage from "./pages/AllMeetups";
import FavouritesPage from "./pages/Favorites";
import NewMeetupsPage from "./pages/NewMeetups";
import Layout from "./components/layout/Layout";
import FavouritesContext from './store/favorites-context';

function App() {
  const favoriteCtx = useContext(FavouritesContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact={true}>
          <AllMeetupsPage meetups={favoriteCtx.allMeetups} page={1} limit={3} isLoading={favoriteCtx.isLoading} totalPage={2} />
        </Route>
        <Route path="/new-meetup">
          <NewMeetupsPage />
        </Route>
        <Route path="/favourites">
          <FavouritesPage limit={3} />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
