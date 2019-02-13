import registerFullScreenListeners from './fullscreen.js';
import registerSoundButtonListeners from './sound.js';

export default function registerListeners() {
  registerFullScreenListeners();
  registerSoundButtonListeners();
}
