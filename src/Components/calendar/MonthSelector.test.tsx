import '@testing-library/jest-dom';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom';
import MonthSelector from './MonthSelector';

let container: any = null;
let date = new Date(2022, 0, 1);
let element: any;
let buttonNext: any;

beforeAll(()=> {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterAll(()=> {
  unmountComponentAtNode(container as DocumentFragment);
  (container as Element).remove();
  container = null;
})

test(`Renders header of calendar: year, month name, buttons to change month`, ()=> {
  const onChange = jest.fn();

  act(()=>{
    render( <MonthSelector date={date} onClick={onChange} />, container );
  })

  element = document.querySelector('[data-testid=MonthSelector]');
  buttonNext = (element as HTMLElement).children[2];

  expect((buttonNext as HTMLElement).textContent).toBe('›');
  expect((element as HTMLElement).children[0].textContent).toBe('Январь 2022');

  act(()=>{
    (buttonNext as HTMLButtonElement).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    (buttonNext as HTMLButtonElement).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    (buttonNext as HTMLButtonElement).dispatchEvent(new MouseEvent('click', { bubbles: true }));
  })

  expect(onChange).toHaveBeenCalledTimes(3);
})