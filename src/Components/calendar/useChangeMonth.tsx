import {useState} from "react";
  /**
   * @param {Date} defaultDate
   * @returns useState: date, setDate, change(x{string}})
   * change(x): function. Changes date to defaultDate+x
   */
function useChangeMonth(defaultDate: Date) {
    const [date, setDate] = useState<Date>(defaultDate);
    /**
     * @param x month would be changed by x value
     */
    function change(x: number) {
        setDate(new Date(date.getFullYear(), date.getMonth() + +x, date.getDate()));
    }
    return [date, setDate, change];
  }

  export default useChangeMonth as Function;