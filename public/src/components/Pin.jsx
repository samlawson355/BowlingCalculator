import React from "react";

class Pin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastIsStrike: false
    };
  }

  render() {
    return (
      <button
        value={this.props.pinNum}
        onClick={() => {
          this.props.pinUpdate(event.target.value);
          // TODO: implement strike functionality
          // this.state.lastIsStrike
          //   ? (() => {
          //       console.log("awleifhu");
          //       this.props.prevFrameChange2(event.target.value);
          //       this.setState({
          //         lastIsStrike: false
          //       });
          //     })()
          //   : null;

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
