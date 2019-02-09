const first = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRCmu8vTzD_R7L2iqEE0gdD43zbEnTUv5-_f6cHz1zX16JN6c2sdWKagLuOWPO8HBnbghfmInxWNwSz/pub?gid=';
const second = '&single=true&output=csv';

const SUNDAY = first + '845076906' + second;
export const MONDAY = first + '0' + second;
const TUESDAY = first + '580064975' + second;
const WEDNESDAY = first + '1447255775' + second;
const THURSDAY = first + '326821657' + second;
const FRIDAY = first + '677702322' + second;
const SATURDAY = first + '1613981700' + second;

/* Returns the {string} url given the {int} dayOfTheWeek */
export function findURLGivenDay(dayOfTheWeek) {
  switch(dayOfTheWeek) {
    case 0: return SUNDAY;
    case 1: return MONDAY;
    case 2: return TUESDAY;
    case 3: return WEDNESDAY;
    case 4: return THURSDAY;
    case 5: return FRIDAY;
    case 6: return SATURDAY;
  }
}
