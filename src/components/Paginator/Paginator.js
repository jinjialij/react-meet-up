import Option from "../ui/Option";
import classes from './Paginator.module.css'

const Paginator = (props) => {
    <div className={classes.pagebar}>
        <div className={classes.pagegroup}>
            <label htmlFor="itemPerPage" className={classes.pageItem}>
                Meetup per page
            </label>
            <select
                name="itemPerPage"
                id="itemPerPage"
                onChange={props.onSelectItemPerpage}
                defaultValue={props.paginator.limit}
                className={classes.pageItem}
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
            </select>
        </div>
        <div className={classes.pagegroup}>
            <label htmlFor="pages" className={classes.pageItem}>
                Page
            </label>
            <select
                className={classes.pageItem}
                name="pages"
                id="pages"
                onChange={props.onPageSelect}
                defaultValue={props.paginator.page}
            >
                {props.totalpageArr.map((el) => {
                    return <Option key={el} pageNumber={el}></Option>;
                })}
            </select>
        </div>
    </div>
}

export default Paginator;