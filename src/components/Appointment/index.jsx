import React, { Fragment } from 'react';
import "./styles.scss"
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Application from 'components/Application';



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  return (
    <Fragment>
      <Header time={props.time} />


      <article
        className="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            interviewer={props.interview.interviewer.name}
            student={props.interview.student}
          />
        )}
        {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} />}
        {props.message}
      </article>
    </Fragment>
  );

}
