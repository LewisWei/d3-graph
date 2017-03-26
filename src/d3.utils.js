/**
 *  utils
 */

let d3Utils = {
    scaleX: scaleX,
    fill, fill,
    opacity: opacity,
    removePointerEvents: removePointerEvents,
    borderColor: borderColor,
    textAnchor: textAnchor
};

function scaleX(selection, scale) {
    selection.style('transform', 'scaleX(' + scale + ")");
}

function fill(selection, color) {
    selection.style('fill', color);
}

function opacity(selection, opacity) {
    selection.style('fill-opacity', opacity);
}

function removePointerEvents(selection) {
    selection.style('pointer-events', 'none');
}

function borderColor(selection, color) {
    selection.style('stroke', color);
}

function textAnchor(selection, anchor) {
    selection.style('text-anchor', anchor);
}

export default d3Utils;