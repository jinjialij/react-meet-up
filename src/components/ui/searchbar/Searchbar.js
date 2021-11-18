import classes from "./Searchbar.module.css";

const Searchbar = (props) => {
  return (
    <div>
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};

export default Searchbar;
