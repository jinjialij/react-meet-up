import { Link } from "react-router-dom";
import { useContext } from "react";
import FavouritesContext from "../../store/favorites-context";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const favoriteCtx = useContext(FavouritesContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Meetups</div>
      <nav>
        <ul>
          <li>
            <Link to="/">All Meetups</Link>
          </li>
          <li>
            <Link to="/new-meetup">Add new Meetups</Link>
          </li>
          <li>
            <Link to="/favourites">
              My favourites
              <span className={classes.badge}>
                New {favoriteCtx.totalNewFavourites}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
