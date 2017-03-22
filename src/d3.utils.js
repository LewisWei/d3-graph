/**
 *  utils
 */

let d3Utils = {
    scaleX: scaleX,
    fill, fill,
    fade: fade,
    removePointerEvents: removePointerEvents
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
    selection.style('pointer-events', 'none')
}

export default d3Utils;