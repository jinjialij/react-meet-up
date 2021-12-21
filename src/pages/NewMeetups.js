import NewMeetupForm from "../components/meetups/NewMeetupForm";
import FavouritesContext from '../store/favorites-context'
import { useHistory } from "react-router-dom";
import { useContext } from 'react'

const BASE_URL = `https://meetuphere.herokuapp.com/meetups`;
const TEST_URL = `http://localhost:5000/meetups`;

function NewMeetupsPage() {
  const history = useHistory();
  const favoriteCtx = useContext(FavouritesContext);
  function addMeetupHandler(meetupData) {
    fetch(`${BASE_URL}/new-meetup`, {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: { "Content-type": "application/json" },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error adding new meetup, Status code: ${res.status}`)
      }
      return res.json()
    }).then(data => {
      console.log(data);
      const doc = data.meetup._doc;
      const newMeetup = {
        id: data.meetup.id,
        ...doc
      };
      favoriteCtx.addMeetup(newMeetup);
      history.replace("/");//redirect to the homepage});
    })
      .catch(error => {
        console.error(error)
      })
    // console.log(newMeetup);
  }
  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupsPage;
