import React, { useState } from "react";
import CalendarBody from "./CalendarBody";
import DaysOfWeek from "./DaysOfWeek";
import MonthSelector from "./MonthSelector";
import NewTask from "./TaskWindow";
import useChangeMonth from "./useChangeMonth";

/**
 * @component
 * Renders calendar
 */
function Calendar(props:{
   /** onClick function for calendar cells */
  onClick?:Function
}) {

    const [date, setDate, change] = useChangeMonth( new Date() );
    const [modalIsVisible, setModalIsVisible] = useState(false);

    function clickHandler(event: React.MouseEvent, d: Date){
      if(props.onClick) props.onClick(event, d)
    }

    return (
    <div role='section' style={{width:'100%', height:'100%'}} data-testid={'Calendar'}>
        <div className="calendar">
          <MonthSelector date={date} onClick={ (x: string)=>change(x) } />
          <DaysOfWeek />
          <CalendarBody date={date} showTasks={true}
            onClick={ (event: React.MouseEvent<HTMLElement>, d: Date)=> clickHandler(event, d) }
          />
        </div>
        {
        modalIsVisible && <NewTask
        visible={modalIsVisible}
        dateFrom={date}
        dateTo={date}
        onRequestClose={ () => setModalIsVisible(!modalIsVisible) }
        />
        }
    </div>
    )
  }

  export default Calendar;