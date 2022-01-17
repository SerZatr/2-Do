import monthName from "../../functions/monthName";

/**
 * @component
 * Renders header of calendar: year, month name, buttons to change month
 */
function MonthSelector(props: {
    /** current date */
    date: Date;
    /** function should setDate for parent element */
    onClick: Function;
}) {
    return (
    <div role='header' style={{display: 'flex', alignItems: 'center'}} data-testid='MonthSelector'>
        <h1 style={{width: "200px", marginLeft: "4px"}}>
        {monthName(props.date, 'full', true, 'nominative') + " " + props.date.getFullYear()}
        </h1>
        <button className="roundButton" onClick={(event)=>{
            event.preventDefault();
            if(props.onClick) props.onClick('-1')
            }}>
        <div>{'‹'}</div>
        </button>
        <button className="roundButton" onClick={(event)=>{
            event.preventDefault();
            if(props.onClick) props.onClick('1');
            }}>
        <div>{'›'}</div>
        </button>
    </div>
    )
}

  export default MonthSelector;