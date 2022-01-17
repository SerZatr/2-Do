import Task from "./Task";
import { Task as task, TasksList, TasksStorage } from "../../TSTypes";
import getTasksList from "../../functions/tasks/getTasksList"
import getTasksStorage from "../../functions/tasks/getTasksStorage"
import getLengthByWeeks from "../../functions/tasks/getLengthByWeeks"
import dateYMD from "../../functions/dateYMD";

/**
 * @component
 * Renders cell content of calendar
 */
function Day(props: {
  /** date object */
  date: Date;
  /** tasks would be rendered if true */
  showTasks?: boolean;
  className?: string;
  /** style object */
  style?: Object|null;
  /** onclick function for day cell */
  onClick?: Function;
}) {
  const tasksList = [];
  let showTasks = props.showTasks ? props.showTasks : false
  if (showTasks == true) {
    let tasks: TasksStorage = getTasksStorage();
    let tasks_list: TasksList = getTasksList();

    if (tasks_list[dateYMD(props.date)]) {
      for (let value of tasks_list[dateYMD(props.date)]) {
          
          if(tasks[value.id])
  {
            let task: task = tasks[value.id];
            let fullLength = +(new Date(task.dateTo)) - +(new Date(task.dateFrom));
            fullLength = fullLength/86400000 + 1;

            let firstDayOfWeek = new Date(task.dateFrom).getDay();
            firstDayOfWeek = firstDayOfWeek == 0 ? 7 : firstDayOfWeek;

            let daysPassed = (+props.date - +(new Date(task.dateFrom)))/86400000;
            let weeksPassed = Math.ceil((daysPassed + firstDayOfWeek)/7)-1;
            let lengthByWeeks = getLengthByWeeks(task.dateFrom, fullLength);
            let lengthOnWeek = lengthByWeeks[weeksPassed];

            let className = '';
            if (task.type == 'placeholder') {
              className = 'placeholder';
            }
            if(+(new Date(task.dateFrom)) != +props.date && props.date.getDay()!=1) {
              className = 'placeholder';
            }
            if(task.colour && className!='placeholder') {
              className = className + ' ' +task.colour;
            }
        
            let taskElement: JSX.Element = (
              <Task 
                name={ task.name }
                width_pr={(lengthOnWeek * 100 + '%')}
                width_px={+(lengthOnWeek-1)*16 +4 +'px'} 
                key={'task_' + '_' + value.id}
                onClick={ ()=>console.log(1) }
                className={className}
                tabIndex={className=='placeholder'? -1 : 0}
              />
            );
            tasksList.push(taskElement);} else {
              console.log(value.id);
            }
      }
    }
}
  return (
    <div
      role='gridcell'
      tabIndex={0}
      className={props.className ? props.className : ''}
      style={props.style ? props.style : {}}
      data-date={props.date}
      onClick={ (e)=>props.onClick ?  props.onClick(e, props.date) : ()=>{}}
      data-testid='Day'
      >
      <header className="num" data-date={props.date}>
        {props.date.getDate()}
      </header>
      <div role='list' style={{overflowX:'visible'}}>
        {tasksList}
      </div>

    </div>
  )
}



  export default Day;