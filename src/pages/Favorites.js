import FavouritesContext from "../store/favorites-context";
import { useContext } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { deleteMeetup, } from '../service/FetchApiService'


function FavoritesPage(props) {
  const favoriteCtx = useContext(FavouritesContext);

  const deleteHandler = (id) => {
    favoriteCtx.deleteMeetup(id);
    deleteMeetup(id);
  }

  let context;
  if (favoriteCtx.totalFavourites === 0) {
    context = <p>No Favorites yet. Start adding some?</p>;
  } else {
    context = <MeetupList meetups={favoriteCtx.favourites} onDeleteMeetup={deleteHandler} />;
  }
  return (
    <section>
      <h1>My Favorites</h1>
      {favoriteCtx.isLoading && <p>...Loading...</p>}
      {!favoriteCtx.isLoading && <div>{context}</div>}
    </section>
  );
}

export default FavoritesPage;
