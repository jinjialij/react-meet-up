import Option from "../ui/Option";
import classes from './Paginator.module.css'

// const getPaginationGroup = () => {
//     let start = 0;
//     return new Array(props.totalPage).fill().map((_, idx) => start + idx + 1);
// };

const Paginator = (props) => {
    const changePageHandler = (event) => {
        props.onPageChange(event.target.value);
    };

    //limit
    const itemPerPageChangeHandler = (event) => {
        props.onItemPerPageChange(event.target.value);
    };

    return (
        <div className={classes.pagebar}>
            <div className={classes.pagegroup}>
                <label htmlFor="itemPerPage" className={classes.pageItem}>
                    Meetup per page
                </label>
                <select
                    name="itemPerPage"
                    id="itemPerPage"
                    onChange={itemPerPageChangeHandler}
                    defaultValue={props.itemPerPage}
                    className={classes.pageItem}
                >
                    <option value="3" >3</option>
                    <option value="5" >5</option>
                    <option value="10" >10</option>
                    <option value="10" >20</option>
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
                    onChange={changePageHandler}
                    value={props.page}
                >
                    {props.options.map(el => {
                        return <Option key={el} pageNumber={el}></Option>
                    })}
                </select>
                <span className={classes.total}>of {props.totalPage}</span>
            </div>
        </div>)

}

export default Paginator;