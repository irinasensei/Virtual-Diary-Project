import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: "",
      date: "",
      information: [],
    };
  }

  //mostrar mi lista en la pantalla
  componentDidMount() {
    this.getInformation();
  }

  getInformation = () => {
    fetch(`/diary`)
      .then(response => response.json())
      .then(response => {
        this.setState({ 
          information: response.map(each => { each.date = new Date(each.date).toDateString(); return each })
        });
      });
  };
  
  // ??? 
  handleInput = (event) => {
    this.setState({
      text: event.target.value
    });
  }

  //???
  dateAgost = (event) => {
    this.setState({
      date: event.target.value
    });
  }

  //adherir informacion a la base de datos
  addDay(){
      fetch("/diary", {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({ text: this.state.text, date: this.state.date })
      }).then(res => res.json());

      this.setState({
        date: "",
        text: ""
      });
  };

  viewText(value) {
    this.setState({text: value})
  }

 render () {
   const { text, date, information } = this.state;
  return (
    <div className="App">
        <h2>MY VIRTUAL DIARY PROJECT</h2>
       
        <div>{text}</div> <br></br>
       
        <input 
        type="text" 
        value={text} 
        onChange={this.handleInput} 
        placeholder="How was your day?.."
        /> <br></br><br></br>

        <input 
        type="text" 
        value={date} 
        onChange={this.dateAgost} 
        placeholder="00/00/0000" 
        /> <br></br><br></br>
        
        <button onClick={e => this.addDay()}>SAVE IN DATABASE</button><br></br>


      <div className="col-2">
            {information.map(each => {
              return (
                <div key={each.id} >
                  <button onClick={() => this.viewText(each.text)}>
                    {each.date}
                  </button>
                  {/* <i
                    onClick={() => this.deleteDate(information.id)}
                  ></i> */}
                </div>
              );
            })}
      </div>
       
    </div>
  );
 };
}

export default App;
