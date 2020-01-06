import React from "react";

class Pin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <button
        value={this.props.pinNum}
        onClick={() => {
          this.props.pinUpdate(event.target.value);

          this.props.spare && !this.props.currentFrame
            ? (() => {
                this.props.spareReset();
                this.props.prevFrameChange(event.target.value);
                this.props.scoreTrack(event.target.value);
              })()
            : this.props.scoreTrack(event.target.value);
        }}
      >
        {`${this.props.pinNum} ${this.props.pinNum === 1 ? "pin" : "pins"}`}
      </button>
    );
  }
}

export default Pin;
