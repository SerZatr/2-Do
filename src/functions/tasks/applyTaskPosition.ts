import setTask from "./setTask";
import shiftTasks from "./shiftTasks";
import getTaskTypesArray from "./getTaskTypesArray";
import getTasksList_ofDay from "./getTasksList_ofDay";
import { taskType, TasksStorage, TasksList, TaskInList} from "../../TSTypes";
import setTasksList_ofDay from "./setTasksList_ofDay";

/**
 * @function inputs task into task_list. Works only for 1 week. If task is larger, f shold be called for every week it lasts
 * @param {object} TasksStorage  Object with all tasks 
 * @param {object} tasks_list tasks_list[day] = {id: {task}}
 * @param {number} taskPosition position of task display
 * @param {number} taskId id of new task
 * @param {number} maxId current max id of tasks
 * @param {Date} firstDate date on current week, task starts
 * @param {number} taskLength length on current week
 * @param {string} timeFrom time task starts
 * @param {string} timeTo time task ends
 * @returns {object} object {TasksStorage, tasks_list, maxId}
 */
function applyTaskPosition(TasksStorage: TasksStorage, tasks_list: TasksList, taskPosition: number, taskId: number, maxId: number, firstDate: Date, taskLengthOnWeek: number, timeFrom: string, timeTo: string,) {
    let type: taskType = taskLengthOnWeek > 1 ? 'longTask' : 'task'
    
    for (let day=0; day<taskLengthOnWeek; day++) {
        let currentDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + day);
        let tasks_list_day: Array<TaskInList> = getTasksList_ofDay(tasks_list, currentDate);
        let taskTypes = (getTaskTypesArray(tasks_list, currentDate, 1))[0];
            // Удаление лишнего плейсхолдера
            if(taskTypes[taskPosition] == 'placeholder') {
                let placeholderId = tasks_list_day[taskPosition].id;
                delete TasksStorage[placeholderId];
            } else
            // Добавление недостающих плейсхолдеров
            if(taskTypes.length < taskPosition) {
                let placeholdersAmount = taskPosition-taskTypes.length-1;
                for (let a=0; a<=placeholdersAmount; a++) {
                    maxId++;
                    TasksStorage = setTask(maxId, 'placeholder', currentDate, currentDate, timeFrom, timeTo, 'no', '', 'placeholder', TasksStorage);
                    setTasksList_ofDay(taskTypes.length+a, maxId, 'placeholder', timeFrom, tasks_list_day);
                }} else
            // Смещение коротких задач
            if (taskTypes[taskPosition] == 'task') {
                shiftTasks(tasks_list, TasksStorage, currentDate, taskPosition);
                }

            setTasksList_ofDay(taskPosition, taskId, type, timeFrom, tasks_list_day);
    }
    return {TasksStorage, tasks_list, maxId};
}

export default applyTaskPosition;