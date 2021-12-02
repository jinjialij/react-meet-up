import PinContext from "./pin-context";
import { useState } from "react";

const PinProvider = (props) => {
  const [pinedMeetups, setPinedMeetups] = useState([]);
  const pinNewMeetup = (meetup) => {
    if (!pinedMeetups.find((item) => item.id === meetup.id)) {
      setPinedMeetups((prev) => {
        return [...prev, meetup];
      });
    }
  };

  const removePin = (id) => {
    setPinedMeetups((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  const isPined = (id) => {
    if (pinedMeetups.find((item) => item.id === id)) {
      return true;
    } else {
      return false;
    }
  };

  const context = {
    pined: pinedMeetups,
    totalPined: pinedMeetups.length,
    pinMeetup: pinNewMeetup,
    removePin: removePin,
    isPined: isPined,
  };
  return (
    <PinContext.Provider value={context}>{props.children}</PinContext.Provider>
  );
};

export default PinProvider;
