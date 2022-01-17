import applyTaskPosition from "./applyTaskPosition";
import findTaskPosition from "./findTaskPosition";
import setTask from "./setTask";
import { TasksList, Task, taskColour, taskType } from "../../TSTypes";
import getTasksStorage from "./getTasksStorage";
import getTasksList from "./getTasksList";
import getCurrentId from "./getCurrentId";
import DBInput from "./DBInput";
import getLengthByWeeks from "./getLengthByWeeks";

/**
 * @function Creates new task and inputs it into DB
 * @param {string} name  name of new task
 * @param {Date} dateFrom  date task starts
 * @param {Date} dateTo date task ends
 * @param {string} timeFrom time task starts ex. (12:00)
 * @param {string} timeTo time task ends ex. (12:00)
 * @param {string} repeatable still not exists
 * @param {string} description description of task
 * @param {string} colour colour of task 
 */
  function addNewTask(name: string, dateFrom: Date, dateTo: Date, timeFrom: string, timeTo: string, repeatable: string, description: string, colour: taskColour) {

    // Добавление задачи в объект TasksStorage
    let id = getCurrentId();
    id++;
    let maxId = id;
    let TasksStorage: {[key: string]: Task} = getTasksStorage();
    let tasks_list: TasksList = getTasksList();

    let taskLength = +dateTo - +dateFrom;
    taskLength = taskLength/86400000 + 1;

    let taskType: taskType = taskLength> 1 ? 'longTask' : 'task'
    
    setTask(id, name, dateFrom, dateTo, timeFrom, timeTo, repeatable, description, taskType, TasksStorage, colour,);

    // Добавление задачи в объект tasksList

    let lengthByWeeks = getLengthByWeeks(dateFrom, taskLength);
    let weeksCount = lengthByWeeks.length;
    
    let firstDayOfWeek = dateFrom.getDay() == 0 ? 7 : dateFrom.getDay();
    let firstWeekLength = 8-firstDayOfWeek > taskLength ? taskLength : 8-firstDayOfWeek; 

    for(let i=0; i<weeksCount; i++) {
        let lengthOnWeek = lengthByWeeks[i];
        let firstDate = i == 0 ? dateFrom : new Date(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate() + (i-1)*7 + firstWeekLength);
        let taskPosition = findTaskPosition(tasks_list, firstDate, lengthOnWeek, );
        let result = applyTaskPosition(TasksStorage, tasks_list, taskPosition, id, maxId, firstDate, lengthOnWeek, timeFrom, timeTo);
        TasksStorage = result.TasksStorage;
        tasks_list = result.tasks_list;
        maxId = result.maxId;
    }
    DBInput(tasks_list, maxId, TasksStorage);
}

export default addNewTask;