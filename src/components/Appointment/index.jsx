import React, { Fragment } from 'react';
import "./styles.scss"
import Header from './Header';
import Show from './Show';
import Empty from './Empty';





export default function Appointment(props) {
console.log(props)
  return (
    <Fragment>
      <Header time={props.time} />
      
      <article
        className="appointment">
        {props.interview ? <Show interviewer={props.interview.interviewer.name} student={props.interview.student} /> : <Empty {...props.interview} />}
        {props.message}
      </article>
    </Fragment>
  );

}