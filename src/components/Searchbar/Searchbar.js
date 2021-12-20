import { useState } from "react";
import classes from './Searchbar.module.css';

const Searchbar = (props) => {
    const [searchText, setSearchText] = useState("");

    const searchTextChangeHandler = (event) => {
        setSearchText(event.target.value);
    };

    const searchHandler = async () => {
        console.log('search start')
        const url = `${props.url}&title=${searchText}`;
        props.onSearch(url);
        // setPaginator((prevState) => {
        //     return { ...prevState, page: 1 };
        // });
    };

    return (
        <div className={classes.searchbar}>
            <h1>{props.title}</h1>
            <div className={classes.searchbargroup}>
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