import { TasksList } from "../../TSTypes";
/**
 * @returns {object} tasks_list tasks_list[day] = {id: {task}}
 */
function getTasksList(): TasksList {
    let tasks_list_json: string|null = localStorage.getItem('tasks_list');
    let tasks_list: TasksList = {};
    if(tasks_list_json !== null) {
        tasks_list = JSON.parse(tasks_list_json);
    }
    return tasks_list;
}
export default getTasksList;
