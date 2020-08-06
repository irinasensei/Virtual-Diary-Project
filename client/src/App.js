import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  handleInput = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  dateAgost = (event) => {
    this.setState({
      date: event.target.value
    })
  }


  addDay(){
      fetch("/diary", {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({ text: this.state.text, date: this.state.date })
      }).then(res => res.json());
  }

 render () {
   const { text } = this.state;
   const { date } = this.state;
  return (
    <div className="App">
      <h2>MY VIRTUAL DIARY PROJECT</h2>

      <div>{text}</div> <br></br>
      <input type="text" value={text} onChange={this.handleInput} placeholder="How was your day?.." /><br></br><br></br>
      <input type="text" value={date} onChange={this.dateAgost} placeholder="00/00/0000"/><br></br><br></br>
      <button onClick={e => this.addDay()}>save in database</button><br></br>

      {/* <input placeholder="input date"></input>
      <button>Add this day</button> */}
    </div>
  );
 };
}

export default App;
