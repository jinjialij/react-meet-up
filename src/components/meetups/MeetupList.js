import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

function MeetupList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => {
        // console.log(meetup);
        return (
          <MeetupItem
            key={meetup._id}
            id={meetup._id}
            image={meetup.image}
            title={meetup.title}
            address={meetup.address}
            description={meetup.description}
            fav={meetup.fav}
            onDeleteMeetup={props.onDeleteMeetup}
            onDelete={props.onDelete}
          />
        );
      })}
    </ul>
  );
}

export default MeetupList;
