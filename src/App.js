import React, {Component} from 'react';
import './App.css';
import * as d3 from 'd3';


class App extends Component {
    constructor() {
        super();
        this.state = {
            scores: [
                {name: 'Alice', score: 96},
                {name: 'Billy', score: 83},
                {name: 'Cindy', score: 92},
                {name: 'David', score: 70},
                {name: 'Emily', score: 96},
            ]
        }
    }

    componentDidMount() {
        // modify the updating nodes
        let update = d3.select('.chart')
            .selectAll('div')
            .data(this.state.scores, function (d) {
                return d ? d.name : this.innerHTML;
            })
            .style('color', 'red');

        // add the entering nodes
        let enter = update.enter()
            .append('div')
            .text(function (d) {
                return d.name;
            })
            .style('color', 'green');

        // remove the exiting nodes
        update.exit().remove();

        // merge the updating nodes and the entering nodes
        update.merge(enter)
            .style('width', d => d.score * 2 + "px")
            .style('font-size', '24px')
            .style('border', '1px solid black')
            .style('height', '50px')
            .style('background', 'lightYellow')

    }

    render() {
        return (
            <div className="chart">
                <div>Alice</div>
                <div>Billy</div>
                <div>Clarey</div>
            </div>
        )
    }
}

class D3SelectionAndModifyAndRemove extends Component {

    componentDidMount() {
        // d3 selection
        let firstLink = d3.select("a");
        let allLinks = d3.selectAll("a");
        let div = d3.select("div div");
        let divLinks = div.selectAll("a");

        console.log(firstLink.nodes());
        console.log(allLinks.nodes());
        console.log(div.nodes());
        console.log(divLinks.nodes());

        // d3 modify element
        d3.select("a")
            .attr("href", "http://google.com")
            .text("Google")
            .html("Google <br>")
            .style("color", "red")
            .classed("active", true);

        // d3 create new element
        d3.select("div")
            .append("a")
            .attr("href", "http://baidu.com")
            .text("new link")
            .insert("button", "a:first-child")
            .text("button")
            .style("display", "block");

        // d3 remove element
        d3.select("button").remove();
    }

    render() {
        return (
            <div>
                <div className="container">
                    <a href="#">About</a>
                    <a href="#">Products</a>
                    <a href="#">Contact</a>
                </div>
                <a href="#" className="active">active-link</a>
            </div>
        );
    }
}

export default App;
