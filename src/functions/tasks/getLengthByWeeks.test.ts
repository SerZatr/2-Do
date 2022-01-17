
import '@testing-library/jest-dom'
import getLengthByWeeks from './getLengthByWeeks'

localStorage.setItem('MaxId', '5')

test('returns array with length of task on every week it lasts', ()=> {
  let date = new Date();
  let length = Math.ceil(Math.random()*100);
  let ar = getLengthByWeeks(date, length);
  for (let i=0; i<ar.length; i++) {
      if(i!=0 && i!=ar.length-1) {
        expect(ar[i]).toEqual(7);
      } else {
        expect(ar[i]).toBeLessThan(8);
        expect(ar[i]).toBeGreaterThan(0);
      }
  }
})