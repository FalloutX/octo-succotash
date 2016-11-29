import React from 'react';
import Select from 'react-select';
import { DateRangePicker } from 'react-dates';
import 'react-select/dist/react-select.css';
import 'react-dates/lib/css/_datepicker.css';

const { func, array, arrayOf, object, string } = React.PropTypes;

const StocksForm = (props) => (
  <div className="stocks-form">
    <Select multi
      value={props.selectedSymbols}
      name="symbols-select"
      options={props.givenSymbols}
      onChange={props.onSymbolsChange}
      />
    <DateRangePicker
      startDate={props.datePickerStartDate}
      endDate={props.datePickerEndDate}
      focusedInput={props.datePickerFocusedInput}
      onDatesChange={props.onDatePickerDatesChange}
      onFocusChange={props.onDatePickerFocusChange}
      isOutsideRange={props.isDatePickerOutsideRange}
      />
    <div className="submit-btn-wrapper">
      <button className="submit-btn" onClick={props.onSubmitClick}>Submit</button>
    </div>
  </div>
);

StocksForm.propTypes = {
  selectedSymbols: array,
  givenSymbols: arrayOf(object),
  onSymbolsChange: func,
  datePickerStartDate: object,
  datePickerEndDate: object,
  datePickerFocusedInput: string,
  onDatePickerDatesChange: func,
  onDatePickerFocusChange: func,
  onSubmitClick: func,
  isDatePickerOutsideRange: func
};


export { StocksForm as default };
