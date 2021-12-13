export const getAppointmentsForDay = function (state, day) {
  const currentDay = Object.values(state.days).filter(d => d.name === day)
  const appointmentsForDay = currentDay.map(d => d.appointments).flat()
  return appointmentsForDay.map(a => state.appointments[a])
};

export const getInterview = function (state, interview) {
  if(!interview) {
    return null;
  } else {
    return { student: interview.student, interviewer: state.interviewers[interview.interviewer] };
  };
};


export const getInterviewersForDay = function (state, day) {
  const currentDay = Object.values(state.days).filter(d => d.name === day);
  const interviewersForDay = currentDay.map(o => o.interviewers).flat();
  return interviewersForDay.map(i => state.interviewers[i])
};