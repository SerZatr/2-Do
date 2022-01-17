import dateYMD from '../dateYMD';
import { TasksList, taskType } from '../../TSTypes';
/**
 * @param {object} tasks_list tasks_list tasks_list[day] = {id: {task}}
 * @param {Date} firstDate date, task begins
 * @param {number} taskLength days task lasts
 * @returns {object} taskTypes, array of types of tasks of chosen day
 */
function getTaskTypesArray(tasks_list: TasksList, firstDate: Date, taskLength: number,) {
    let taskTypes: Array<Array<taskType>> = [];

    for (let i=0; i<taskLength; i++) {
        taskTypes.push([]);
        let currentDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + i);
        if (tasks_list[dateYMD(currentDate)]) {
            for (let task of tasks_list[dateYMD(currentDate)]) {
                if(task.type) {
                    taskTypes[i].push((task.type as taskType));
                }
            }
        }
    }
    return taskTypes;
}

export default getTaskTypesArray;
