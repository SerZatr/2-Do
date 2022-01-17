import addNewTask from "./addNewTask";
import { Task, TasksList, TasksStorage } from "../../TSTypes";
import '@testing-library/jest-dom'
import { act } from "react-dom/test-utils";
import dateYMD from "../dateYMD";
import LocalStorageMock from "./LocalStorageMock";

global.localStorage = new LocalStorageMock;

beforeEach(()=> {
  localStorage.clear();
})

test(`Creates new task and inputs it into DB`, ()=> {
  act(()=> {
    

    let date = new Date();
    let dateString = dateYMD(date);
    addNewTask('name', date, date, '12:00', '12:00', 'no', 'description', 'green');
    let result = localStorage.getItem('tasks');
    result = JSON.parse(result as string);

    let result2 = localStorage.getItem('tasks_list');
    result2 = JSON.parse(result2 as string);

    expect(((result as unknown as TasksStorage)[1] as Task).name).toBe('name');
    expect((result2 as unknown as TasksList)[dateString][0].id).toBe(1);
    })
}
  );