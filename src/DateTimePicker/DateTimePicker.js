import React from "react";
import DatePicker from "react-datepicker";
import Context from "../Context/Context";
import styles from "./DateTimePicker.module.css";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-datepicker/dist/react-datepicker.css";

export default class DateTimePicker extends React.Component {
  static contextType = Context;

  state = {
    startDate: new Date(),
  };

  componentDidMount() {
    if (this.props.edit) {
      let game = this.context.games.find(game => game.id === this.props.edit);
      this.setState({ startDate: new Date(game.game_date) });
    }
  }

  handleChange = date => {
    this.setState({ startDate: date });

    let time = new Date(date).toTimeString().split(" ")[0];

    this.props.gameDateHandler(date);
    this.props.gameTimeHandler(time);
  };

  render() {
    return (
      <div className={styles["date-picker-wrapper"]}>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          showTimeSelect
          id="date-picker"
        />
        <FontAwesomeIcon icon={faCaretDown} className={styles["icon"]} />
      </div>
    );
  }
}
