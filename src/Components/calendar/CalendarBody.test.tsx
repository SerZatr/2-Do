import '@testing-library/jest-dom';
import { unmountComponentAtNode } from 'react-dom';
import { act, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import CalendarBody from './CalendarBody'

let container: any = null;

beforeEach(()=> {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(()=> {
  unmountComponentAtNode(container as DocumentFragment);
  (container as Element).remove();
  container = null;
})

test(`Renders 1 page of calendar cells.`, ()=> {
  let date = new Date(2022, 0, 1);
  render( <CalendarBody date={date}/>, container );
  
  const element = document.querySelector('[data-testid=CalendarBody]');
  const weeks = (element as Element).children[1];

  expect((weeks as HTMLElement).children[0].children[0].textContent).toBe('27');
  expect((weeks as HTMLElement).children[0].children[1].textContent).toBe('28');
  expect((weeks as HTMLElement).children[0].children[2].textContent).toBe('29');
  expect((weeks as HTMLElement).children[0].children[3].textContent).toBe('30');
  expect((weeks as HTMLElement).children[0].children[4].textContent).toBe('31');
  expect((weeks as HTMLElement).children[0].children[5].textContent).toBe('1');
  expect((weeks as HTMLElement).children[0].children[6].textContent).toBe('2');

  expect((weeks as HTMLElement).children[1].children[0].textContent).toBe('3');
  expect((weeks as HTMLElement).children[1].children[1].textContent).toBe('4');
  expect((weeks as HTMLElement).children[1].children[2].textContent).toBe('5');
  expect((weeks as HTMLElement).children[1].children[3].textContent).toBe('6');
  expect((weeks as HTMLElement).children[1].children[4].textContent).toBe('7');
  expect((weeks as HTMLElement).children[1].children[5].textContent).toBe('8');
  expect((weeks as HTMLElement).children[1].children[6].textContent).toBe('9');

  expect((weeks as HTMLElement).children[5].children[0].textContent).toBe('31');
  expect((weeks as HTMLElement).children[5].children[1].textContent).toBe('1');
  expect((weeks as HTMLElement).children[5].children[2].textContent).toBe('2');
  expect((weeks as HTMLElement).children[5].children[3].textContent).toBe('3');
  expect((weeks as HTMLElement).children[5].children[4].textContent).toBe('4');
  expect((weeks as HTMLElement).children[5].children[5].textContent).toBe('5');
  expect((weeks as HTMLElement).children[5].children[6].textContent).toBe('6');
})