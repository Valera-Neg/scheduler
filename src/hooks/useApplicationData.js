import { useState, useEffect } from "react";
import axios from 'axios';



const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
    ]).then((all) => {
      const days = all[0].data
      const appointments = all[1].data
      const interviewers = all[2].data
      setState(prev => ({ ...prev, days, appointments, interviewers }))
    });

  }, []);

  const setDay = day => setState({ ...state, day });


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = state.days.map(day => {
      if (day.name === state.day) {
        return { ...day, spots: day.spots - 1 };
      } else {
        return day;
      }
    });
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => { setState({ ...state, appointments, days }) });
  };


  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = state.days.map(day => {
      if (day.name === state.day) {
        return { ...day, spots: day.spots + 1 };
      } else {
        return day;
      }
    });
    return axios.delete(`/api/appointments/${id}`, { interview }).then(() => { setState({ ...state, appointments, days }) });
  }
  return { state, setDay, bookInterview, cancelInterview };
};
export default useApplicationData;