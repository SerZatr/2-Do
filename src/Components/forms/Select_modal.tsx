import React, {useState, useEffect, RefObject} from "react";
import positioning from "../../functions/./positiononing";

interface Props {
    parent: RefObject<HTMLElement>;
    onRequestClose: Function;
    onClick: Function;
    options: Array<string>;
    selected: string;
    setSelectedIndex: Function;
    selectedIndex: number;
    className: string;
    y: string;
    x: string;
    setPosition: {setX:Function, setY:Function}
}

/**
 * @component
 * Modal part of select: list of options
 */
function Select_modal(props: Props) {

    const [y, ] = useState<string>(props.y);
    const [x, ] = useState<string>(props.x);
    const ref = React.createRef<HTMLUListElement>();
    let optionsList = [];
    function escape(event: KeyboardEvent) {
        if(event.code == 'Escape' || event.code == 'Enter' || event.code == 'Tab') props.onRequestClose(event)
    }

    useEffect( () => {
        if (!ref.current) return;
        (ref.current.children[props.selectedIndex] as HTMLElement).focus();
        /**@function closeModal calls props.onRequestClose function */
        function closeModal(event: PointerEvent) {
                if (event.target instanceof HTMLElement){
                if (event.target.closest('.select_modal_container')) return;
                props.onRequestClose(event);
            }}
        if (props.className == 'expanded') {
        window.addEventListener('keydown', escape);
        window.addEventListener('pointerdown', closeModal);
        }

        if(!props.parent.current) return;
        let coords = positioning(ref.current, props.parent.current, 0, 0, 'left', 'bottom');
        /** @function setPosition updates modal position */
        function setPosition() {
            if(ref.current && props.parent.current) {
              positioning(ref.current, props.parent.current, 0, 0, 'left', 'bottom');
            }
        }
        /** @function setPosition_wheel updates position several times on time.
         *  Used for scrolling */
        function setPosition_wheel() {
            let timer = setInterval((event)=>setPosition(), 10);
            setTimeout(()=> clearInterval(timer), 200)
        }
        if (props.className == 'expanded') {
            window.addEventListener('scroll', setPosition);
            window.addEventListener('resize', setPosition);
            window.addEventListener('wheel', setPosition_wheel);
            window.addEventListener('click', setPosition);
        }
        return function cleanup() {
            props.setPosition['setX'](coords['newX']);
            props.setPosition['setY'](coords['newY']);
            window.removeEventListener('keydown', escape);
            window.removeEventListener('pointerdown', closeModal);
            window.removeEventListener('scroll', setPosition);
            window.removeEventListener('resize', setPosition);
            window.removeEventListener('wheel', setPosition_wheel);
            window.removeEventListener('click', setPosition);
        }
      }
    );

    let index = 0;
    for (let i of props.options) {
        let option = (
            <li
                tabIndex={-1}
                aria-label={i}
                role='option' 
                aria-selected={i==props.selected ? 'true' : 'false'} 
                data-value={i} 
                data-index={index}
                key={i} 
                className={'select_option'} 
                onClick={ (event)=>props.onClick(event) }
            >
                {i}
             </li>
        );
        optionsList.push(option);
        index++;
    }

    return(
            <ul style={{left:x, top: y, position:'fixed'}} ref={ref} role='presentation' className={'select_modal_container' + ' ' + props.className}>
                {optionsList}
            </ul>
    )}



export default Select_modal;