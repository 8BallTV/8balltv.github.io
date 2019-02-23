/*
* Register an on-click listner for the schedule link that brings user
* to the schedule html page.
* @param{null}, @return{null}
*/
export default function registerScheduleLinkListener() {
  const scheduleBox = document.querySelector(".schedulebox");
  scheduleBox.addEventListener('click', e => {
    window.location.pathname = "/schedule.html";
  });
}
