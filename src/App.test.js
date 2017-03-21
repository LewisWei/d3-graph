import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as d3 from "d3";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

it('lineScale API', () => {
    let linearScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, 500])
        .clamp(true);

    expect(linearScale(0)).toBe(0);
    expect(linearScale(50)).toBe(250);
    expect(linearScale(100)).toBe(500);

    // overflow
    expect(linearScale(105)).toBe(500);

    // invert
    expect(linearScale.invert(250)).toBe(50);
});

it('TimeScale API', () => {
    let timeScale = d3.scaleTime()
        .domain([new Date(2017, 0, 1), new Date(2017, 11, 30)])
        .range([0, 100]);

    let p = d3.precisionRound(0.01, 1.01),
        f = d3.format("." + p + "r");

    expect(f(timeScale(new Date(2017, 6, 1)), 1)).toBe("49.9");
});

it('QuantileScale API', () => {
    let quantileScale = d3.scaleQuantile()
        .domain([0, 100])
        .range(["black", "white", "red", "green"]);

    expect(quantileScale(0)).toBe("black");
    expect(quantileScale(25)).toBe("white");
    expect(quantileScale(50)).toBe("red");
    expect(quantileScale(75)).toBe("green");

    expect(quantileScale.invertExtent("white")[0]).toBe(25);
    expect(quantileScale.invertExtent("white")[1]).toBe(50);
});

it('OrdinalScale API', () => {
    let ordinalScale = d3.scaleOrdinal()
        .domain(["lowest", "medium", "highest"])
        .range(["black", "grey", "red"]);

    expect(ordinalScale("lowest")).toBe("black");
    expect(ordinalScale("medium")).toBe("grey");
    expect(ordinalScale("highest")).toBe("red");
});