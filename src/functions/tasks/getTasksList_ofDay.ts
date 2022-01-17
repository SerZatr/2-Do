import dateYMD from "../dateYMD";
import { TaskInList, TasksList } from "../../TSTypes";

/**
 * @param {object} tasks_list tasks_list[day] = {id: {task}}
 * @param {Date} date  list of tasks of this day should be returned
 * @returns {object} tasks_list_day, array of tasks in chosen day
 */
function getTasksList_ofDay(tasks_list: TasksList, date: Date) {
    let tasks_list_day: Array<TaskInList> = [];
    if(!tasks_list[dateYMD(date)]) {
        tasks_list[dateYMD(date)] = [];
    }
    tasks_list_day = tasks_list[dateYMD(date)];
    return tasks_list_day;
}

export default getTasksList_ofDay;