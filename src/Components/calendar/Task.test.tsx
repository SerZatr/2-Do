import '@testing-library/jest-dom';
import { unmountComponentAtNode } from 'react-dom';
import { act, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import Task from './Task'

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

test(`Renders task element for calendar cell`, ()=> {
  act(()=>{
    render( <Task name='TestName'/>, container );    
  });
    
  const element = document.querySelector('[data-testid=Task]');
  expect((element as Element).textContent).toBe('TestName');
})