import React from "react";

const Pin = props => (
  <button
    value={props.pinNum}
    onClick={() => {
      props.scoreTrack(event.target.value);
      props.pinUpdate(event.target.value);
    }}
  >
    {`${props.pinNum} ${props.pinNum === 1 ? "pin" : "pins"}`}
  </button>
);

export default Pin;
