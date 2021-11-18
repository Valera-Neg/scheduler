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


 export const getInterview = function(state, interview) {

  if (!interview) {
    return null;
  } else {

    return {student: interview.student, interviewer: state.interviewers[interview.interviewer]}

  }

}
// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     },
//   },
//   interviewers: {
//     "1": {  
//       id: 1,
//       name: "Sylvia Palmer",
//       avatar: "https://i.imgur.com/LpaY82x.png"
//     },
//     "2": {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     }
//   }
// };

// console.log(getInterview(state, state.appointments["3"].interview));
