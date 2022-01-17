/**
 * @function getLengthByWeeks
 * @param {Date} dateFrom date task starts
 * @param {number} taskLength full task length 
 * @returns {Array<number>} lengthByWeeks array with task duration by weeks
 */
function getLengthByWeeks(dateFrom: Date, taskLength: number) {
    let lengthByWeeks: Array<number> = [];
    let firstDayOfWeek = new Date(dateFrom).getDay() == 0 ? 7 : new Date(dateFrom).getDay();
    let firstWeekLength = 8-firstDayOfWeek > taskLength ? taskLength : 8-firstDayOfWeek; 
    let weeksCount = Math.ceil((taskLength + firstDayOfWeek -1)/7);
    let lastWeekLength = taskLength - firstWeekLength - (weeksCount-2)*7 ;

    for(let i=0; i<weeksCount; i++) {
        let lengthOnWeek = 0;
        if(i==0) {
            lengthOnWeek = firstWeekLength
        } else if(i!=weeksCount-1) {
            lengthOnWeek = 7;
        } else if(i==weeksCount-1) {
            lengthOnWeek = lastWeekLength;
        }
        lengthByWeeks.push(lengthOnWeek);
    }
    return lengthByWeeks;
}

export default getLengthByWeeks