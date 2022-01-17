
import '@testing-library/jest-dom'
import getCurrentId from './getCurrentId';
import LocalStorageMock from "./LocalStorageMock";
global.localStorage = new LocalStorageMock;

localStorage.setItem('MaxId', '5')

test('returns current max id of tasks', ()=> {
  expect(getCurrentId()).toEqual(5);
})