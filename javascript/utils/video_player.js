const LINKER = "http://8balltv.club/content/";

export default function constructSrcURL(filename, playbackTime) {
  const srcURL = LINKER + filename + '#t=' + playbackTime.toString();
  return srcURL
}
