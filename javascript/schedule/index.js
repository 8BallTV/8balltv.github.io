import scheduleClockUpdate from './clock.js';
import parseCSV from '../parser/index.js';
import renderTitlesOnSchedule from './create_schedule.js';

scheduleClockUpdate();
parseCSV(renderTitlesOnSchedule);
