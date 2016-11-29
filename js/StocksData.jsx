import React from 'react';

const { arrayOf, object } = React.PropTypes;

const StocksData = React.createClass({
  propTypes: {
    stocksData: arrayOf(object)
  },
  render () {
    let stocks = this.props.stocksData.map((stock, i) => (
      <tr key={i}>
        <td>{stock.symbol}</td>
        <td>{stock.RSubPast.toFixed(5)}</td>
        <td>{stock.RSubFuture.toFixed(5)}</td>
      </tr>
    ));
    return (
      <div className="stocks-data">
        <table className="data-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>R<sub><sub>Past</sub></sub></th>
              <th>R<sub><sub>Future</sub></sub></th>
            </tr>
          </thead>
          <tbody>
            {stocks}
          </tbody>
        </table>
      </div>
    );
  }
});

export { StocksData as default };
