import React, { useState, Fragment, useEffect } from "react";

import "components/Application.scss";

import DayList from "./DayList";

import Appointment from "components/Appointment/index";

import axios from 'axios';

import { getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";

import { getInterview } from "helpers/selectors";




export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
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

  const appointments = getAppointmentsForDay(state, state.day);

  const interviewers = getInterviewersForDay(state, state.day);


 
  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // setState({...state, appointments})
    return axios.put(`/api/appointments/${id}`, {interview}).then(() => {setState({...state, appointments })})
  
  }

 
  

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);



    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={Object.values(interviewers)}
        bookInterview={bookInterview}
      />
    );
  });

  return (

    <Fragment>

      <main className="layout">
        <section className="sidebar">
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <nav
            className="sidebar__menu">
            <DayList
              days={state.days}
              value={state.day}
              onChange={setDay}
            />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
        </section>
        <section className="schedule">
          {schedule}
        </section>
      </main>
    </Fragment>
  );
}
