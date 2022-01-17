import '@testing-library/jest-dom';
import { unmountComponentAtNode } from 'react-dom';
import { act, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextArea from './TextArea';

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

test(`Renders textarea, with auto height update to fit all inputed text`, ()=> {

  render( <TextArea placeholder='TestName'/>, container );    

  const element = document.querySelector('textarea');
  expect((element as HTMLTextAreaElement).placeholder).toBe('TestName');
})