import { Task } from "../../TSTypes";
/**
 * @returns {object} TasksStorage object with all tasks
 */
function getTasksStorage() {
    let tasks_json: string|null = localStorage.getItem('tasks');
    let TasksStorage: {[key: string]: Task} = {};
    if(tasks_json !== null) {
        TasksStorage = JSON.parse(tasks_json);
    }
    return TasksStorage;
}
export default getTasksStorage;