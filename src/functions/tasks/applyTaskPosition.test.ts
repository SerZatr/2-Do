import applyTaskPosition from "./applyTaskPosition";
import { TasksStorage as tStorage, TasksList, TaskInList } from "../../TSTypes";
import findTaskPosition from "./findTaskPosition";
import '@testing-library/jest-dom'

let TasksStorage: tStorage = {};
let tasks_list: TasksList = {};
let taskId = 0;
let maxId = 0;
let resultTasksSet = new Set();
let placeholders = 0;
let taskLength = 0;
let firstDayOfWeek = 0;
let expectedTasksLength: {[key:string]:number} = {};
let resultTasksLength: {[key:string]:number} = {};

beforeEach(()=> {
    resultTasksSet.clear();
    placeholders = 0;
    resultTasksLength = {};
    })

    beforeAll(()=> {
        taskId=0;
        maxId=0;
        TasksStorage = {};
        tasks_list = {};
        resultTasksSet.clear();
        placeholders = 0;
        expectedTasksLength = {};
        })

test(`
    Trys to place task[taskId] into taskPosition in firstDate and all dates thrue taskLength.
    Works only for 1 week.
    If task is larger, should be called for every week it lasts

    Tasks with taskLengthOnWeek=1 can:
        replace 'placeholder'
        placed on free place
    Tasks with taskLengthOnWeek>1 can:
        shift short tasks
        replace placeholders
    Long tasks cannot be shifted or replaced
`, ()=>{
for (let i=0; i<1000; i++) {
    let today = new Date();
    let seed = Math.round(Math.random()*10);
    let firstDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + seed);
    
    firstDayOfWeek = firstDate.getDay() == 0 ? 7 : firstDate.getDay();
    let toEndOfWeek = 8 - firstDayOfWeek;
    taskLength = Math.floor(toEndOfWeek - (Math.random()*toEndOfWeek) +1);
    
    /*
    if (taskLength > 7) {
        taskLength = 7;
    }
    if (taskLength < 1) {
        taskLength = 1;
    }
    if (taskLength + firstDayOfWeek > 8) {
        taskLength = 1;
    }
    taskLength > 7 ? 7 : taskLength;
    taskLength < 1 ? 1 : taskLength;
    */
    
    let taskPosition = findTaskPosition(tasks_list, firstDate, taskLength);
    let result = applyTaskPosition(TasksStorage, tasks_list, taskPosition, taskId, maxId, firstDate, taskLength, '12:00', '12:00');

    expectedTasksLength[taskId] = taskLength;
    taskId = maxId = result.maxId + 1;
    }

    for (let key in tasks_list) {
    for(let task of tasks_list[key]) {
        if(task.type == 'task' || task.type == 'longTask') {
            if (!resultTasksLength[task.id]) {
                resultTasksLength[task.id] = 1;
            } else {
                ++resultTasksLength[task.id];
            }
        }}}

expect(expectedTasksLength).toEqual(resultTasksLength);
})