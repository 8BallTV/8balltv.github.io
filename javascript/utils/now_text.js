import { calculateMinutesPastMidnight } from './time.js';
import { findCurrentClipIndex } from '../parser/format_parse_data.js';

export default function findCurrentQuarter() {
  const quarters = document.querySelectorAll(".quarter");
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
