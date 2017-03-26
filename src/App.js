import React, {Component} from "react";
import "./App.css";
import * as d3 from "d3";
import d3Utils from "./d3.utils.js";

class App extends Component {
    constructor() {
        super();
        this.state = {
            data: require("./json/ScatterPlot.data.json")
        }
    }

    componentDidMount() {
        let margin = {top: 20, bottom: 20, left: 40, right: 20};
        let width = 425 - margin.left - margin.right;
        let height = 625 - margin.top - margin.bottom;

        let container = d3.select('.chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        let yScale = d3.scaleLinear()
            .domain(d3.extent(this.state.data, d => d.expectancy))
            .range([height, 0])
            .nice();

        let yAxis = d3.axisLeft(yScale);
        container.call(yAxis);

        let xScale = d3.scaleLinear()
            .domain(d3.extent(this.state.data, d => d.cost))
            .range([0, width])
            .nice();

        let xAxis = d3.axisBottom(xScale);

        container.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(xAxis);

        let circleContainers = container
            .selectAll('.ball')
            .data(this.state.data)
            .enter()
            .append('g')
            .attr('class', 'ball')
            .attr('transform', d => `translate(${xScale(d.cost)},${yScale(d.expectancy)})`);


        let rScale = d3.scaleSqrt()
            .domain([0, d3.max(this.state.data, d => d.population)])
            .range([0, 40]);

        circleContainers.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', d => rScale(d.population))
            .call(d3Utils.fill, 'green')
            .call(d3Utils.opacity, 0.5);

        circleContainers.append('text')
            .attr('y', 4)
            .call(d3Utils.textAnchor, 'middle')
            .call(d3Utils.fill, 'black')
            .text(d => d.code);
    }

    render() {
        return <div className="chart">

        </div>
    }
}

class BarChart extends Component {

    constructor() {
        super();
        this.state = {
            scores: [
                {score: 63, subject: 'Mathematics'},
                {score: 82, subject: 'Geography'},
                {score: 74, subject: 'Spelling'},
                {score: 97, subject: 'Reading'},
                {score: 52, subject: 'Science'},
                {score: 74, subject: 'Chemistry'},
                {score: 97, subject: 'Physics'},
                {score: 52, subject: 'ASL'}
            ]
        }
    }


    componentDidMount() {
        let margin = {left: 30, right: 20, top: 20, bottom: 60};
        let width = 425 - margin.left - margin.right;
        let height = 625 - margin.top - margin.bottom;

        let container = d3.select('.responsive-chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .call(responsivefy)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        let yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]);

        let yAxis = d3.axisLeft(yScale)
            .ticks(5)
            .tickSize(4);
        container.call(yAxis);

        let xScale = d3.scaleBand()
            .padding(0.2)
            .domain(this.state.scores.map(d => d.subject))
            .range([0, width]);

        let xAxis = d3.axisBottom(xScale)
            .ticks(5)
            .tickSize(10)
            .tickPadding(5);

        container.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(xAxis)
            .selectAll('text')
            .call(d3Utils.textAnchor, 'end')
            .attr('transform', 'rotate(-45)');

        container.selectAll('rect')
            .data(this.state.scores)
            .enter()
            .append('rect')
            .call(d3Utils.fill, 'lightGreen')
            .call(d3Utils.borderColor, 'black')
            .attr('x', d => xScale(d.subject))
            .attr('y', d => yScale(d.score))
            .attr('width', d => xScale.bandwidth())
            .attr('height', d => height - yScale(d.score))
            .on('mouseover', function (d, i, elements) {
                d3.select(this)
                    .call(d3Utils.fill, 'orange');
            })
            .on('mouseout', function (d, i, elements) {
                d3.select(this)
                    .call(d3Utils.fill, 'lightGreen');
            });


        function responsivefy(svg) {
            // get container + svg aspect ratio
            let container = d3.select(svg.node().parentNode),
                width = parseInt(svg.style("width")),
                height = parseInt(svg.style("height")),
                aspect = width / height;

            // add viewBox and preserveAspectRatio properties,
            // and call resize so that svg resizes on inital page load
            svg.attr("viewBox", `0 0 ${width} ${height}`)
                .attr("preserveAspectRatio", "xMinYMid")
                .call(resize);

            // to register multiple listeners for same event type,
            // you need to add namespace, i.e., 'click.foo'
            // necessary if you call invoke this function for multiple svgs
            // api docs: https://github.com/mbostock/d3/wiki/Selections#on
            d3.select(window).on(`resize.${container.attr("id")}`, resize);

            // get width of container and resize svg to fit it
            function resize() {
                let targetWidth = parseInt(container.style("width"));
                svg.attr("width", targetWidth);
                svg.attr("height", Math.round(targetWidth / aspect));
            }
        }
    }

    render() {
        return (
            <div className="responsive-chart">
            </div>
        )
    }
}

class ResponsiveChart extends Component {

    componentDidMount() {
        let margin = {left: 30, right: 20, top: 20, bottom: 40};
        let width = 425 - margin.left - margin.right;
        let height = 625 - margin.top - margin.bottom;

        let container = d3.select('.responsive-chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .call(responsivefy)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        container.append('rect')
            .attr('width', width)
            .attr('height', height)
            .call(d3Utils.fill, 'lightGreen')
            .call(d3Utils.borderColor, 'black');

        let yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]);

