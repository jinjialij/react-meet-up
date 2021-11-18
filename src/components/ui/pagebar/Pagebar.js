import classes from "./Pagebar.module.css";

const Pagebar = (props) => {
  return (
    <div>
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};

export default Pagebar;
