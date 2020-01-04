import React from "react";

const Frames = props => (
  <div>
    {`Frame ${props.frameNum + 1}: ${props.frame[0]} and ${
      props.frame[1] || props.frame[1] === 0 ? props.frame[1] : "iiiiii"
    }`}
  </div>
);

export default Frames;
