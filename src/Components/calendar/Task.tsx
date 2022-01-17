import React from "react";
import PropTypes from 'prop-types'

interface Props {
    className?: string;
    onClick?: Function;
    width_pr?: string;
    width_px?: string;
    name?: string;
    tabIndex?: number;
}

/**
 * @component
 * renders task element
 */
function Task(props: Props) {
    /**
     * @function calls props.onClick. onclick, or onkeydown if key.code='Enter'
     * @param event
     */
    function openTask(event: React.MouseEvent | React.KeyboardEvent) {
        if(props.onClick) {
            if(event.type == 'keydown') {
                if ((event as React.KeyboardEvent).code!='Enter') return
            }
            props.onClick(event);
            }}

    let className = 'task';
    if(props.className) {
        className = className + ' ' + props.className;
    }

    return(
        <div
            role='listitem'
            className={className}
            style={{width: `calc(${props.width_pr} + ${props.width_px})`}}
            onClick={(event) => openTask(event)}
            onKeyDown={(event: React.KeyboardEvent)=> openTask(event)}
            tabIndex={props.tabIndex ? props.tabIndex : 0}
            data-testid={'Task'}
        >
            {props.name? props.name : 'task'}
        </div>
    )
}

Task.propTypes = {
    /** className of HTML element */
    className: PropTypes.string,
    /** onClick function */
    onClick: PropTypes.func,
    /** width in percents calc(${props.width_pr} + ${props.width_px})*/
    width_pr: PropTypes.string,
    /** width in pixels. calc(${props.width_pr} + ${props.width_px}) */
    width_px: PropTypes.string,
    /** name of task */
    name: PropTypes.string,
    /** tabIndex */
    tabIndex: PropTypes.number,
}

export default Task;