import NewMeetupForm from "../components/meetups/NewMeetupForm";
import { addMeetupApi } from '../service/FetchApiService';
import { useHistory } from "react-router-dom";

function NewMeetupsPage() {
  const history = useHistory();
  const addMeetupHandler = (meetupData) => {
    addMeetupApi(meetupData);
    // console.log(newMeetup)
    history.replace("/");//redirect to the homepage});
  }
  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupsPage;
