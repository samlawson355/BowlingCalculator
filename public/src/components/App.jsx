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
      midFrame: false
    };
    this.scoreTrack = this.scoreTrack.bind(this);
    this.pinUpdate = this.pinUpdate.bind(this);
    this.getScore = this.getScore.bind(this);
    this.reset = this.reset.bind(this);
  }

  scoreTrack(e) {
    return this.state.currentFrame
      ? (() => {
          let tempCurrentFrame = this.state.currentFrame;
          tempCurrentFrame.push(+e);
          let tempHistory = this.state.history;
          tempHistory.push(tempCurrentFrame);
          this.setState({
            history: tempHistory,
            currentFrame: null
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

  reset() {
    this.setState({
      history: []
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
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
