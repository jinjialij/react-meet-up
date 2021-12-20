import { createContext, useState, useEffect } from "react";

const FavouritesContext = createContext({
  isLoading: false,
  favourites: [],
  totalFavourites: 0,
  addFavorite: (fav) => { },
  removeFavorite: (meetupid) => { },
  deleteMeetup: (meetup) => { }
});
const BASE_URL = `https://meetuphere.herokuapp.com/meetups`;
const TEST_URL = `http://localhost:5000/meetups`;

const updateFavApi = (favoriteMeetUp) => {
  const url = `${BASE_URL}/${favoriteMeetUp._id}`;

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
    // .then((data) => console.log(data))
    .catch((err) => console.error(err));
};

export function FavoritesContextProvider(props) {
  const [userFavourites, setUserFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const url = `${BASE_URL}?fav=true`;
    setIsLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to update, Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setUserFavourites(data.meetups);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  function addFavoriteHandler(favoriteMeetUp) {

    setUserFavourites((prevFavorites) => {
      return prevFavorites.concat(favoriteMeetUp);
    });
    updateFavApi(favoriteMeetUp);
  }

  function removeFavoriteHandler(favoriteMeetUp) {
    console.log(favoriteMeetUp._id);
    setUserFavourites((prev) => {
      return prev.filter((meetup) => meetup._id !== favoriteMeetUp._id);
    });
    updateFavApi(favoriteMeetUp);
  }

  const deleteMeetupHandler = (id) => {
    setUserFavourites((prev) => {
      return prev.filter((meetup) => meetup._id !== id);
    });
  }

  const context = {
    isLoading: isLoading,
    favourites: userFavourites,
    totalFavourites: userFavourites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    deleteMeetup: deleteMeetupHandler
  };

  return (
    <FavouritesContext.Provider value={context}>
      {props.children}
    </FavouritesContext.Provider>
  );
}

export default FavouritesContext;
