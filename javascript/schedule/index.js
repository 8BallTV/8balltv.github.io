import registerListeners from './listeners/index.js';
import scheduleClockUpdate from './clock.js';
import { setSelectedCSS } from './create_schedule.js';
import scheduleNowTextUpdates  from './set_now.js';
import { goToFifthMostRecentQuarter } from '../utils/now_text.js';
import parseTSV from '../parser/index.js';
import renderTitlesOnSchedule from './create_schedule.js';

registerListeners();
scheduleClockUpdate();
setSelectedCSS();
scheduleNowTextUpdates();
goToFifthMostRecentQuarter();
parseTSV(renderTitlesOnSchedule);
