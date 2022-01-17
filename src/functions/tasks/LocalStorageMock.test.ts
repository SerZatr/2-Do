import '@testing-library/jest-dom'
import LocalStorageMock from './LocalStorageMock';
global.localStorage = new LocalStorageMock;

test('Creates mock of localStorage', ()=>{
  localStorage.setItem('test', 'value');
  expect(localStorage.getItem('test')).toEqual('value');
})

  export default LocalStorageMock;