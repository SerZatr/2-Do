import React, {RefObject, useEffect } from "react";
import CalendarBody from '../calendar/CalendarBody';
import DaysOfWeek from '../calendar/DaysOfWeek';
import MonthSelector from '../calendar/MonthSelector';
import useChangeMonth from '../calendar/useChangeMonth';
import positioning from '../../functions/positiononing';

/**
 * @component
 * Renders modal part of datepicker - calendar. Used by user to select date 
 */
function DatePicker_modal(props: {
    /** Modal is displayed if true */
    isVisible: boolean;
    /** date of rendered calendar */
    date: Date;
    /** function, that closes modal window */
    onRequestClose: Function;
    /** parent HTML element of modal window - <DatePicker> */
    parent: RefObject<HTMLElement>;
    /** onClick function of calendar cells */
    onClick: Function;
}) {
    let parent:HTMLElement;
    if (props.parent.current instanceof HTMLDivElement) {
        parent = props.parent.current;
    }
    const [date, setDate, change] = useChangeMonth(props.date);
    const ref = React.createRef<HTMLDivElement>();

    useEffect( () => {
        if (!ref.current) return;
        let datePicker = ref.current;
        datePicker.style.display='grid';
        if (props.parent.current){
            positioning(datePicker, props.parent.current, 0, 0, 'center', 'bottom');
        }
    });

    function escape(event: KeyboardEvent) {
        if (event.code == "Escape") {
            props.onRequestClose(event);
        }}

    useEffect( () => {
        if (!ref.current) return;
        let datePicker = ref.current;
        function applyPositioning() {
            positioning(datePicker, parent);
        } 
        function closeModal(event: PointerEvent){
            if(!event.target) return
            if (event.target instanceof HTMLElement){
            const target:HTMLElement = event.target;
            if (target.closest('.datePicker')) return;
            props.onRequestClose(event);}
        }
        window.addEventListener('keydown', escape);
        window.addEventListener('pointerdown', closeModal);
        window.addEventListener('scroll', applyPositioning);
        window.addEventListener('resize', applyPositioning);
        return function cleanup() {
            window.removeEventListener('keydown', escape);
            window.removeEventListener('pointerdown', closeModal);
            window.removeEventListener('scroll', applyPositioning);
            window.removeEventListener('resize', applyPositioning);
        }});

    return(
        <div ref={ref} role='dialog' style={{display:"none"}} className='datePicker' data-testid='DatePicker_modal'>
            <MonthSelector date={date} onClick={ (x: string)=>change(x) } />
            <DaysOfWeek />
            <CalendarBody date={date} showTasks={false} onClick={ (event: React.MouseEvent<HTMLElement>, d: string)=>props.onClick(event, d) }  />
        </div>
    );}

    export default DatePicker_modal;