import createTaskTypesArray from "./getTaskTypesArray";
import { taskType, TasksList } from "../../TSTypes";

/**
 * @function Finds suitable position for task
 * @param {object} tasks_list  tasks_list[day] = {id: {task}}
 * @param {Date} firstDate  date, task starts
 * @param {number} taskLength number of days, task lasts
 * @returns {number} positionOfNewTask position of task displaying
 */

function findTaskPosition(tasks_list: TasksList, firstDate: Date, taskLength: number,): number {
  let taskTypes: Array<Array<taskType>> = createTaskTypesArray(tasks_list, firstDate, taskLength);
  let suitable = 0; // Если достигнет длины задачи на текущей неделе - задачу можно разместить на текущей позиции
  let positionOfNewTask = 0; // Позиция, на которой получится разместить задачу
  outer: while(suitable<taskLength) {
    for (let position=0; position>-1; position++) {
      for (let day=0; day<taskLength; day++) {
          if(taskTypes[day][position]) {
            if(taskTypes[day][position] == 'longTask') {
              suitable = 0;
              continue;
            }
            if((taskTypes[day][position] == 'task' && taskLength != 1) || taskTypes[day][position] == 'placeholder') {
              ++suitable;
          } else if ((taskTypes[day][position] == 'task' && taskLength == 1)) {
            suitable = 0;
          }
        } else {
          ++suitable;
        }
        positionOfNewTask = position;
        if(suitable == taskLength) break outer;
      }
      suitable = 0;
    }
  }
  return positionOfNewTask;
}
  export default findTaskPosition;
