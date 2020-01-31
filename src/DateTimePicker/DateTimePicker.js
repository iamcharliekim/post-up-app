import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import styles from './DateTimePicker.module.css'


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
        <div className={styles["date-time-picker-wrapper"]}>
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                showTimeSelect
            />
      </div>
    );
  }
}