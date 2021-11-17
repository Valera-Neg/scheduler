import React, { useState, Fragment, useEffect } from "react";

import "components/Application.scss";

import DayList from "./DayList";

import Appointment from "components/Appointment/index";

import axios from 'axios';

import getAppointmentsForDay from "helpers/selectors";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });



  useEffect(() => {


    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments")
    ]).then((all) => {
      const days = all[0].data
      const appointments = all[1].data
      setState(prev => ({ ...prev, days, appointments }))
    });

  }, []);


  const setDay = day => setState({ ...state, day });
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);

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
          {Object.values(dailyAppointments).map((appointment) => {
            return (
              <Appointment
                key={appointment.id}
                {...appointment}
              />
            )
          })}
        </section>
      </main>
    </Fragment>
  );
}
