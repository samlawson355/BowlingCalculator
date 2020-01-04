import React from "react";

const Pin = props => (
  <button
    value={props.pinNum}
    onClick={() => {
      props.pinUpdate(event.target.value);
      props.scoreTrack(event.target.value);
      props.spare
        ? (() => {
            // props.spareReset();
            props.scoreTrack(+event.target.value + 10);
          })()
        : null;
    }}
  >
    {`${props.pinNum} ${props.pinNum === 1 ? "pin" : "pins"}`}
  </button>
);

export default Pin;
