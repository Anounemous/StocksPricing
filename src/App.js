import React, { Component } from 'react';
import './App.css';
import Websocket from 'react-websocket';
import moment from 'moment';



class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            tableData:{},
            updateTimes:{}
        };
    }


  componentWillMount(){
    console.log("heloo world");
  }



    handleData(data) {

        let result = JSON.parse(data);
        var obj = {};
        var objTimings = {};
        result.forEach(function(data){
            obj[data[0]] = data[1]
            objTimings[data[0]] = moment();
        });

        this.setState({tableData:Object.assign(this.state.tableData, obj)});
        this.setState({updateTimes:Object.assign(this.state.updateTimes, objTimings)});
    }


  render() {

    return (
      <div className="App">
        <div className="App-header">
            <Websocket url='ws://stocks.mnet.website'
                       onMessage={this.handleData.bind(this)}/>
        </div>
          <div style={{width:'500px', paddingLeft:'360px'}}>
          <span style={{width:'33%', padding:'30px'}}>Ticker</span>
          <span style={{width:'33%', padding:'30px'}}>Price</span>
          <span style={{width:'33%', padding:'30px'}}>Last Updated</span></div>
          {Object.keys(this.state.tableData).map((eachJob, index) => (
              <p style={{padding:'30px'}}>{eachJob + "  " + this.state.tableData[eachJob] + "    " + moment(this.state.updateTimes[eachJob], "YYYYMMDD").fromNow()}</p>
          ))}
      </div>
    );
  }
}

export default App;
