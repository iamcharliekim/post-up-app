import React from "react";
import Context from '../Context/Context'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class DateTimePicker extends React.Component {
  static contextType = Context

  state = {
    startDate: new Date()
  }

  componentDidMount(){
    if (this.props.edit){
      let game = this.context.games.find(game => game.id === this.props.edit)
      this.setState({startDate: new Date(game.game_date)})
    }
  }

  handleChange = date => {
    this.setState({startDate: date})

    let time = new Date(date).toTimeString().split(' ')[0]

    this.props.gameDateHandler(date)
    this.props.gameTimeHandler(time)
  };

  render() {
    return (
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                showTimeSelect
                id="date-picker"
            />
    );
  }
}