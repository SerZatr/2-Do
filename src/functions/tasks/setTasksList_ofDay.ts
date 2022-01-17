import { TaskInList, taskType } from "../../TSTypes";

/**
 * @function inputs task into taskl_list_day, array of all tasks in chosen day
 * @param {number} position  position of task display
 * @param {number} id  id of task to input
 * @param {taskType} type  type of task
 * @param {string} time  time task starts (ex. '12:00')
 * @param {Array} tasks_list_day  array of all tasks in day, task should be inputed
 * @returns {object} tasks_list_day, array of all tasks in chosen day
 */
function setTasksList_ofDay(position: number, id: number, type: taskType, time: string, tasks_list_day:Array<TaskInList>): TaskInList[] {
    tasks_list_day[position] = ({id, type, time});
    return tasks_list_day;
  }

  export default setTasksList_ofDay;