/* global console */
import React from 'react';
import StocksForm from './StocksForm';
import StocksData from './StocksData';
import axios from 'axios';
import moment from 'moment';

const AppRoot = React.createClass({
  getInitialState () {
    return {
      givenSymbols: [
        { value: "CUMMINSIND", label: "CUMMINSIND" },
        { value: "ABB", label: "ABB" },
        { value: "BEL", label: "BEL" },
        { value: "CONCOR", label: "CONCOR" },
        { value: "DLF", label: "DLF" },
        { value: "GLAXO", label: "GLAXO" },
        { value: "HAVELLS", label: "HAVELLS" },
        { value: "INDIGO", label: "INDIGO" },
        { value: "OFSS", label: "OFSS" }
      ],
      selectedSymbols: [],
      datePickerFocusedInput: undefined,
      datePickerStartDate: undefined,
      datePickerEndDate: undefined,
      rawStocksData: [],
      processedStocksData: []
    };
  },
  handleSymbolsChange (val) {
    this.setState({ selectedSymbols: val });
  },
  handleFocusChange (focusedInput) {
    this.setState({ datePickerFocusedInput: focusedInput });
  },
  handleDatesChange ({ startDate, endDate }) {
    this.setState({
      datePickerStartDate: startDate,
      datePickerEndDate: endDate
    });
  },
  processStocksData () {
    let processedStocksData = [];
    let rawStocksData = this.state.rawStocksData;

    rawStocksData.forEach((stock) => {
      console.log(stock);
      const midLength = Math.ceil(stock.data.length / 2);
      const part1 = stock.data.slice(0, midLength);
      const part2 = stock.data.slice(midLength, stock.data.length);
      const RSubPast = Math.log(part1[part1.length - 1][5] / part1[0][5]);
      const RSubFuture = Math.log(part2[part2.length - 1][5] / part2[0][5]);

      processedStocksData.push({
        symbol: stock.dataset_code,
        RSubPast: RSubPast,
        RSubFuture: RSubFuture
      });
    });

    console.log(processedStocksData);
    this.setState({ processedStocksData: processedStocksData });
  },
  handleSubmitClick () {
    const startDate = this.state.datePickerStartDate.format('YYYY-MM-DD');
    const endDate = this.state.datePickerEndDate.format('YYYY-MM-DD');
    let stocksData = [];
    let queries = this.state.selectedSymbols.map((item) => {
      return `https://www.quandl.com/api/v3/datasets/NSE/${item.value}.json?api_key=gWf2CLShwrGUBVnqzsT4&start_date=${startDate}&end_date=${endDate}`;
    });
    const mainComponent = this;
    console.log(queries);
    queries.forEach((query) => {
      axios.get(query)
      .then((response) => {
        stocksData.push(response.data.dataset);
        if (stocksData.length === queries.length) {
          mainComponent.setState({ rawStocksData: stocksData });
          console.log(mainComponent.state.rawStocksData);
          mainComponent.processStocksData();
        }
      })
      .catch((error) => {
        console.error(error);
      });
    });
  },
  isDatePickerOutsideRange (val) {
    return (val.isBefore('2016-01-01') || val.isAfter(moment()));
  },
  render () {
    return (
      <div id="app-root-component">
        <h2>App Root Component</h2>
        <StocksForm
          givenSymbols={this.state.givenSymbols}
          selectedSymbols={this.state.selectedSymbols}
          onSymbolsChange={this.handleSymbolsChange}
          datePickerStartDate={this.state.datePickerStartDate}
          datePickerEndDate={this.state.datePickerEndDate}
          datePickerFocusedInput={this.state.datePickerFocusedInput}
          onDatePickerDatesChange={this.handleDatesChange}
          onDatePickerFocusChange={this.handleFocusChange}
          isDatePickerOutsideRange={this.isDatePickerOutsideRange}
          onSubmitClick={this.handleSubmitClick}
          />
        <StocksData stocksData={this.state.processedStocksData}/>
      </div>
    );
  }
});

export { AppRoot as default };
