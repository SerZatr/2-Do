import '@testing-library/jest-dom';
import { unmountComponentAtNode } from 'react-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import DaysOfWeek from './DaysOfWeek';

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

test(`renders days of weeks text. Expml: 'Пн'`, ()=> {
  render( <DaysOfWeek />, container );
  
  const element = document.querySelector('[data-testid=DaysOfWeek]');

  expect((element as HTMLElement).children[0].innerHTML).toBe('Пн');
  expect((element as HTMLElement).children[1].innerHTML).toBe('Вт');
  expect((element as HTMLElement).children[2].innerHTML).toBe('Ср');
  expect((element as HTMLElement).children[3].innerHTML).toBe('Чт');
  expect((element as HTMLElement).children[4].innerHTML).toBe('Пт');
  expect((element as HTMLElement).children[5].innerHTML).toBe('Сб');
  expect((element as HTMLElement).children[6].innerHTML).toBe('Вс');
})