import React, {Component} from 'react';
import './App.css';
import * as d3 from 'd3';

class App extends Component {

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
