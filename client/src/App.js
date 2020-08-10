import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      showError: false,
      text: "",
      date: "",
      information: []
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
      text: event.target.value,
      showError: false
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
    
    if(this.state.text === "" || this.state.text === undefined || this.state.date === "" || this.state.date === undefined) {
      this.setState({ showError: true})
    }
    else {
      this.setState({ showError: false})

      fetch("/diary", {
        method: "POST",
        headers: {"Content-Type": "application/json" }, 
        body: JSON.stringify({ text: this.state.text, date: this.state.date })
      }) .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then(myJSON => {
        this.setState({information: myJSON});
         this.setState({
            date: "",
            text: ""
        });
      })
    }
  };

  viewText(value) {
    this.setState({text: value})
  }

  deleteDate(id){
    fetch(`/diary/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        return response.json();
      }
    })
    .then(myJSON => {
      console.log(myJSON);
      this.setState({information: myJSON});
    })
    
  };


 render () {
   const { text, date, information } = this.state;
  return (
    <div className="App">

        <h2>MY VIRTUAL DIARY PROJECT</h2>
       
        <div>{text}</div> <br></br><br></br>
       <div>
        <input 
        type="text" 
        value={text} 
        onChange={this.handleInput} 
        placeholder="How was your day?.."
        maxLength="500"
        /> <br></br><br></br>
    
        <div style={{ fontSize: 10, color: "red"}}>
          {this.state.textError}          
        </div>
        <input 
        type="text" 
        value={date} 
        onChange={this.dateAgost} 
        placeholder="00/00/0000" 
        /> <br></br><br></br>
        
        {this.state.showError ? (<div className="text-danger"><i>All inputs are required</i></div>) : (<div></div>)}<br></br>
        <button onClick={e => this.addDay()} className="btn btn-outline-secondary btn-sm "><b>SAVE IN DATABASE</b></button><br></br>
        
       </div>

      <div className="col-3">
            {information.map(each => {
              return (
                <div key={each.id} >
                  <button onClick={() => this.viewText(each.text)} className="btn btn-outline-secondary btn-sm float-left ">
                    {each.date}
                  </button>
                  <button onClick={() => this.deleteDate(each.id)} className="btn">delete
                  </button>
                </div>
              );
            })}
      </div>
      </div>
       

  );
 };
};


export default App;
