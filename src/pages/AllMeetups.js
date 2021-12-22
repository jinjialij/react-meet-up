import MeetupList from "../components/meetups/MeetupList";
import Searchbar from "../components/Searchbar/Searchbar";
import Paginator from "../components/Paginator/Paginator";
import FavouritesContext from "../store/favorites-context";
import { BASE_URL } from '../service/FetchApiService'

import { useState, useEffect, useContext } from "react";

function AllMeetupsPage(props) {
  const [url, setUrl] = useState(`${BASE_URL}?title=&page=1&limit=${props.limit}`);
  const favoriteCtx = useContext(FavouritesContext);
  const [meetups, setMeetups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  //default limit is 10
  const [limit, setLimit] = useState(10);
  const [options, setOptions] = useState(new Array(totalPage).fill().map((_, idx) => idx + 1));

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to update, Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setMeetups(data.meetups.results);
        setTotalPage(data.meetups.totalpage);
        const fav = data.meetups.results.filter(meetup => meetup.fav !== false);
        favoriteCtx.setFavourites(fav);
        favoriteCtx.setNewFavourites([]);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [url, favoriteCtx.newFavourite]);

  const searchHandler = async (searchText) => {
    setSearchText(searchText);
    const newUrl = `${BASE_URL}?title=${searchText}&page=1&limit=${props.limit}`;
    setUrl(newUrl);
  }

  const changePagehandler = async (newPage) => {
    setPage(newPage);
    const newUrl = `${BASE_URL}?title=${searchText}&page=${newPage}&limit=${limit}`;
    setUrl(newUrl);
  }
  const changeItemsPerPageHandler = (newLimit) => {
    setLimit(newLimit);
    const newUrl = `${BASE_URL}?title=${searchText}&page=1&limit=${newLimit}`;
    setUrl(newUrl);
  }

  const deleteHandler = (deleteMeetup) => {
    setMeetups(prev => {
      return prev.filter(meetup => meetup._id !== deleteMeetup._id)
    })
  }

  return (
    <section>
      <Searchbar title={"All meetups"} onSearch={searchHandler} />
      <Paginator
        totalPage={totalPage}
        options={options}
        page={page}
        onPageChange={changePagehandler}
        itemPerPage={limit}
        onItemPerPageChange={changeItemsPerPageHandler} />
      {isLoading && <p>Loading...</p>}
      {!isLoading && <MeetupList
        meetups={meetups}
        onDelete={deleteHandler}
      />}
    </section>
  );
}

export default AllMeetupsPage;
