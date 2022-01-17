/**@type {{id: numberm type: taskType, time: string}} */
export interface TaskInList {
    id: number, 
    type: taskType, 
    time: string
  }
/**@type [key: string]: Array<TaskInList> */
  export interface TasksList {
    [key: string]: Array<TaskInList>
  }
    /**@type {{name: string, dateFrom: Date, DateTo: Date, timeFrom: string, repeatable: string, description: string, type: string, colour: string}}*/
  export interface Task {
    name: string, 
    dateFrom: Date , 
    dateTo: Date , 
    timeFrom: string, 
    timeTo: string, 
    repeatable: string, 
    description: string, 
    type: taskType, 
    colour: string,
  }
  /**@type {[key: string]: Task}*/
  export interface TasksStorage {
    [key: string]: Task
  }
/**@type {'task'|'longTask'|'placeholder'} */
  export type taskType = 'task'|'longTask'|'placeholder'
  /**@type {'green'|'purple'|'orange'|'yellow'|'lightBlue'|'blue'} */
  export type taskColour = 'green' | 'purple' | 'orange' | 'yellow' | 'lightBlue' | 'blue'
