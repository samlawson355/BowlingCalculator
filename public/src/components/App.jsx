import React from "react";
import Frames from "./Frames.jsx";
import Pin from "./Pin.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      availPins: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      currentFrame: null,
      frameNum: 1,
      midFrame: false,
      strike: false,
      spare: false
    };
    this.scoreTrack = this.scoreTrack.bind(this);
    this.pinUpdate = this.pinUpdate.bind(this);
    this.getScore = this.getScore.bind(this);
    this.reset = this.reset.bind(this);
    this.spareReset = this.spareReset.bind(this);
    this.prevFrameChange = this.prevFrameChange.bind(this);
  }

  scoreTrack(e) {
    return this.state.currentFrame
      ? (() => {
          let tempCurrentFrame = this.state.currentFrame;
          tempCurrentFrame.push(+e);
          let tempHistory = this.state.history;
          tempHistory.push(tempCurrentFrame);

          // check if spare
          if (this.state.spare) {
            if (tempCurrentFrame[0] + tempCurrentFrame[1] === 20) {
              this.setState({
                spare: true
              });
            }
          } else {
            if (tempCurrentFrame[0] + tempCurrentFrame[1] === 10) {
              this.setState({
                spare: true
              });
            }
          }
          this.setState({
            history: tempHistory,
            currentFrame: null,
            frameNum: this.state.frameNum + 1
          });
        })()
      : (() => {
          this.setState({
            currentFrame: [+e]
          });
        })();
  }

  pinUpdate(e) {
    return !this.state.midFrame
      ? (() => {
          let avail = [];
          for (let i = 0; i <= 10 - e; i++) {
            avail.push(i);
          }
          this.setState({
            availPins: avail,
            midFrame: true
          });
        })()
      : (() => {
          this.setState({
            availPins: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            midFrame: false
          });
        })();
  }

  getScore() {
    let arr = this.state.history.flat(Infinity);
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      total += arr[i];
    }
    return total;
  }

  prevFrameChange(e) {
    let arr = this.state.history;
    let frame = this.state.frameNum;

    arr[frame - 2][0] = +arr[frame - 2][0];
    arr[frame - 2][0] += +e;
    this.setState({
      history: arr
    });
  }

  spareReset() {
    this.setState({
      spare: false
    });
  }

  reset() {
    this.setState({
      history: [],
      spare: false,
      strike: false,
      frameNum: 1
    });
  }

  render() {
    return this.state.history && this.state.history.length === 10 ? (
      <div>
        <div>{`Game over. Your score: ${this.getScore()}`}</div>
        <div>
          <button onClick={this.reset}>Play again?</button>
        </div>
      </div>
    ) : (
      <div>
        <div id="scoreHolder">
          <div>{`Score: ${this.getScore()}`}</div>
          {this.state.history.map((frame, key) => (
            <Frames
              key={key}
              frame={frame}
              frameNum={key}
              history={this.state.history}
            />
          ))}
        </div>
        <div id="buttonHolder">
          {this.state.availPins.map(key => (
            <Pin
              key={key}
              pinNum={key}
              scoreTrack={this.scoreTrack}
              pinUpdate={this.pinUpdate}
              spare={this.state.spare}
              spareReset={this.spareReset}
              frameNum={this.state.frameNum}
              currentFrame={this.state.currentFrame}
              prevFrameChange={this.prevFrameChange}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