        let yAxis = d3.axisLeft(yScale)
            .ticks(5)
            .tickSize(4);
        container.call(yAxis);


        let xScale = d3.scaleTime()
            .domain([new Date(2017, 0, 1), new Date(2017, 0, 15)])
            .range([0, width]);

        let xAxis = d3.axisBottom(xScale)
            .ticks(5)
            .tickSize(10)
            .tickPadding(5);

        container.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(xAxis);

        function responsivefy(svg) {
            // get container + svg aspect ratio
            let container = d3.select(svg.node().parentNode),
                width = parseInt(svg.style("width")),
                height = parseInt(svg.style("height")),
                aspect = width / height;

            // add viewBox and preserveAspectRatio properties,
            // and call resize so that svg resizes on inital page load
            svg.attr("viewBox", `0 0 ${width} ${height}`)
                .attr("preserveAspectRatio", "xMinYMid")
                .call(resize);

            // to register multiple listeners for same event type,
            // you need to add namespace, i.e., 'click.foo'
            // necessary if you call invoke this function for multiple svgs
            // api docs: https://github.com/mbostock/d3/wiki/Selections#on
            d3.select(window).on(`resize.${container.attr("id")}`, resize);

            // get width of container and resize svg to fit it
            function resize() {
                let targetWidth = parseInt(container.style("width"));
                svg.attr("width", targetWidth);
                svg.attr("height", Math.round(targetWidth / aspect));
            }
        }
    }

    render() {
        return (
            <div className="responsive-chart">
            </div>
        )
    }
}

class Axis extends Component {

    componentDidMount() {
        let margin = {left: 30, right: 20, top: 20, bottom: 40};
        let width = 425 - margin.left - margin.right;
        let height = 625 - margin.top - margin.bottom;

        let container = d3.select('.chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        container.append('rect')
            .attr('width', width)
            .attr('height', height)
            .call(d3Utils.fill, 'lightGreen')
            .call(d3Utils.borderColor, 'black');

        let yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]);

        let yAxis = d3.axisLeft(yScale)
            .ticks(5)
            .tickSize(4);
        container.call(yAxis);


        let xScale = d3.scaleTime()
            .domain([new Date(2017, 0, 1), new Date(2017, 0, 15)])
            .range([0, width]);

        let xAxis = d3.axisBottom(xScale)
            .ticks(5)
            .tickSize(10)
            .tickPadding(5);

        container.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(xAxis);
    }

    render() {
        return (
            <div className="chart">
            </div>
        )
    }
}

class MarginConvention extends Component {

    componentDidMount() {
        // Margin Convention in d3
        let margin = {top: 10, right: 20, bottom: 10, left: 20};
        let width = 425 - margin.left - margin.right;
        let height = 625 - margin.top - margin.bottom;

        let container = d3.select('.chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        container.append('rect')
            .attr('width', width / 2)
            .attr('height', height)
            .call(d3Utils.borderColor, 'black')
            .call(d3Utils.fill, 'lightGreen');

        container.append('rect')
            .attr('x', width / 2)
            .attr('width', width / 2)
            .attr('height', height)
            .call(d3Utils.borderColor, 'black')
            .call(d3Utils.fill, 'lightGreen');

    }

    render() {
        return <div className="chart">

        </div>
    }
}

class SimperBarChart extends Component {
    constructor() {
        super();
        this.state = {
            scores: [
                {name: 'Alice', score: 96},
                {name: 'Billy', score: 83},
                {name: 'Cindy', score: 92},
                {name: 'David', score: 70},
                {name: 'Emily', score: 96}
            ]
        }
    }

    componentDidMount() {
        // initialize svg tag
        let update = d3.select('.chart')
            .append('svg')
            .attr('width', 300)
            .attr('height', 400)
            .selectAll('g')
            .data(this.state.scores);

        // add bar containers
        let barContainers = update.enter()
            .append('g')
            .attr('transform', (d, i) => 'translate(0,' + i * 35 + ')');

        // add rect
        barContainers.append('rect')
            .attr('width', d => d.score)
            .attr('class', 'bar')
            // basic interactivity
            .on('mouseover', function (d, i, elements) {
                d3.select(this)
                    .call(d3Utils.scaleX, 2)
                    .call(d3Utils.fill, 'orange');

                d3.selectAll(elements)
                    .filter(':not(:hover)')
                    .call(d3Utils.opacity, 0.5);
            })
            .on('mouseout', function (d, i, elements) {
                d3.select(this)
                    .call(d3Utils.scaleX, 1)
                    .call(d3Utils.fill, 'lightGreen');

                d3.selectAll(elements)
                    .call(d3Utils.opacity, 1);
            });

        // add text
        barContainers.append('text')
            .attr('y', 20)
            .text(d => d.name)
            .call(d3Utils.removePointerEvents);

        update.exit().remove();
    }

    render() {
        return (
            <div className="chart">
            </div>
        )
    }
}

class D3WithDOM extends Component {
    constructor() {
        super();
        this.state = {
            scores: [
                {name: 'Alice', score: 96},
                {name: 'Billy', score: 83},
                {name: 'Cindy', score: 92},
                {name: 'David', score: 70},
                {name: 'Emily', score: 96}
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