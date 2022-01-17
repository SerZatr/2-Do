import '@testing-library/jest-dom'
import dateYMD from './dateYMD'

test(`Returns date as string 'YY-MM-DD' (example: 2021-3-12 (means 2021 april 12))`, ()=> {

let date = new Date(2021, 0, 1);
  expect(dateYMD(date)).toEqual('2021-0-1');
})