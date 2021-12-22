import FavouritesContext from "../store/favorites-context";
import { useContext, useState, useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { fetchMeetups, BASE_URL } from '../service/FetchApiService';
import Searchbar from "../components/Searchbar/Searchbar";

function FavoritesPage(props) {
  const favoriteCtx = useContext(FavouritesContext);
  const url = `${BASE_URL}?fav=true`;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // const url = `${BASE_URL}`;    
    if (favoriteCtx.favourites || favoriteCtx.favourites.length === 0) {
      setIsLoading(true);
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to update, Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          favoriteCtx.setFavourites(data.meetups);
          favoriteCtx.setNewFavourites([]);
          setIsLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [url]);

  const deleteHandler = (id) => {
    // console.log(id);
  }

  const searchHandler = async (searchText) => {
    const newUrl = `${BASE_URL}?fav=true&title=${searchText}`;
    const data = await fetchMeetups(newUrl);
    favoriteCtx.setFavourites(data.meetups);
  }

  let context;
  if (favoriteCtx.totalFavourites === 0) {
    context = <p>No Favorites yet. Start adding some?</p>;
  } else {
    context = <MeetupList meetups={favoriteCtx.favourites} onDelete={deleteHandler} />;
  }
  return (
    <section>
      <Searchbar title={"My Favorites"} onSearch={searchHandler} />
      {!isLoading && <div>{context}</div>}
      {isLoading && <p>...Loading...</p>}
    </section>
  );
}

export default FavoritesPage;
