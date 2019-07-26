import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { HeartRateSensor } from "heart-rate";
import { me as appbit } from "appbit";
import { today } from "user-activity";

// Update Date & Time
let clock_time = document.getElementById("time");
let clock_date = document.getElementById("date");
clock.granularity = "minutes";
var months = ["JAN", "FEB", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"];
clock.ontick = function(evt) {
  let today = evt.date;
  let month = today.getMonth();
  let day = today.getDate();
  let hours = today.getHours();
  let mins = util.zeroPad(today.getMinutes());
  if (preferences.clockDisplay == "12h") {
    hours = hours % 12 || 12;
  }
  let date = months[month];
  date = date + " " + day;
  clock_time.text = hours + ":" + mins;
  clock_date.text = date;
}

// Verify/Update Heart Rate
let stats_hr = document.getElementById("hr");
if (HeartRateSensor) {
  const hrm = new HeartRateSensor();
  hrm.addEventListener("reading", () => {
    stats_hr.text = hrm.heartRate;
  });
  hrm.start();
} else {
  const hrm = null;
  stats_hr.text = "--";
}

// Verify/Update Steps
let stats_steps = document.getElementById("steps");
if (appbit.permissions.granted("access_activity")) {
  let steps = today.adjusted.steps;
  stats_steps.text = steps;
}