import MeetupList from "../components/meetups/MeetupList";
import { useState, useEffect } from "react";

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    //get data
    fetch("https://meetuphere.herokuapp.com/meetups")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setLoadedMeetups(data.meetups);
      });
  }, []);

  if (isLoading) {
    return <section>Loading...</section>;
  }

  return (
    <section>
      <h1>All meet ups</h1>
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
}

export default AllMeetupsPage;
