import React from "react";

const Frames = props => (
  <div>{`Frame ${props.frameNum + 1}: ${props.frame[0]} and ${
    props.frame[1]
  }`}</div>
);

export default Frames;
