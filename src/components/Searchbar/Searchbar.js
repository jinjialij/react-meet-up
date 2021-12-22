import { useState } from "react";
import classes from './Searchbar.module.css';

const Searchbar = (props) => {
    const [searchText, setSearchText] = useState("");

    const searchTextChangeHandler = (event) => {
        setSearchText(event.target.value);
    };

    const searchHandler = async () => {
        props.onSearch(searchText);
    };

    return (
        <div className={classes.searchbar}>
            <h1>{props.title}</h1>
            <div>
                <input
                    className={classes.searchbarinput}
                    type="text"
                    name="searchBar"
                    placeholder="Search Title"
                    value={searchText}
                    onChange={searchTextChangeHandler}
                />
                <button
                    className={classes.searchbtn}
                    type="button"
                    onClick={searchHandler}
                >
                    Search
                </button>
            </div>
        </div>);

}

export default Searchbar;