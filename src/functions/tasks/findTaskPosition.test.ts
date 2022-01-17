import '@testing-library/jest-dom'
import LocalStorageMock from "./LocalStorageMock";
global.localStorage = new LocalStorageMock;
import findTaskPosition from './findTaskPosition'
import addNewTask from './addNewTask'
import getTasksList from './getTasksList';
import dateYMD from '../dateYMD';

let errors = 0;
let time = '12:00';
let tasks_list = getTasksList();

beforeAll( ()=> {
    tasks_list = {};
    errors = 0;
} );

function randomizer(): [Date, number] {
    let today = new Date();
    let seed = Math.round(Math.random()*10);
    let firstDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + seed);
    let firstDayOfWeek = firstDate.getDay() == 0 ? 7 : firstDate.getDay();
    let toEndOfWeek = 8 - firstDayOfWeek;
    let taskLength = Math.floor(toEndOfWeek - (Math.random()*toEndOfWeek) +1);
    return [firstDate, taskLength]
}

test(`
    Finds and returns suitable position for task to input.
    Long tasks will try to take first positions in order to minimize free space
    Long tasks can be placed on position of: short tasks, placeholders, free position
    Short tasks can be placed on position of placeholdersm free position
    `, ()=>{

        for (let i=0; i<1000; i++) {
            let [firstDate, taskLength] = randomizer();
            let dateTo = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + taskLength-1);
            addNewTask('name', firstDate, dateTo, time, time, 'no', '', 'green');
        }

        tasks_list = getTasksList();
        
        for (let i=0; i<1000; i++) {
            let [firstDate, taskLength] = randomizer();
            let position = findTaskPosition(tasks_list, firstDate, taskLength);
            let positionsType = '';
            for (let day=0; day<taskLength; day++) {
                let date = dateYMD( new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate()+day) ); 
                if (tasks_list[date]) {
                    if (tasks_list[date][position]) {
                        positionsType = tasks_list[date][position].type;
                    }
                }
            }
            if (positionsType == 'longTask') errors++;
            if (taskLength == 1 && positionsType == 'task') errors++
        }

    expect(errors).toEqual(0);
})