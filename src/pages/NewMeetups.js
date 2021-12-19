import NewMeetupForm from "../components/meetups/NewMeetupForm";
import { useHistory } from "react-router-dom";

const BASE_URL = `https://meetuphere.herokuapp.com/meetups`;
const test_URL = `http://localhost:5000/meetups`;

function NewMeetupsPage() {
  const history = useHistory();
  function addMeetupHandler(meetupData) {
    fetch(`${test_URL}/new-meetup`, {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: { "Content-type": "application/json" },
    }).then(() => {
      history.replace("/"); //redirect to the homepage
    });
  }
  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupsPage;
