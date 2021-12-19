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
  //check if item is favourite
  // const itemIsFavorite = favoriteCtx.itemIsFavorite(props.id);
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
        {/* <div className={classes.actions} onClick={toggleFavouriteStatusHandler}>
          <button>
            {isFav ? "Remove From Favorites" : "Add To Favourites"}
          </button>
        </div> */}
        <div className={classes.fav} onClick={toggleFavouriteStatusHandler}>
          {isFav ? (
            <BsHeartFill size={35} color="red" className={classes.icon} />
          ) : (
            <BsHeart size={35} color="red" className={classes.icon} />
          )}
          <AiFillDelete size={35} color="#77002e" className={classes.icon} />
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
