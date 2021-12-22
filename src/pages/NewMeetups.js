import NewMeetupForm from "../components/meetups/NewMeetupForm";
import { addMeetupApi } from '../service/FetchApiService';
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import FavouritesContext from '../store/favorites-context'

function NewMeetupsPage(props) {
  const history = useHistory();
  const favoriteCtx = useContext(FavouritesContext);
  const addMeetupHandler = async (meetupData) => {
    const newMeetup = await addMeetupApi(meetupData);
    // console.log(newMeetup)
    favoriteCtx.addNewFavorite(newMeetup);
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
