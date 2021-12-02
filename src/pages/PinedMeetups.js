import { useContext, useState, useEffect } from "react";
import PinContext from "../store/pin-context";
import MeetupList from "../components/meetups/MeetupList";

const PinedMeetups = () => {
  const pinCtx = useContext(PinContext);
  const [totalPined, setTotalPined] = useState(pinCtx.totalPined);

  useEffect(() => {
    setTotalPined(pinCtx.totalPined);
  }, [pinCtx.totalPined]);

  let context;
  if (totalPined === 0 || pinCtx.totalPined === 0) {
    context = `No Pined meetup yet. Start adding some?`;
  } else {
    context = <MeetupList meetups={pinCtx.pined} />;
  }
  return (
    <section>
      <h3>My pined</h3>
      {<p>{context}</p>}
    </section>
  );
};

export default PinedMeetups;
