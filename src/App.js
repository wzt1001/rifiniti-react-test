// developed by ztwang
// in test for software engineer for rifiniti

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  // constructor
  constructor(props) {
    super(props);

    this.state = {
      'rows': []
    }
    this.array_transform=this.array_transform.bind(this);
  }

  // transform and reset state of the array
  array_transform(e) {
    e.preventDefault();
    var items = [];
    // temp array to store new filtered items
    var new_items = [];
    var items = document.getElementById('input_text').value.split(",");
    var temp = items[0];

    // add item new array only if it is not null and not repetitive with previous item
    for (var i = 0; i < items.length; i++) {
      if ((items[i] != items[i-1]) && (items[i].length != 0)) {new_items.push(items[i])}
    };
    var rows = this.state.rows;
    rows.push(new_items);

    // set new state
    this.setState({rows: this.state.rows.concat({'initial_array': items.toString(), 
      'processed_array': new_items.toString()})});
  }

  // bind click function to rows and re-render rows everytime state is changed
  rows(){
    function click_row(e){
      document.getElementById("input_text").value = e.target.parentNode.firstChild.innerHTML;
    }
    return this.state.rows.map(function(row,i){
          return   (<tr value={i} key={i} className='clickable-row' onClick={click_row}>
                   <td>{row.initial_array}</td>
                   <td>{row.processed_array}</td> 
                   </tr>);
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">

        <div className="cover">
          <h1>Please add any array</h1>
          <form  className="flex-form" onSubmit={this.array_transform}>
            <input type="search" id="input_text" type="text" placeholder="Type array separated by comma, e.g. '1,1,2,3,1'"></input>
            <input type="submit" value="Search"></input>
          </form>
          <div className="table-div">
            <h1>Search History (click any row to restore)</h1>
            <table>
              <tbody>
                <tr className="table-head">
                  <td>USER ARRAY</td>
                  <td>PROCESSED ARRAY</td> 
                </tr>
                {this.rows()}
              </tbody>
            </table>
          </div>
        </div>
        </header>
      </div>
    );
  }
}
export default App;
