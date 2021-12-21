import MeetupList from "../components/meetups/MeetupList";
import Searchbar from "../components/Searchbar/Searchbar";
import Paginator from "../components/Paginator/Paginator";

import { fetchMeetups } from '../service/FetchApiService';
import classes from "./AllMeetups.module.css";
import { useState } from "react";

const BASE_URL = `https://meetuphere.herokuapp.com/meetups`;


function AllMeetupsPage(props) {
  // const initialUrl = `${BASE_URL}?page=1&limit=${props.limit}`;
  const [searchText, setSearchText] = useState("");
  const [searched, setSearched] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalpage, setTotalpage] = useState(props.totalPage);
  const [options, setOptions] = useState(new Array(props.totalPage).fill().map((_, idx) => idx + 1));

  if (props.isLoading) {
    return <section>Loading...</section>;
  }

  const fetchData = async (url) => {
    const data = await fetchMeetups(url);
    // console.log(data.meetups.totalpage);
    setTotalpage(data.meetups.totalpage);
    setOptions(new Array(data.meetups.totalpage).fill().map((_, idx) => idx + 1))
    setSearchResults(data.meetups.results);
    setSearched(true);
  }

  const searchHandler = async (searchText) => {
    setSearchText(searchText);
    const newUrl = `${BASE_URL}?title=${searchText}&page=1&limit=${props.limit}`;
    fetchData(newUrl);
  }

  const changePagehandler = async (newPage) => {
    setPage(newPage);
    const newUrl = `${BASE_URL}?title=${searchText}&page=${newPage}&limit=${limit}`;
    fetchData(newUrl);
  }
  const changeItemsPerPageHandler = (newLimit) => {
    setLimit(newLimit);
    const newUrl = `${BASE_URL}?title=${searchText}&page=1&limit=${newLimit}`;
    fetchData(newUrl);
  }

  return (
    <section>
      <Searchbar title={"All meetups"} onSearch={searchHandler} />
      <Paginator
        totalPage={totalpage}
        options={options}
        page={page}
        onPageChange={changePagehandler}
        itemPerPage={limit}
        onItemPerPageChange={changeItemsPerPageHandler} />
      {!searched && <MeetupList
        meetups={props.meetups}
      />}
      {searched && searchResults.length === 0 && <p>0 result</p>}
      {searchResults.length > 0 && <MeetupList
        meetups={searchResults}
      />}
    </section>
  );
}

export default AllMeetupsPage;
