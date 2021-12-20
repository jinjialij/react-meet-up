import MeetupList from "../components/meetups/MeetupList";
import Searchbar from "../components/Searchbar/Searchbar";

import { fetchMeetups } from '../service/FetchApiService';
import classes from "./AllMeetups.module.css";
import { useState } from "react";

const BASE_URL = `https://meetuphere.herokuapp.com/meetups`;

function AllMeetupsPage(props) {
  const [searched, setSearched] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  if (props.isLoading) {
    return <section>Loading...</section>;
  }

  const initialUrl = `${BASE_URL}?page=1&limit=${props.limit}`;

  const searchHandler = async (url) => {
    const data = await fetchMeetups(url);
    setSearchResults(data.meetups.results);
    setSearched(true);
  }

  return (
    <section>
      <Searchbar title={"All meetups"} url={initialUrl} onSearch={searchHandler} />
      {/* <Paginator /> */}
      {!searched && <MeetupList
        meetups={props.meetups}
      />}
      {searched && searchResults.length == 0 && <p>0 result</p>}
      {searchResults.length > 0 && <MeetupList
        meetups={searchResults}
      />}
    </section>
  );
}

export default AllMeetupsPage;
