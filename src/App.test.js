import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as d3 from 'd3';

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