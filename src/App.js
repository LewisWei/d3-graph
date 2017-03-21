import React, {Component} from 'react';
import './App.css';
import * as d3 from 'd3';

class App extends Component {
    render() {
        return (<div>
                <h2>d3 version : {d3.version}</h2>
            </div>
        );
    }
}

export default App;
