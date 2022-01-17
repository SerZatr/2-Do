import { Task, taskType } from "../../TSTypes";
/**
 * @function inputs task into TasksStorage object
 * @param {number} id
 * @param {string} name
 * @param {Date} dateFrom 
 * @param {Date} dateTo 
 * @param {string} timeFrom 
 * @param {string} timeTo 
 * @param {string} repeatable 
 * @param {string} description 
 * @param {string} type 
 * @param {object} TasksStorage 
 * @param {string} colour 
 * @returns {object} TasksStorage object with all tasks
 */
function setTask(
    id: number,
    name: string,
    dateFrom: Date,
    dateTo: Date,
    timeFrom: string,
    timeTo: string,
    repeatable: string,
    description: string,
    type: taskType,
    TasksStorage: {[key: string]: Task},
    colour: string='green',
) {
    let newTask = {name, dateFrom, dateTo, timeFrom, timeTo, repeatable, description, type, colour};
    TasksStorage[id] = newTask;
    return TasksStorage;
}

  export default setTask;