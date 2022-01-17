import '@testing-library/jest-dom'
import { TasksList } from '../../TSTypes';
import getTasksList from './getTasksList';
import LocalStorageMock from "./LocalStorageMock";
global.localStorage = new LocalStorageMock;

localStorage.setItem('MaxId', '5')

test('Returns tasks_list object from DB. Object with arrays of tasks by days', ()=> {

  let tasks_list: TasksList = {
    '2021-11-12': [{id: 0, type: 'task', time: '12:00'}, {id: 1, type: 'task', time: '12:00'}],
    '2021-11-13': [{id: 2, type: 'task', time: '12:00'}],
    '2021-11-14': [{id: 3, type: 'task', time: '12:00'}],
    };
    let json = JSON.stringify(tasks_list);

    localStorage.setItem('tasks_list', json);

  let result = getTasksList();

  expect(result).toEqual(tasks_list);
})