import React from "react";
import Frames from "./Frames.jsx";
import Pin from "./Pin.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      availPins: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      currentScore: null,
      currentFrame: null
    };
    this.scoreTrack = this.scoreTrack.bind(this);
    this.pinUpdate = this.pinUpdate.bind(this);
  }

  scoreTrack(e) {
    return this.state.currentFrame
      ? (() => {
          let tempCurrentFrame = this.state.currentFrame;
          tempCurrentFrame.push(+e);
          return this.state.history
            ? (() => {
                let tempHistory = this.state.history;
                tempHistory.push(tempCurrentFrame);
                this.setState({
                  history: tempHistory,
                  currentFrame: null
                });
              })()
            : null;
        })()
      : (() => {
          this.setState({
            currentFrame: [+e]
          });
        })();
  }

  pinUpdate(e) {}

  render() {
    return this.state.history && this.state.history.length === 10 ? (
      <div>Game Over</div>
    ) : (
      <div>
        <div id="scoreHolder">
          {this.state.history.map((frame, key) => (
            <Frames
              key={key}
              frame={frame}
              frameNum={key}
              currentScore={this.state.currentScore}
              history={this.state.history}
            />
          ))}
        </div>
        <div id="buttonHolder">
          {this.state.availPins.map(key => (
            <Pin key={key} pinNum={key} scoreTrack={this.scoreTrack} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
