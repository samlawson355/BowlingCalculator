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
      lastIsStrike: false,
      spare: false
    };
    this.scoreTrack = this.scoreTrack.bind(this);
    this.pinUpdate = this.pinUpdate.bind(this);
    this.getScore = this.getScore.bind(this);
    this.reset = this.reset.bind(this);
    this.spareReset = this.spareReset.bind(this);
    this.prevFrameChange = this.prevFrameChange.bind(this);
    this.prevFrameChange2 = this.prevFrameChange2.bind(this);
  }

  scoreTrack(e) {
    return +e !== 10
      ? this.state.currentFrame
        ? (() => {
            let tempCurrentFrame = this.state.currentFrame;
            tempCurrentFrame.push(+e);
            let tempHistory = this.state.history;
            tempHistory.push(tempCurrentFrame);

            if (this.state.spare) {
              if (
                tempCurrentFrame[1] &&
                tempCurrentFrame[0] + tempCurrentFrame[1] === 20
              ) {
                this.setState({
                  spare: true
                });
              }
            } else {
              if (
                tempCurrentFrame[1] &&
                tempCurrentFrame[0] + tempCurrentFrame[1] === 10
              ) {
                this.setState({
                  spare: true
                });
              }
            }

            this.setState({
              history: tempHistory,
              currentFrame: null,
              frameNum: this.state.frameNum + 1,
              lastIsStrike: false
            });
          })()
        : (() => {
            this.setState({
              currentFrame: [+e]
            });
          })()
      : (() => {
          let tempHistory = this.state.history;
          tempHistory.push([+e]);
          this.setState({
            history: tempHistory,
            midFrame: false,
            availPins: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            currentFrame: null,
            frameNum: this.state.frameNum + 1,
            lastIsStrike: true
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

  prevFrameChange2(e) {
    let arr = this.state.history;
    let frame = this.state.frameNum;
    arr[frame - 2][1] = +arr[frame - 2][1];
    arr[frame - 2][1] += +e;
    this.setState({
      history: arr
    });
  }

  // strikeReset() {
  //   this.setState({
  //     lastIsStrike: false
  //   });
  // }

  spareReset() {
    this.setState({
      spare: false
    });
  }

  reset() {
    this.setState({
      history: [],
      spare: false,
      lastIsStrike: false,
      frameNum: 1
    });
  }

  render() {
    return (
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
        <div id="belowScoreBoard">
          {this.state.history && this.state.history.length === 10 ? (
            <div id="gameOver">
              <div>{`Game over. Your score: ${this.getScore()}`}</div>
              <div>
                <button onClick={this.reset}>Play again?</button>
              </div>
            </div>
          ) : (
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
                  prevFrameChange2={this.prevFrameChange2}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
