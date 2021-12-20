import { createContext, useState, useEffect } from "react";
import { deleteMeetup, } from '../service/FetchApiService'

const FavouritesContext = createContext({
  allMeetups: [],
  setAllMeetups: (meetups) => { },
  isLoading: false,
  setIsLoading: (status) => { },
  favourites: [],
  totalFavourites: 0,
  addFavorite: (fav) => { },
  addMeetup: (meetup) => { },
  removeFavorite: (meetupid) => { },
  deleteMeetup: (meetup) => { },
  url: "",
  setUrl: () => { }
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
  const [allMeetups, setAllMeetups] = useState([]);
  const [url, setUrl] = useState(`${BASE_URL}?title=&page=1&limit=5`);
  const [userFavourites, setUserFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // const url = `${BASE_URL}`;
    setIsLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to update, Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // console.log('first fetch fav')
        // console.log(data);
        setAllMeetups(data.meetups.results);
        setUserFavourites(data.meetups.results.filter(meetup => meetup.fav !== false));
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [url]);

  function addFavoriteHandler(favoriteMeetUp) {
    setUserFavourites((prevFavorites) => {
      return prevFavorites.concat(favoriteMeetUp);
    });
    const index = allMeetups.findIndex(meetup => meetup._id === favoriteMeetUp._id);
    const updateAllmeetups = [...allMeetups];
    updateAllmeetups[index].fav = favoriteMeetUp.fav;
    setAllMeetups(updateAllmeetups);
    updateFavApi(favoriteMeetUp);
  }

  function removeFavoriteHandler(favoriteMeetUp) {
    // console.log(favoriteMeetUp._id);
    setUserFavourites((prev) => {
      return prev.filter((meetup) => meetup._id !== favoriteMeetUp._id);
    });
    const index = allMeetups.findIndex(meetup => meetup._id === favoriteMeetUp._id);
    const updateAllmeetups = [...allMeetups];
    updateAllmeetups[index].fav = favoriteMeetUp.fav;
    setAllMeetups(updateAllmeetups);
    updateFavApi(favoriteMeetUp);
  }

  const deleteMeetupHandler = (id) => {
    setUserFavourites((prev) => {
      return prev.filter((meetup) => meetup._id !== id);
    });
    setAllMeetups((prev) => {
      return prev.filter((meetup) => meetup._id !== id);
    });
    deleteMeetup(id);
  }

  const addMeetupHandler = (meetup) => {
    setAllMeetups((prevMeetup) => {
      return prevMeetup.concat(meetup);
    });
  }

  const setAllMeetupsHandler = (meetups) => {
    setAllMeetups(meetups);
  }

  const loadingHandler = (status) => {
    setIsLoading(status);
  }

  const urlHandler = (url) => {
    setUrl(url);
  }

  const context = {
    allMeetups: allMeetups,
    setAllMeetups: setAllMeetupsHandler,
    isLoading: isLoading,
    setIsLoading: loadingHandler,
    favourites: userFavourites,
    totalFavourites: userFavourites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    deleteMeetup: deleteMeetupHandler,
    addMeetup: addMeetupHandler,
    url: url,
    setUrl: urlHandler
  };

  return (
    <FavouritesContext.Provider value={context}>
      {props.children}
    </FavouritesContext.Provider>
  );
}

export default FavouritesContext;
