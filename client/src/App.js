import React from "react";
import "./App.css";
import MyCalendar from "./calendar.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      text: "",
      date: "",
      information: [],
      input: "",
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

  viewText(value) {
    this.setState({ text: value });
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
      this.viewText(item.text);
    } else {
      this.viewText("No entry found for this date");
    }
    //console.log(v.toISOString().substr(0, 10));
    //console.log(this.state.information[0].date.substr(0, 10));
  }

  deleteDate(id) {
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
        });
      });
  }
  /* probably didn't use it
  function() {
    `#datetimepicker12`.datetimepicker({
      inline: true,
      sideBySide: true,
    });
  }
*/
  render() {
    const { text, date, information } = this.state;
    return (
      <div className="App" id="outercontainer">
        <div className="container" id="inputarea">
          <h2>MY VIRTUAL DIARY PROJECT</h2>
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
          <input
            type="date"
            value={date}
            onChange={this.dateAgost}
            //placeholder="00/00/0000" //removed by Irina
          />

          {this.state.showError ? (
            <div className="text-danger">
              <i>All inputs are required</i>
            </div>
          ) : (
            <div></div>
          )}
          <br></br>
          <button
            onClick={(e) => this.addDay()}
            className="btn btn-outline-secondary btn-sm "
          >
            <b>Add this record to my journal!</b>
          </button>
          <br></br>
        </div>
        <div className="container" id="pastrecords">
          <p> My past records</p>

          {information.map((each) => {
            return (
              <div key={each.id}>
                <button onClick={() => this.viewText(each.text)}>
                  {each.date}
                </button>
                <button
                  className="btn btn-lg"
                  onClick={() => this.deleteDate(each.id)}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            );
          })}
        </div>

        <MyCalendar clickOnDate={(v, e) => this.clickOnDate(v, e)} />

        <br></br>

        <div className="container bg-light">{text}</div>
      </div>
    );
  }
}
export default App;
