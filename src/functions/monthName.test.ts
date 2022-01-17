import '@testing-library/jest-dom';
import monthName from './monthName';

test(`Returns date as string 'dd mm' (exmple: 4 янв)`, ()=> {
  let date = new Date(2021, 0, 1);
  expect(monthName(date, 'full')).toEqual('Января');
  expect(monthName(date)).toEqual('Янв');
  expect(monthName(date, 'mini')).toEqual('Янв');
})