import { TasksList, TasksStorage } from "../../TSTypes";
import '@testing-library/jest-dom'
import shiftTasks from './shiftTasks'
import LocalStorageMock from './LocalStorageMock';
global.localStorage = new LocalStorageMock;

let tasks_list: TasksList = {};
let tasksStorage: TasksStorage = {};
let timeFrom = '12:00';
let timeTo = '13:00';
let colour = 'green';
let repeatable = 'no';
let description = '';
let dateFrom: Date = new Date('2021-12-12');
let dateTo: Date = dateFrom;

beforeAll(()=>{
    tasks_list = {
            '2021-11-12':[
                {id: 0, type: 'task', time: '12:00'},
                {id: 1, type: 'task', time: '12:00'},
                {id: 2, type: 'task', time: '12:00'},
                {id: 3, type: 'task', time: '12:00'},
                {id: 4, type: 'placeholder', time: '12:00'},
                {id: 5, type: 'longTask', time: '12:00'},

            ],};
        tasksStorage = {
            '0': {name:'name', dateFrom, dateTo, timeFrom, timeTo, repeatable, description, type: 'task', colour},
            '1': {name:'name', dateFrom, dateTo, timeFrom, timeTo, repeatable, description, type: 'task', colour},
            '2': {name:'name', dateFrom, dateTo, timeFrom, timeTo, repeatable, description, type: 'task', colour},
            '3': {name:'name', dateFrom, dateTo, timeFrom, timeTo, repeatable, description, type: 'task', colour},
            '4': {name:'placeholder', dateFrom, dateTo, timeFrom, timeTo, repeatable, description, type: 'placeholder', colour},
            '5': {name:'name', dateFrom, dateTo, timeFrom, timeTo, repeatable, description, type: 'longTask', colour}
        };
});

test(`
Shifts short tasks starting from taskPosition in tasks_list in date.
Shifts to first placeholder, or creates new position if there is no suitable placeholders.
`, () => {
    let result = shiftTasks(tasks_list, tasksStorage, dateFrom, 1);

    expect(result.tasks_list['2021-11-12'][4].type).toEqual('task');
    expect(result.tasksStorage['4']).toBeUndefined();
});

