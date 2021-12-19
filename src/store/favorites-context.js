import { createContext, useState, useEffect } from "react";

const FavouritesContext = createContext({
  favourites: [],
  totalFavourites: 0,
  addFavorite: (fav) => {},
  removeFavorite: (meetupid) => {},
});

const TEST_URL = `http://localhost:5000/meetups`;

const updateFavApi = (favoriteMeetUp) => {
  const url = `${TEST_URL}/${favoriteMeetUp._id}`;
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(favoriteMeetUp),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to update, Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
};

export function FavoritesContextProvider(props) {
  const [userFavourites, setUserFavourites] = useState([]);

  useEffect(() => {
    fetch(`${TEST_URL}?fav=true`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to update, Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUserFavourites(data.meetups);
      })
      .catch((err) => console.error(err));
  }, []);

  function addFavoriteHandler(favoriteMeetUp) {
    updateFavApi(favoriteMeetUp);
    setUserFavourites((prevFavorites) => {
      return prevFavorites.concat(favoriteMeetUp);
    });
  }

  function removeFavoriteHandler(favoriteMeetUp) {
    updateFavApi(favoriteMeetUp);
    setUserFavourites((prev) => {
      return prev.filter((meetup) => meetup.id !== favoriteMeetUp._id);
    });
  }

  const context = {
    favourites: userFavourites,
    totalFavourites: userFavourites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
  };

  return (
    <FavouritesContext.Provider value={context}>
      {props.children}
    </FavouritesContext.Provider>
  );
}

export default FavouritesContext;
