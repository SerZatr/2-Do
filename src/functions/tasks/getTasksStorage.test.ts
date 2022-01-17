import '@testing-library/jest-dom'
import getTasksStorage from './getTasksStorage';
import LocalStorageMock from "./LocalStorageMock";
global.localStorage = new LocalStorageMock;

localStorage.setItem('MaxId', '5')

test('Returns tasks object from DB. Array of tasks by days', ()=> {
  let date = new Date(2021, 11, 12);

  let tasksStorage = {'0': {name:'name', dateFrom: String(new Date()), dateTo: String(new Date()), timeFrom: '12:00', timeTo:'12:00', repeatable: 'no', description: '', type: 'task', colour: 'green'}};
    
    let json = JSON.stringify(tasksStorage);

    localStorage.setItem('tasks', json);

  let result = getTasksStorage();

  expect(result).toEqual(tasksStorage);
})