import { createContext, useState } from "react";

const FavouritesContext = createContext({
  favourites: [],
  totalFavourites: 0,
  addFavorite: (fav) => {},
  removeFavorite: (meetupid) => {},
  itemIsFavorite: (meetupid) => {},
});

export function FavoritesContextProvider(props) {
  const [userFavourites, setUserFavourites] = useState([]);

  function addFavoriteHandler(favoriteMeetUp) {
    setUserFavourites((prevFavorites) => {
      return prevFavorites.concat(favoriteMeetUp);
    });
  }

  function removeFavoriteHandler(meetUpId) {
    setUserFavourites((prev) => {
      return prev.filter((meetup) => meetup.id !== meetUpId);
    });
  }

  function itemIsFavoriteHandler(meetUpId) {
    return userFavourites.some((meetup) => meetup.id === meetUpId);
  }

  const context = {
    favourites: userFavourites,
    totalFavourites: userFavourites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };

  return (
    <FavouritesContext.Provider value={context}>
      {props.children}
    </FavouritesContext.Provider>
  );
}

export default FavouritesContext;
