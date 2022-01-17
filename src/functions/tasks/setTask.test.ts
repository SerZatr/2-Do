import setTask from "./setTask";
import { TasksStorage, taskType } from "../../TSTypes";
import '@testing-library/jest-dom'
import { act } from "react-dom/test-utils";

let storageLength = 0;
let storage: TasksStorage = {};
let id = 0;
let dateFrom = new Date('2021-01-01');
let dateTo = new Date('2021-01-02');
let timeFrom = '12:00';
let timeTo = '13:00';
let repeatable = 'no';
let description = 'desription'
let type: taskType = 'task';

beforeEach(()=>{
    storage = {};
    id = 0;
    storageLength = 0;
});

it("inputs task into TasksStorage object", () => {
    act(() => {
        for (let i=0; i<10; i++) {
            setTask(id, 'taskName', dateFrom, dateTo, timeFrom, timeTo, repeatable, description, type, storage);
            id++;
        }
        for (let key in storage) {
            storageLength++;
        }
        expect(storageLength).toBe(10);
        expect(storage[1].dateFrom).toBe(dateFrom);
        expect(storage[2].dateTo).toBe(dateTo);
        expect(storage[3].timeFrom).toBe(timeFrom);
        expect(storage[4].timeTo).toBe(timeTo);
        expect(storage[5].repeatable).toBe(repeatable);
        expect(storage[6].description).toBe(description);
        expect(storage[7].type).toBe(type);
  })});