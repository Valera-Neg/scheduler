const getAppointmentsForDay = function(state, day) {
  let res = [];
  for (let currentDay of state.days) {
    if (currentDay.name === day) {
      for (let appIndex of currentDay.appointments){
        if(state.appointments[appIndex]) {
          res.push(state.appointments[appIndex]);
        }
      }
      return res;
    } 
  }
  return res;
 }

export default getAppointmentsForDay;
