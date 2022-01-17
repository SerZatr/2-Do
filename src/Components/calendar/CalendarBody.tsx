import React, {useState, useEffect} from "react";
import Day from './Day';

/**
 * @component
 * Renders 1 page of calendar cells
 */
function CalendarBody(props: {
  /** Uses year and month of this date */
  date: Date;
  /** Show tasks in calendar cells if is true */
  showTasks?: boolean;
  /** onclick function for calendar cells */
  onClick?: Function;
}) { 
    const [body, setBody] = useState<Array<JSX.Element>>([]);
    let table_cells: Array<JSX.Element> = [];
    let days_content: Array<JSX.Element> = [];
    let weeks: Array<JSX.Element> = [];

    // Добавляет в массивы разметки и контента ячейки дней в пределах одного месяца.
    // Для отрисовки календаря должна вызываться три раза : выбранный месяц, предыдущий и следующий.
    function createDayCell(startDate: number, endDate: number, monthModifier: 0|1|-1, xPosition:number, yPosition: number) {
      
      let type = monthModifier == 0 ? 'day' : 'day_anotherMonth';

      for (let i=startDate; i<=endDate; i++) {
        let style:{borderLeft?: string, borderTop?: string}={};
        if (xPosition == 1) {
          style.borderLeft='0px';
        }
        if (yPosition == 1) {
          style.borderTop="0px";
        }
 
        let date = new Date(props.date.getFullYear(), props.date.getMonth() + monthModifier, i);
        table_cells.push(
          <div 
            className={'cell'} 
            style={style} 
            key={'cell_' + date} 
            onClick={ (event)=> {if(props.onClick) props.onClick(event, date)} }
          >
          </div>
        );

        days_content.push(
            <Day
              key={'day_' + date}
              date={date}
              className={type}
              showTasks={props.showTasks? props.showTasks : false}
              onClick={ (event: React.MouseEvent<HTMLElement>)=> {if(props.onClick) props.onClick(event, date)} }
              style={{}}
              />
        );

        if (xPosition==7){
          weeks.push(
            <div key={'week_' + weeks.length} style={{width: '100%', overflow:'hidden', display:"grid", gridTemplateColumns:'repeat(7, minmax(30px, 1fr))', gridTemplateRows:'1fr', outline:'0px', gap:'0px', border:'0px'}}>
              {days_content}
            </div>
          )
          days_content=[];
        }

        if (++xPosition == 8) {
          xPosition = 1;
          yPosition++
        }
      }
    }

    function constructBody() {
      let daysInMonth = (new Date(props.date.getFullYear(), props.date.getMonth()+1, 0)).getDate();
      
      let daysInPreviousMonth = (new Date(props.date.getFullYear(), props.date.getMonth(), 0)).getDate();
      let firstDay = new Date(props.date.getFullYear(),  props.date.getMonth(), 1);
      let previousMonth_cellsCount = (firstDay.getDay() == 0) ? 6 : firstDay.getDay() - 1; 
      let previousMonth_startPosition = daysInPreviousMonth - previousMonth_cellsCount + 1;
      
      let nextMonth_cellsCount = 7 - ((daysInMonth + previousMonth_cellsCount) % 7);
      nextMonth_cellsCount = nextMonth_cellsCount == 7 ? 0 : nextMonth_cellsCount;
      let nextMonthXPosition = (previousMonth_cellsCount+daysInMonth) % 7 + 1;
      nextMonthXPosition = (nextMonthXPosition == 8) ? 7 : nextMonthXPosition;
      let nextMonthYPosition = Math.ceil((previousMonth_cellsCount+daysInMonth)/7);
  
      (createDayCell(previousMonth_startPosition, daysInPreviousMonth, -1, 1, 1));
      (createDayCell(1, daysInMonth, 0, previousMonth_cellsCount+1, 1));
      (createDayCell(1, nextMonth_cellsCount, 1, nextMonthXPosition, nextMonthYPosition));
    }

    constructBody();
    useEffect( ()=> {
      setBody(table_cells);
    }, [props.date]);

        return (
          <div style={{width:'100%', height: '100%', position: 'relative'}} data-testid='CalendarBody'>   
            <div role='grid' className="body">
              {body}
            </div>
            <div role='grid' className="bodyContent">
              {weeks}
            </div>
          </div>
        )
    }



  export default CalendarBody;