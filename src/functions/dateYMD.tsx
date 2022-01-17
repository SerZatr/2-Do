function dateYMD(date: Date){
  return (date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate());
}

  /**
 * @function
 * @param {Date} Date
 * @returns {string} returns date as string 'YY-MM-DD' (example: 2021-3-12 (means 2021 april 12))
 */
  export default dateYMD;