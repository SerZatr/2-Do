import React from "react";

/**
 * @component
 * render TextArea, with auto height update
 */
function TextArea(props: {
    /** className of HTML element */
    className?: string;
    /** text placeholder of TextArea */
    placeholder?: string;
    /** onchange function */
    onChange?: Function;}) {

    function heightAutoUpdate(event: React.FormEvent, onChange?: Function) {
        if (event.target instanceof HTMLTextAreaElement) {
            event.target.style.height = 'auto';
            event.target.style.height = +event.target.scrollHeight +  "px";
            if(onChange) {
                onChange(event.target.value);
            }}}

    return (
        <textarea
            className={props.className}
            placeholder={props.placeholder ? props.placeholder : ''}
            onChange={ (event: React.FormEvent)=> heightAutoUpdate(event, props.onChange? props.onChange : undefined) }
            data-testid="textArea"
        >
        </textarea>
    )
}

export default TextArea;