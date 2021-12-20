import { Route, Switch } from "react-router-dom";
import { useState, useContext } from "react";

import AllMeetupsPage from "./pages/AllMeetups";
import FavouritesPage from "./pages/Favorites";
import NewMeetupsPage from "./pages/NewMeetups";
import Layout from "./components/layout/Layout";
import FavouritesContext from './store/favorites-context';

const BASE_URL = `https://meetuphere.herokuapp.com/meetups`;
const TEST_URL = `http://localhost:5000/meetups`;
const initialUrl = `${BASE_URL}?page=1&limit=5`;
function App() {
  const favoriteCtx = useContext(FavouritesContext);

  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [totalpageArr, setTotalpageArr] = useState([1]);
  const [paginator, setPaginator] = useState({
    page: 1,
    limit: 5,
  });

  const searchHandler = () => {
    setUrl(`${BASE_URL}?title=${searchText}&page=1&limit=${paginator.limit}`);
    setPaginator((prevState) => {
      return { ...prevState, page: 1 };
    });

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        favoriteCtx.allMeetups = data.meetups.results;
      });
  };

  const pageSelectHandler = (event) => {
    setUrl(
      `${BASE_URL}?title=${searchText}&page=${event.target.value}&limit=${paginator.limit}`
    );
    setPaginator((prevState) => {
      return { ...prevState, page: event.target.value };
    });
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        favoriteCtx.allMeetups = data.meetups.results;
      });
  };

  const itemPerPageSelectHandler = (event) => {
    setUrl(
      `${BASE_URL}?title=${searchText}&page=1&limit=${event.target.value}`
    );
    setPaginator({ page: 1, limit: event.target.value });
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        favoriteCtx.allMeetups = data.meetups.results;
      });
  };

  return (
    <Layout>
      <Switch>
        <Route path="/" exact={true}>
          <AllMeetupsPage meetups={favoriteCtx.allMeetups} limit={10} paginator={paginator} isLoading={favoriteCtx.isLoading} totalpageArr={totalpageArr} onPageSelect={pageSelectHandler} onSelectItemPerpage={itemPerPageSelectHandler} onSearch={searchHandler} />
        </Route>
        <Route path="/new-meetup">
          <NewMeetupsPage />
        </Route>
        <Route path="/favourites">
          <FavouritesPage limit={10} />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
