import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";
import { useContext, useState } from "react";
import FavouritesContext from "../../store/favorites-context";

import { BsHeartFill, BsHeart } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";

function MeetupItem(props) {
  //read context data
  const favoriteCtx = useContext(FavouritesContext);
  const [isFav, setIsFav] = useState(props.fav);
  function toggleFavouriteStatusHandler() {
    if (isFav) {
      //remove when is not favourite
      setIsFav(false);
      favoriteCtx.removeFavorite({
        _id: props.id,
        title: props.title,
        address: props.address,
        image: props.image,
        description: props.description,
        fav: false,
      });
    } else {
      //add when is favorite
      setIsFav(true);
      favoriteCtx.addFavorite({
        _id: props.id,
        title: props.title,
        address: props.address,
        image: props.image,
        description: props.description,
        fav: true,
      });
    }
  }

  const deleteHandler = () => {
    let isDelete = window.confirm("Are you sure to delet this meetup?");
    if (isDelete) {
      props.onDeleteMeetup(props.id);
    } else {
      return;
    }

  };

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
        <div className={classes.fav}>
          <div onClick={toggleFavouriteStatusHandler}>
            {isFav ? (
              <BsHeartFill size={35} color="red" className={classes.icon} />
            ) : (
              <BsHeart size={35} color="red" className={classes.icon} />
            )}
          </div>
          <div onClick={deleteHandler}>
            <AiFillDelete size={35} color="#77002e" className={classes.icon} />
          </div>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
