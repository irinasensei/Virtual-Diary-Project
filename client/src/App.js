import React from "react";
import "./App.css";
import MyCalendar from "./calendar.js";
import "react-calendar/dist/Calendar.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      text: "",
      date: "",
      information: [],
      input: "",
      id: 0,
    };
  }

  //show my list in the div in the top
  componentDidMount() {
    this.getInformation();
  }

  getInformation = () => {
    fetch(`/diary`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ information: response });

        /*this.setState({
          information: response.map((each) => {
            each.date = new Date(each.date)
            .toDateString();
            
            return each;
          }),
          
        });
        */
      });
  };

  handleInput = (event) => {
    this.setState({
      input: event.target.value,
      showError: false,
    });
  };

  dateAgost = (event) => {
    this.setState({
      date: event.target.value,
    });
  };

  addDay() {
    if (
      this.state.input === "" ||
      this.state.input === undefined ||
      this.state.date === "" ||
      this.state.date === undefined
    ) {
      this.setState({ showError: true });
    } else {
      this.setState({ showError: false });

      fetch("/diary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: this.state.input, date: this.state.date }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          } else {
            return response.json();
          }
        })
        .then((myJSON) => {
          this.setState({ information: myJSON });
          this.setState({
            date: "",
            input: "",
          });
        });
    }
  }

  viewText(value, id = 0) {
    this.setState({ text: value, id: id });
  }

  clickOnDate(v, e) {
    let clickDate = v.toISOString().substr(0, 10);
    //this.setState({date:v});
    let item = this.state.information.find(
      (i) => i.date.substr(0, 10) === clickDate
    );
    //console.log(item);
    //console.log(clickDate);
    if (item) {
      this.viewText(item.text, item.id);
    } else {
      this.viewText("No entry found for this date");
    }
    //console.log(v.toISOString().substr(0, 10));
    //console.log(this.state.information[0].date.substr(0, 10));
  }

  deleteDate(id) {
    const { text } = this.state;
    //const record = text.find((e) => e.id === id);

    fetch(`/diary/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then((myJSON) => {
        this.setState({ information: myJSON });
        this.setState({
          date: "",
          input: "",
          id: 0,
        });
      });
    this.viewText("No entry found for this date");
  }

  render() {
    const { text, date, information } = this.state;
    return (
      <div className="App p-4">
        <h2>MY VIRTUAL DIARY PROJECT</h2>
        <div className="container" id="outercontainer">
          <div className="container col-5" id="inputarea">
            <textarea
              type="text"
              value={this.state.input}
              onChange={this.handleInput}
              placeholder="How was your day?.."
              maxLength="500"
              className="form-control"
              name="input"
            ></textarea>
            <div style={{ fontSize: 10, color: "red" }}>
              {this.state.textError}
            </div>
            <input type="date" value={date} onChange={this.dateAgost} />

            {this.state.showError ? (
              <div className="text-danger">
                <i>All inputs are required</i>
              </div>
            ) : (
              <div></div>
            )}
            <br></br>
            <button onClick={(e) => this.addDay()} className="btn btn-lg p-3">
              <b>Add this record to my diary!</b>
            </button>
            <br></br>
          </div>

          <div className="container col-6" id="outputarea">
            <p id="subtitle"> View past records</p>
            <div className="container col-9">
              <MyCalendar clickOnDate={(v, e) => this.clickOnDate(v, e)} />
            </div>

            <div
              className="container"
              id="displaypastrecord"
              key={this.state.information}
            >
              {text}
              <button
                className="btn btn-lg"
                id="binbutton"
                onClick={() => this.deleteDate(this.state.id)}
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
