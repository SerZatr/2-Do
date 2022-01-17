import '@testing-library/jest-dom';
import { unmountComponentAtNode } from 'react-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Day from './Day';

let container: any = null;
let date = new Date(2022, 0, 1);

beforeEach(()=> {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(()=> {
  unmountComponentAtNode(container as DocumentFragment);
  (container as Element).remove();
  container = null;
})

test(`Renders datepicker`, ()=> {
  render( <Day
    date={date}

     />, 
    container 
  );
  
  const element = document.querySelector('[data-testid=Day]');
  expect((element as Element).textContent).toBe('1');
})