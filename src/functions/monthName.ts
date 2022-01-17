/**
 * @function
 * @param {Date} date Date object
 * @param {string} type full or mini form of month (янв | января)
 * @param {boolean} capital first latter capital?
 * @param {'nominative'|'genitive'|'dative'|'accusative'|'instrumental'|'prepositional'} case Case of month name
 * @returns {string} returns date as string 'dd mm' (exmple: 4 янв)
 */
 function monthName(
  date: Date,
  type: 'mini'|'full'='mini',
  capital: boolean = false,
  caseRu: 'nominative'|'genitive'|'dative'|'accusative'|'instrumental'|'prepositional'='nominative'
): string {

let monthsMini: Array<string> = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
let monthsFull: Array<string> = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентбярь', 'Октябрь', 'Ноябрь', 'Декабрь'];

if(caseRu=='genitive') {
  monthsFull = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентбяря', 'Октября', 'Ноября', 'Декабря'];
}

if(caseRu=='dative') {
  monthsFull = ['Январю', 'Февралю', 'Марту', 'Апрелю', 'Маю', 'Июню', 'Июлю', 'Августу', 'Сентбярю', 'Октябрю', 'Ноябрю', 'Декабрю'];
}

if(caseRu=='accusative') {
  monthsFull = ['Январём', 'Февралём', 'Мартом', 'Апрелем', 'Маем', 'Июнем', 'Июлем', 'Августом', 'Сентбярём', 'Октябрём', 'Ноябрём', 'Декабрём'];
}

if(caseRu=='prepositional') {
  monthsFull = ['Январе', 'Феврале', 'Марте', 'Апреле', 'Мае', 'Июне', 'Июле', 'Августе', 'Сентбяре', 'Октябре', 'Ноябре', 'Декабре'];
}

if(!capital){
  monthsFull = monthsFull.map( (item, index, array) => item.toLowerCase());
  monthsMini = monthsMini.map( (item, index, array) => item.toLowerCase())
}

let months = type=='mini' ? monthsMini : monthsFull;
if (typeof date.getMonth === 'function') {
  return ( months[date.getMonth()] );
} else return (' ');
}

export default monthName;