import FavouritesContext from "../store/favorites-context";
import { useContext } from "react";
import MeetupList from "../components/meetups/MeetupList";

function FavoritesPage() {
  const favoriteCtx = useContext(FavouritesContext);
  let context;
  if (favoriteCtx.totalFavourites === 0) {
    context = <p>No Favorites yet. Start adding some?</p>;
  } else {
    context = <MeetupList meetups={favoriteCtx.favourites} />;
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
