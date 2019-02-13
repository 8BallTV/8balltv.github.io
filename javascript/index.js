import parseCSV from './parser.js';
import scheduleClipLoads from './schedule_clip_loads.js';
import registerListeners from './listeners/index.js';

registerListeners();
parseCSV(scheduleClipLoads);
