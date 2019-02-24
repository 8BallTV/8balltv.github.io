import scheduleClockUpdate from './clock.js';
import parseTSV from '../parser/index.js';
import renderTitlesOnSchedule from './create_schedule.js';
import registerListeners from './listeners/index.js';
import { setSelectedCSS } from './create_schedule.js';
import scheduleSetNowTextOnCurrentClipQuarter  from './set_now.js';

registerListeners();
scheduleClockUpdate();
setSelectedCSS();
scheduleSetNowTextOnCurrentClipQuarter();
parseTSV(renderTitlesOnSchedule);
