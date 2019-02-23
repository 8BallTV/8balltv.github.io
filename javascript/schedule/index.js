import scheduleClockUpdate from './clock.js';
import parseCSV from '../parser/index.js';
import renderTitlesOnSchedule from './create_schedule.js';
import registerListeners from './listeners/index.js';

registerListeners();
scheduleClockUpdate();
parseCSV(renderTitlesOnSchedule);
