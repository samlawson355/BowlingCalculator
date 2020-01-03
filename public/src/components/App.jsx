import React from "react";
import Frames from "./Frames.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: null,
      currentScore: null
    };
    this.scoreTrack = this.scoreTrack.bind(this);
  }

  scoreTrack(e) {
    return this.state.history
      ? (() => {
          let arr = this.state.history;
          arr.push(e);
          this.setState({
            history: arr
          });
        })()
      : this.setState({
          history: [e]
        });
  }

  render() {
    return this.state.history && this.state.history.length === 10 ? (
      <div>Game Over</div>
    ) : (
      <div>
        <div id="scoreHolder">
          <Frames />
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
