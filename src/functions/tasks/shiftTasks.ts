import { TasksList, TasksStorage } from "../../TSTypes";
import getTasksList_ofDay from "./getTasksList_ofDay";
import getTaskTypesArray from "./getTaskTypesArray";

/**
 * @function shifts all short tasks starting from taskPosition to first suitable position: placeholder, or new position
 * @param {object} tasks_list 
 * @param {object} tasksStorage 
 * @param {Date} date 
 * @param {number}  taskPosition 
 * @returns {object} {tasks_list, tasksStorage}
 */
function shiftTasks(tasks_list: TasksList, tasksStorage:TasksStorage, date:Date, taskPosition: number) {
    let tasksPositions = [];
    let tasks_list_day = getTasksList_ofDay(tasks_list, date);
    let taskTypes = (getTaskTypesArray(tasks_list, date, 1))[0];

    for (let pos=taskPosition; pos<=taskTypes.length; pos++) {
        if(taskTypes[pos] == 'task') {
            tasksPositions.push(pos);
        }}

    let newPosition = tasks_list_day.length;
    let firstTaskToReplace = tasksPositions.length-1;

    for (let position=taskPosition+1; position<=taskTypes.length; position++){
        if(taskTypes[position] == 'placeholder') {
            let placeholderId = tasks_list_day[position].id;
            delete tasksStorage[placeholderId];
            newPosition = position;
            break;
        }}

    for(let n=firstTaskToReplace; n>-1; n--) {
      let id = tasks_list_day[tasksPositions[n]].id;
      let time = tasks_list_day[tasksPositions[n]].time;
      tasks_list_day[newPosition] = {id, type:'task', time};
      newPosition = tasksPositions[n];
    }
    return {tasks_list, tasksStorage};
  }

  export default shiftTasks;