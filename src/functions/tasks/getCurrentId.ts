/**
 * @returns {number} id current maxId of tasks
 */
function getCurrentId() {
    let id = 0;
    if(localStorage.getItem('MaxId')!==null){
        id = +(localStorage.getItem('MaxId') as string);
    } else {
        localStorage.setItem('MaxId', '0');
    }
    return id;
}
export default getCurrentId;