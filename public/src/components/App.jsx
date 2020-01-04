import React from "react";
import Frames from "./Frames.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      currentScore: null,
      currentFrame: null
    };
    this.scoreTrack = this.scoreTrack.bind(this);
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

  render() {
    return this.state.history && this.state.history.length === 10 ? (
      <div>Game Over</div>
    ) : (
      <div>
        <div id="scoreHolder">
          {this.state.history.map((frame, key) => (
            <Frames
              frame={frame}
              key={key}
              frameNum={key}
              currentScore={this.state.currentScore}
              history={this.state.history}
            />
          ))}
        </div>
        <div id="buttonHolder">
          <button value="1" onClick={() => this.scoreTrack(event.target.value)}>
            1
          </button>
          <button value="2" onClick={() => this.scoreTrack(event.target.value)}>
            2
          </button>
          <button value="3" onClick={() => this.scoreTrack(event.target.value)}>
            3
          </button>
          <button value="4" onClick={() => this.scoreTrack(event.target.value)}>
            4
          </button>
          <button value="5" onClick={() => this.scoreTrack(event.target.value)}>
            5
          </button>
          <button value="6" onClick={() => this.scoreTrack(event.target.value)}>
            6
          </button>
          <button value="7" onClick={() => this.scoreTrack(event.target.value)}>
            7
          </button>
          <button value="8" onClick={() => this.scoreTrack(event.target.value)}>
            8
          </button>
          <button value="9" onClick={() => this.scoreTrack(event.target.value)}>
            9
          </button>
          <button
            value="10"
            onClick={() => this.scoreTrack(event.target.value)}
          >
            10
          </button>
        </div>
      </div>
    );
  }
}

export default App;
