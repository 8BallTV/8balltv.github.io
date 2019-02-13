import registerFullScreenListeners from './fullscreen.js';
import registerSoundListeners from './sound.js';

export default function registerListeners() {
  registerFullScreenListeners();
  registerSoundListeners();
}
