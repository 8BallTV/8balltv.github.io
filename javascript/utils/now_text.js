import { calculateMinutesPastMidnight } from './time.js';
import { findCurrentClipIndex } from '../parser/format_parse_data.js';

const quarters = document.querySelectorAll(".quarter");
export default function findCurrentQuarter() {
  const currentQuarterIndex = findCurrentQuarterIndex();
  const currentQuarter = quarters[currentQuarterIndex];
  return currentQuarter;
}

function findCurrentQuarterIndex() {
  const date = new Date();
  const minutesPastMidnight = calculateMinutesPastMidnight(date);
  const currentQuarterIndex = findCurrentClipIndex(minutesPastMidnight);

  return currentQuarterIndex;
}

export function goToFifthMostRecentQuarter() {
  const fifthMostRecentQuarter = findFifthMostRecentQuarter();
  const urlNoAnchor = window.location.href.split("#")[0];
  window.location.href = urlNoAnchor + "#" + fifthMostRecentQuarter.id;
}

export function findFifthMostRecentQuarter() {
  const currentQuarterIndex = findCurrentQuarterIndex();
  if(currentQuarterIndex < 5) return;

  const fifthMostRecentQuarterIndex = currentQuarterIndex - 5;
  const fifthMostRecentQuarter = quarters[fifthMostRecentQuarterIndex];

  return fifthMostRecentQuarter;
}
