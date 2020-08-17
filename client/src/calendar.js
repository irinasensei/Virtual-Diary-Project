import React from "react";
import Calendar from "react-calendar";

class MyCalendar extends React.Component {
  state = {
    date: new Date(),
  };
  /*
  onChange = (v, e) => {
    //this.setState({ date });
    console.log(+v);
  };
  */
  render() {
    return (
      <div>
        <Calendar
          onClickDay={(v, e) => this.props.clickOnDate(v, e)}
          value={this.state.date}
        />
      </div>
    );
  }
}

export default MyCalendar;
