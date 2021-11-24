import React, { Fragment } from 'react';
import "./styles.scss"
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';




const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview).then(() => {transition(SHOW)})
    
  }


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
        {mode === SAVING && <Status  message={"saving..."} />}
        {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={() => back(EMPTY)} />}

        {props.message}
      </article>
    </Fragment>
  );

}
