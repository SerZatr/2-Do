import '@testing-library/jest-dom'
import { TasksList } from '../../TSTypes';
import getTaskTypesArray from './getTaskTypesArray';
import LocalStorageMock from "./LocalStorageMock";
global.localStorage = new LocalStorageMock;

localStorage.setItem('MaxId', '5')

test(`
  Returns taskTypes, array of days from firstDate, lasts tasklength.
  Day arrays contain all types of tasks in same positions, like in tasks_list
`, ()=> {

  let tasks_list: TasksList = {
    '2021-11-12': [{id: 0, type: 'task', time: '12:00'}, {id: 1, type: 'task', time: '12:00'}],
    '2021-11-13': [{id: 2, type: 'longTask', time: '12:00'}],
    '2021-11-14': [{id: 3, type: 'task', time: '12:00'}, {id: 4, type: 'placeholder', time: '12:00'}],
    };

    let json = JSON.stringify(tasks_list);

    localStorage.setItem('tasks_list', json);

  let result = getTaskTypesArray(tasks_list, new Date(2021, 11, 12), 3);

  expect(result[0][0]).toEqual('task');
  expect(result[1][0]).toEqual('longTask');
  expect(result[2][1]).toEqual('placeholder');
})