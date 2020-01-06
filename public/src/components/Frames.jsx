import React from "react";

const Frames = props => (
  <div>
    {props.frame.length === 2
      ? `Frame ${props.frameNum + 1}: ${props.frame[0]} and ${props.frame[1]}`
      : props.frame.length === 3
      ? `Frame ${props.frameNum + 1}: ${props.frame[0]} and ${
          props.frame[1]
        } and ${props.frame[2]}`
      : `Frame ${props.frameNum + 1}: ${props.frame[0]}`}
  </div>
);

export default Frames;
