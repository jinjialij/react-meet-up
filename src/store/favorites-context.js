import { createContext, useState } from "react";
import { deleteMeetup, updateFavApi, BASE_URL } from '../service/FetchApiService'

const FavouritesContext = createContext({
  favourites: [],
  totalFavourites: 0,
  newFavourite: {},
  addNewFavorite: () => { },
  newFavourites: [],
  totalNewFavourites: 0,
  setFavourites: () => { },
  setNewFavourites: () => { },
  addFavorite: (fav) => { },
  removeFavorite: (meetupid) => { },
  deleteMeetup: (meetup) => { },
});

export function FavoritesContextProvider(props) {
  const [newFavourite, setNewFavourite] = useState();
  const [userFavourites, setUserFavourites] = useState([]);
  const [newFavourites, setNewFavourites] = useState([]);

  function addFavoriteHandler(favoriteMeetUp) {
    const url = `${BASE_URL}/${favoriteMeetUp._id}`;
    // console.log(favoriteMeetUp)
    setNewFavourites((prevFavorites) => {
      return prevFavorites.concat(favoriteMeetUp);
    });
    setUserFavourites((prevFavorites) => {
      return prevFavorites.concat(favoriteMeetUp);
    });
    updateFavApi(favoriteMeetUp, url);
  }

  async function removeFavoriteHandler(favoriteMeetUp) {
    // console.log(favoriteMeetUp._id);
    const url = `${BASE_URL}/${favoriteMeetUp._id}`;
    setUserFavourites(prev => prev.filter(meetup => meetup._id !== favoriteMeetUp._id));
    setNewFavourites(prev => prev.filter(meetup => meetup._id !== favoriteMeetUp._id));

    updateFavApi(favoriteMeetUp, url);
  }

  const deleteMeetupHandler = (id) => {
    setUserFavourites((prev) => {
      return prev.filter((meetup) => meetup._id !== id);
    });
    setNewFavourites((prev) => {
      return prev.filter((meetup) => meetup._id !== id);
    });
    return deleteMeetup(id);
  }

  const setFavouritesHandler = (favorites) => {
    setUserFavourites(favorites);
  }

  const setNewFavouritesHandler = (newfavorites) => {
    setNewFavourites(newfavorites);
  }

  const addNewFavoriteHandler = (meetup) => {
    setNewFavourite(meetup);
  }

  const context = {
    favourites: userFavourites,
    totalFavourites: userFavourites.length,
    newFavourite: newFavourite,
    newFavourites: newFavourites,
    totalNewFavourites: newFavourites.length,
    setFavourites: setFavouritesHandler,
    setNewFavourites: setNewFavouritesHandler,
    addNewFavorite: addNewFavoriteHandler,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    deleteMeetup: deleteMeetupHandler,
  };

  return (
    <FavouritesContext.Provider value={context} >
      {props.children}
    </FavouritesContext.Provider >
  );
}

export default FavouritesContext;
