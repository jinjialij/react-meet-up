import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";
import { useContext } from "react";
import FavouritesContext from "../../store/favorites-context";
import PinContext from "../../store/pin-context";

function MeetupItem(props) {
  //read context data
  const favoriteCtx = useContext(FavouritesContext);
  const pinCtx = useContext(PinContext);
  //check if item is favourite
  const itemIsFavorite = favoriteCtx.itemIsFavorite(props.id);
  const itemIsPined = pinCtx.isPined(props.id);
  function toggleFavouriteStatusHandler() {
    if (itemIsFavorite) {
      //remove when is not favourite
      favoriteCtx.removeFavorite(props.id);
    } else {
      //add when is favorite
      favoriteCtx.addFavorite({
        id: props.id,
        title: props.title,
        address: props.address,
        image: props.image,
        description: props.description,
      });
    }
  }

  function togglePinStatusHandler() {
    if (itemIsPined) {
      pinCtx.removePin(props.id);
    } else {
      pinCtx.pinMeetup({
        id: props.id,
        title: props.title,
        address: props.address,
        image: props.image,
        description: props.description,
      });
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions} onClick={toggleFavouriteStatusHandler}>
          <button>
            {itemIsFavorite ? "Remove From Favorites" : "Add To Favourites"}
          </button>
        </div>
        <div className={classes.actions} onClick={togglePinStatusHandler}>
          <button>{itemIsPined ? "Remove Pin" : "Pin"}</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
