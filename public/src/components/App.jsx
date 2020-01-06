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
    this.spareCheck = this.spareCheck.bind(this);
    this.lastStrikeHandle = this.lastStrikeHandle.bind(this);
    this.scoreTrackTenth = this.scoreTrackTenth.bind(this);
    this.pinUpdateTenth = this.pinUpdateTenth.bind(this);
  }

  scoreTrack(e) {
    if (this.state.frameNum === 10) {
      console.log("tenth fram");
    }

    if (this.state.lastIsStrike) {
      this.lastStrikeHandle(e);
    }

    +e !== 10
      ? this.state.currentFrame
        ? (() => {
            let tempCurrentFrame = this.state.currentFrame;
            tempCurrentFrame.push(+e);
            let tempHistory = this.state.history;
            tempHistory.push(tempCurrentFrame);
            this.spareCheck();
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

  scoreTrackTenth(e) {
    let tempHistory = this.state.history;
    if (this.state.currentFrame) {
      let tempCurrentFrame = this.state.currentFrame;

      if (tempCurrentFrame[0] + +e === 10) {
        //spare in final frame
        this.setState({
          currentFrame: [tempCurrentFrame[0], +e],
          availPins: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        });
      } else {
        tempCurrentFrame.push(+e);
        tempHistory.push(tempCurrentFrame);
        this.setState({
          history: tempHistory,
          currentFrame: tempCurrentFrame
        });
      }
    } else {
      if (+e === 10) {
        this.setState({
          availPins: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          midFrame: true,
          currentFrame: [+e]
        });
      } else {
        this.setState(
          {
            currentFrame: [+e]
          },
          () => this.pinUpdate(e)
        );
      }
    }
  }
  pinUpdateTenth(e) {
    console.log("pin10");
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

  spareCheck() {
    let tempCurrentFrame = this.state.currentFrame;
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
  }

  lastStrikeHandle(e) {
    let arr = this.state.history;
    let frame = this.state.frameNum;
    arr[frame - 2][0] += +e;
    +e === 10
      ? this.lastStrikeHandle2(e)
      : this.setState({
          history: arr
        });
  }
  lastStrikeHandle2(e) {
    let arr = this.state.history;
    let frame = this.state.frameNum;
    arr[frame - 2][1] = +e;

    this.setState({
      history: arr,
      midFrame: false,
      lastIsStrike: false,
      frameNum: this.state.frameNum
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
      lastIsStrike: false,
      frameNum: 1,
      midFrame: false,
      currentFrame: null
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
                  scoreTrackTenth={this.scoreTrackTenth}
                  pinUpdate={this.pinUpdate}
                  pinUpdateTenth={this.pinUpdateTenth}
                  spare={this.state.spare}
                  spareReset={this.spareReset}
                  frameNum={this.state.frameNum}
                  currentFrame={this.state.currentFrame}
                  prevFrameChange={this.prevFrameChange}
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
