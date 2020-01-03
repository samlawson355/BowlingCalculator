import React from "react";
import Score from "./Score.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: null
    };
  }

  scoreCalc(e) {
    return this.state.history
      ? () => {
          let arr = this.state.history;
          arr.push(e);
          this.setState({
            history: arr
          });
        }
      : this.setState({
          history: [e]
        });
  }

  render() {
    return (
      <div>
        <div id="scoreHolder">
          <Score />
        </div>
        <div id="buttonHolder">
          <button value="1" onClick={() => this.scoreCalc(event.target.value)}>
            1
          </button>
          <button value="2" onClick={() => this.scoreCalc(event.target.value)}>
            2
          </button>
          <button value="3" onClick={() => this.scoreCalc(event.target.value)}>
            3
          </button>
          <button value="4" onClick={() => this.scoreCalc(event.target.value)}>
            4
          </button>
          <button value="5" onClick={() => this.scoreCalc(event.target.value)}>
            5
          </button>
          <button value="6" onClick={() => this.scoreCalc(event.target.value)}>
            6
          </button>
          <button value="7" onClick={() => this.scoreCalc(event.target.value)}>
            7
          </button>
          <button value="8" onClick={() => this.scoreCalc(event.target.value)}>
            8
          </button>
          <button value="9" onClick={() => this.scoreCalc(event.target.value)}>
            9
          </button>
          <button value="10" onClick={() => this.scoreCalc(event.target.value)}>
            10
          </button>
        </div>
      </div>
    );
  }
}

export default App;
