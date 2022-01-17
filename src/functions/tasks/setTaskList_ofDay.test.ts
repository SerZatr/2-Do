import setTasksList_ofDay from "./setTasksList_ofDay";
import { TasksList, TasksStorage } from "../../TSTypes";
import '@testing-library/jest-dom'

let storageLength = 0;
let storage: TasksStorage = {};
let id = 0;

beforeEach(()=>{
    storage = {};
    id = 0;
    storageLength = 0;
});

it("updates received tasks_list_day by adding info about new task: position, id etc", () => {

    let tasks_list: TasksList = {
    '2021-11-12': [{id: 0, type: 'task', time: '12:00'}, {id: 1, type: 'task', time: '12:00'}],
    '2021-11-13': [{id: 2, type: 'longTask', time: '12:00'}],
    '2021-11-14': [{id: 3, type: 'task', time: '12:00'}, {id: 4, type: 'placeholder', time: '12:00'}],
    };
    let tasks_list_day = tasks_list['2021-11-14'];

    setTasksList_ofDay(2, 5, 'longTask', '12:00', tasks_list_day);

    expect(tasks_list['2021-11-14'][2].type).toEqual('longTask');
});