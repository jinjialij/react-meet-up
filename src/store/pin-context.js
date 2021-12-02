import React from "react";

const PinContext = React.createContext({
  pined: [],
  totalPined: 0,
  pinMeetup: () => {},
  removePin: () => {},
  isPined: () => {},
});

export default PinContext;
