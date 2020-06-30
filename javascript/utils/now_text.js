import { calculateMinutesPastMidnight } from "./time.js";
import { findCurrentClipIndex } from "../parser/format_parse_data.js";

/**
 * @const
 * @description A NodeList of all the "quarter" elements.
 *   NOTE: A quarter is a <td> element that represents the time.
 *        They are split into 15 minute intervals
 * @type {NodeList<HTMLTableCellElement>}
 */
const quarters = document.querySelectorAll(".quarter");

/**
 * @author samdealy
 * @description Finds the current time's "quarter"
 * @param {null}
 * @return {null}
 */
export default function findCurrentQuarter() {
  const currentQuarterIndex = findCurrentQuarterIndex();
  const currentQuarter = quarters[currentQuarterIndex];
  return currentQuarter;
}

/**
 * @author samdealy
 * @description Finds the current time's quarter's index in the quarters NodeList
 * @param {null}
 * @return {Number} currentQuarterIndex
 */
function findCurrentQuarterIndex() {
  const date = new Date();
  const minutesPastMidnight = calculateMinutesPastMidnight(date);
  const currentQuarterIndex = findCurrentClipIndex(minutesPastMidnight);

  return currentQuarterIndex;
}

/**
 * @author samdealy
 * @description Changes the page position to the fifth most recent quarter.
 * @param {null}
 * @return {null}
 */
export function goToFifthMostRecentQuarter() {
  const fifthMostRecentQuarter = findFifthMostRecentQuarter();
  const urlNoAnchor = window.location.href.split("#")[0];
  window.location.href = urlNoAnchor + "#" + fifthMostRecentQuarter.id;
}

/**
 * @author samdealy
 * @description Finds the fifth most recent quarter
 * @param {null}
 * @return {HTMLTableCellElement}
 */
export function findFifthMostRecentQuarter() {
  const currentQuarterIndex = findCurrentQuarterIndex();
  if (currentQuarterIndex < 5) return;

  const fifthMostRecentQuarterIndex = currentQuarterIndex - 5;
  const fifthMostRecentQuarter = quarters[fifthMostRecentQuarterIndex];

  return fifthMostRecentQuarter;
}
