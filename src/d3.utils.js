/**
 *  utils
 */

let d3Utils = {
    scaleX: scaleX,
    fill, fill,
    fade: fade,
    removePointerEvents: removePointerEvents,
    borderColor: borderColor
};

function scaleX(selection, scale) {
    selection.style('transform', 'scaleX(' + scale + ")");
}

function fill(selection, color) {
    selection.style('fill', color);
}

function fade(selection, opacity) {
    selection.style('fill-opacity', opacity);
}

function removePointerEvents(selection) {
    selection.style('pointer-events', 'none');
}

function borderColor(selection, color) {
    selection.style('stroke', color);
}

export default d3Utils;