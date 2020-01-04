import React from "react";

const Pin = props => (
  <button
    value={props.pinNum}
    onClick={() => {
      props.pinUpdate(event.target.value);
      // TODO: implement strike functionality
      props.spare && !props.currentFrame
        ? (() => {
            props.spareReset();
            props.prevFrameChange(event.target.value);
            props.scoreTrack(event.target.value);
          })()
        : props.scoreTrack(event.target.value);
    }}
  >
    {`${props.pinNum} ${props.pinNum === 1 ? "pin" : "pins"}`}
  </button>
);

export default Pin;
