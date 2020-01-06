import React from "react";

const Frames = props => (
  <div>
    {props.history[props.history.length - 1].length === 3
      ? console.log("three length")
      : null}

    {!props.frame[1] && props.frame[0] === 10
      ? `Frame ${props.frameNum + 1}: ${props.frame[0]}`
      : `Frame ${props.frameNum + 1}: ${props.frame[0]}${
          props.frame[1] !== undefined ? ` and ${props.frame[1]}` : ""
        }`}
  </div>
);

export default Frames;
