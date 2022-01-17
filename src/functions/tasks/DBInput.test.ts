import DBInput from './DBInput';
import '@testing-library/jest-dom'
import LocalStorageMock from "./LocalStorageMock";
import { TasksList, TasksStorage } from '../../TSTypes';
global.localStorage = new LocalStorageMock;

beforeEach( ()=> localStorage.clear() );

test(`Inputs tasks_list?, maxId?, tasksStorage? into DB`, ()=>{

    let tasks_list: TasksList = {'2021-1-1': [{id:0, type:'task', time:'12:00'}]};
    let tasksStorage: TasksStorage = {'0': {name:'name', dateFrom: new Date(), dateTo: new Date(), timeFrom: '12:00', timeTo:'12:00', repeatable: 'no', description: '', type: 'task', colour: 'green'}};
    let maxId: number = 0;

    let response: any = {};
    DBInput(tasks_list, maxId, tasksStorage);

    response.tasks_list = JSON.parse(localStorage.getItem('tasks_list') as string);
    response.maxId = JSON.parse(localStorage.getItem('MaxId') as string);
    response.TasksStorage = JSON.parse(localStorage.getItem('tasks') as string);

    expect(response.maxId).toEqual(0);
    expect(response.tasks_list['2021-1-1'][0].type).toEqual('task');
    expect(response.TasksStorage[0].name).toEqual('name');
})