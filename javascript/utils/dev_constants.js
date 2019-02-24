const FIRST_PART_OF_SCHEDULE_URL_DEV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRCmu8vTzD_R7L2iqEE0gdD43zbEnTUv5-_f6cHz1zX16JN6c2sdWKagLuOWPO8HBnbghfmInxWNwSz/pub?gid=';
const SECOND_PART_OF_SCHEDULE_URL_DEV = '&single=true&output=tsv';
/** ID numbers for the specific sheets on the dev schedule */
const TSV_SHEET_IDS_DEV = {
  monday: '0',
  tuesday: '580064975',
  wednesday: '1447255775',
  thursday: '326821657',
  friday: '677702322',
  saturday: '1613981700',
  sunday: '845076906',
}

export const testURL = FIRST_PART_OF_SCHEDULE_URL_DEV + "438846256" + SECOND_PART_OF_SCHEDULE_URL_DEV;

const DEV_CONSTANTS = [FIRST_PART_OF_SCHEDULE_URL_DEV, SECOND_PART_OF_SCHEDULE_URL_DEV, TSV_SHEET_IDS_DEV];
export default DEV_CONSTANTS;
