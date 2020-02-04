import React from "react";
import DatePicker from "react-datepicker";
import styles from './DateTimePicker.module.css'

import "react-datepicker/dist/react-datepicker.css";


export default class DateTimePicker extends React.Component {
  state = {
    startDate: new Date()
  };

  handleChange = date => {
    this.props.gameDateHandler(date)
    this.props.gameTimeHandler('20:00:00')
  };

  render() {
    return (
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                showTimeSelect
            />
    );
  }
}