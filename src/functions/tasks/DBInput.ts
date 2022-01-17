import { TasksList, TasksStorage } from "../../TSTypes";

/**
 * @function Inputs tasks_list, maxId_ TasksStorage into DB
 * @param {object} tasks_list  tasks_list[day] = {id: {task}}
 * @param {number} maxId max current task id
 * @param {object} TasksStorage Object with all tasks 
 */
function DBInput(tasks_list?: TasksList, maxId?:number, TasksStorage?: TasksStorage) {
    if (maxId || maxId===0) {
        localStorage.setItem('MaxId', String(maxId));
    }
    if (TasksStorage) {
        let json = JSON.stringify(TasksStorage);
        localStorage.setItem('tasks', json);
    }
    if(tasks_list) {
        let json2 = JSON.stringify(tasks_list);
        localStorage.setItem('tasks_list', json2);
    }
}

export default DBInput;
