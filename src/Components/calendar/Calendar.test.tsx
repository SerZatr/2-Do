import '@testing-library/jest-dom';
import { unmountComponentAtNode } from 'react-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import Calendar from './Calendar'

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

test(`Renders calendar with props onclick function.`, ()=> {

  render( <Calendar />, container );    

  const element = document.querySelector('[data-testid=Calendar]');
  expect(((element as Element).firstElementChild as Element).children.length).toBe(3);
})