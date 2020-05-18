import parseTSV from '../parser/index.js';
import registerListeners from './listeners/index.js'
import parseAndDisplayCollections from './collections.js'

registerListeners();
parseAndDisplayCollections();