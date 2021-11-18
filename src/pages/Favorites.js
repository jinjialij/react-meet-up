import FavouritesContext from "../store/favorites-context";
import { useContext } from "react";
import MeetupList from "../components/meetups/MeetupList";

function FavoritesPage() {
  const favoriteCtx = useContext(FavouritesContext);
  let context;
  if (favoriteCtx.totalFavourites === 0) {
    context = `No Favorites yet. Start adding some?`;
  } else {
    context = <MeetupList meetups={favoriteCtx.favourites} />;
  }
  return (
    <section>
      <h1>My Favorites</h1>
      {<p>{context}</p>}
    </section>
  );
}

export default FavoritesPage;
