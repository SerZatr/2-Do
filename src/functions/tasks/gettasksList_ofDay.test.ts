import '@testing-library/jest-dom'
import { TasksList } from '../../TSTypes';
import getTasksList_ofDay from './getTasksList_ofDay';
import LocalStorageMock from "./LocalStorageMock";
global.localStorage = new LocalStorageMock;

localStorage.setItem('MaxId', '5')

test('Get tasks_list_day object. List of tasks in selected day', ()=> {
  let date = new Date(2021, 11, 12);

  let tasks_list: TasksList = {
    '2021-11-12': [{id: 0, type: 'task', time: '12:00'}, {id: 1, type: 'task', time: '12:00'}],
    '2021-11-13': [{id: 2, type: 'task', time: '12:00'}],
    '2021-11-14': [{id: 3, type: 'task', time: '12:00'}],
    };
  let tasks_list_day = getTasksList_ofDay(tasks_list, date);
  expect(tasks_list_day[1].id).toEqual(1);
})