import MeetupList from "../components/meetups/MeetupList";
import { useState, useEffect } from "react";

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    //get data
    fetch("https://react-1-89e39-default-rtdb.firebaseio.com/meetups.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const meetups = [];
        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };
          meetups.push(meetup);
          console.log(meetup);
        }
        setIsLoading(false);
        setLoadedMeetups(meetups);
      });
  }, []);

  if (isLoading) {
    return <section>Loading...</section>;
  }

  //To do: get a list of meet ups
  return (
    <section>
      <h1>All meet ups</h1>
      {/* <ul>
        {DUMMY_DATA.map((meetup) => {
          return <li key={meetup.id}>{meetup.title}</li>;
        })}
      </ul> */}
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
}

export default AllMeetupsPage;
