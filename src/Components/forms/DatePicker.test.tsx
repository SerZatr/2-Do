import '@testing-library/jest-dom';
import { unmountComponentAtNode } from 'react-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatePicker from './DatePicker'

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


/*
date: Date;
setDate: Function;
tabIndex?: number;
minDate?: Date;
maxDate?: Date;
*/

let date = new Date(2022, 0, 1);

test(`Renders datepicker`, ()=> {
  render( <DatePicker
    date={new Date(2022, 0, 1)}
    setDate={()=>{}} />, 
    container 
  );
  
  const element = document.querySelector('[data-testid=DatePicker]');
  expect((element as Element).textContent).toBe('1 янв');

})