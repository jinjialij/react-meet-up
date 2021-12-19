import MeetupList from "../components/meetups/MeetupList";
import Option from "../components/ui/Option";

import classes from "./AllMeetups.module.css";
import { useState, useEffect } from "react";

const BASE_URL = `https://meetuphere.herokuapp.com/meetups`;
const TEST_URL = `http://localhost:5000/meetups`;

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [totalpageArr, setTotalpageArr] = useState([1]);
  const [paginator, setPaginator] = useState({
    page: 1,
    limit: 5,
  });

  const [url, setUrl] = useState(`${TEST_URL}?title=&page=1&limit=5`);
  // let url = `https://meetuphere.herokuapp.com/meetups?title=${searchText}&page=${paginator.page}&limit=${paginator.limit}`;

  useEffect(() => {
    setIsLoading(true);
    //get data
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setLoadedMeetups(data.meetups.results);
        const pageArr = [];
        for (let index = 0; index < data.meetups.totalpage; index++) {
          pageArr.push(index + 1);
        }
        setTotalpageArr(pageArr);
      });
  }, [paginator]);

  if (isLoading) {
    return <section>Loading...</section>;
  }
  const deleteMeetupHandler = (id) => {
    const url = `${TEST_URL}/${id}`;
    console.log(url);
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    });

    //To-do
    //update loadedMeetups
  };
  const searchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const searchBtnHandler = (event) => {
    setUrl(`${TEST_URL}?title=${searchText}&page=1&limit=${paginator.limit}`);
    setPaginator((prevState) => {
      return { ...prevState, page: 1 };
    });

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setLoadedMeetups(data.meetups.results);
      });
  };

  const pageSelectHandler = (event) => {
    setUrl(
      `${TEST_URL}?title=${searchText}&page=${event.target.value}&limit=${paginator.limit}`
    );
    setPaginator((prevState) => {
      return { ...prevState, page: event.target.value };
    });
  };

  const itemPerPageSelectHandler = (event) => {
    setUrl(
      `${TEST_URL}?title=${searchText}&page=1&limit=${event.target.value}`
    );
    setPaginator({ page: 1, limit: event.target.value });
  };

  return (
    <section>
      <div className={classes.searchbar}>
        <h1>All meet ups</h1>

        <div className={classes.searchbargroup}>
          <input
            className={classes.searchbarinput}
            type="text"
            name="searchBar"
            placeholder="Search"
            value={searchText}
            onChange={searchTextChangeHandler}
          />
          <button
            className={classes.searchbtn}
            type="button"
            onClick={searchBtnHandler}
          >
            Search
          </button>
        </div>
      </div>
      <div className={classes.pagebar}>
        <div className={classes.pagegroup}>
          <label htmlFor="itemPerPage" className={classes.pageItem}>
            Meetup per page
          </label>
          <select
            name="itemPerPage"
            id="itemPerPage"
            onChange={itemPerPageSelectHandler}
            defaultValue={paginator.limit}
            className={classes.pageItem}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className={classes.pagegroup}>
          <label htmlFor="pages" className={classes.pageItem}>
            Page
          </label>
          <select
            className={classes.pageItem}
            name="pages"
            id="pages"
            onChange={pageSelectHandler}
            defaultValue={paginator.page}
          >
            {totalpageArr.map((el) => {
              return <Option key={el} pageNumber={el}></Option>;
            })}
          </select>
        </div>
      </div>
      <MeetupList
        meetups={loadedMeetups}
        onDeleteMeetup={deleteMeetupHandler}
      />
    </section>
  );
}

export default AllMeetupsPage;
