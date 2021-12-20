import FavouritesContext from "../store/favorites-context";
import { useContext, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { fetchMeetups } from '../service/FetchApiService';
import Searchbar from "../components/Searchbar/Searchbar";

const BASE_URL = `https://meetuphere.herokuapp.com/meetups`;

function FavoritesPage(props) {
  const favoriteCtx = useContext(FavouritesContext);
  const initialUrl = `${BASE_URL}?fav=true&page=1&limit=${props.limit}`;
  const [searched, setSearched] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const deleteHandler = (id) => {
    favoriteCtx.deleteMeetup(id);
  }

  const searchHandler = async (url) => {
    const data = await fetchMeetups(url);
    setSearchResults(data.meetups.results);
    setSearched(true);
  }

  let context;
  if (favoriteCtx.totalFavourites === 0) {
    context = <p>No Favorites yet. Start adding some?</p>;
  } else {
    context = <MeetupList meetups={favoriteCtx.favourites} onDeleteMeetup={deleteHandler} />;
  }
  return (
    <section>
      <Searchbar title={"My Favorites"} url={initialUrl} onSearch={searchHandler} />

      {!searched && favoriteCtx.isLoading && <p>...Loading...</p>}
      {!searched && !favoriteCtx.isLoading && <div>{context}</div>}
      {searched && searchResults.length == 0 && <p>0 result</p>}
      {searchResults.length > 0 && <MeetupList
        meetups={searchResults}
        onDeleteMeetup={deleteHandler}
      />}
    </section>
  );
}

export default FavoritesPage;
