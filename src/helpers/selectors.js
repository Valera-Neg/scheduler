export const getAppointmentsForDay = function (state, day) {
  let res = [];
  for (let currentDay of state.days) {
    if (currentDay.name === day) {
      for (let appIndex of currentDay.appointments) {
        if (state.appointments[appIndex]) {
          res.push(state.appointments[appIndex]);
        }
      }
      return res;
    }
  }
  return res;
}


export const getInterview = function (state, interview) {

  if (!interview) {
    return null;
  } else {

    return { student: interview.student, interviewer: state.interviewers[interview.interviewer] }

  }

}


export const getInterviewersForDay = function (state, day) {
  let res = [];
  for (let currentDay of state.days) {
    if (currentDay.name === day) {
      for (let appIndex of currentDay.interviewers) {
        if (state.interviewers[appIndex]) {
          res.push(state.interviewers[appIndex]);
        }
      }
      return res;
    }
  }
  return res;
}

// export const getInterviewer = function(state, interviewer) {
//   if(!interviewer) {
//     return null;
//   }else{
//     return {interviewer: state.interviewers}
//   }
// }





