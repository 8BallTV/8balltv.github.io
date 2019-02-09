const  linker = "http://8balltv.club/content/";

export default function constructSrcURL(filename, playbackTime) {
  const srcURL = linker + filename + '#t=' + playbackTime.toString();
  return srcURL
}
