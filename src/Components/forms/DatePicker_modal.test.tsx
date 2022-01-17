import '@testing-library/jest-dom';
import { unmountComponentAtNode } from 'react-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatePicker_modal from './DatePicker_modal'

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

test(`
Renders modal part of datepicker - calendar.
Used by user to select date 
`, ()=> {
  render( <DatePicker_modal
    isVisible={true}
    date={new Date(2022, 0, 1)}
    onRequestClose={()=>{}} 
    parent={container} 
    onClick={()=>{}} />, 
    container 
  );
  
  const element = document.querySelector('[data-testid=DatePicker_modal]');
  const calendarBody = (element as Element).children[2];
  const weeks = calendarBody.children[1];
  expect((weeks as HTMLElement).children[0].children[0].textContent).toBe('27');

})