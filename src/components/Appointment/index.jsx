import React, { Fragment } from 'react';
import "./styles.scss"
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT"



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
    props.bookInterview(props.id, interview).then(() => { transition(SHOW) })
  }

  function cancel(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETING)
    props.cancelInterview(props.id, interview).then(() => { transition(EMPTY) })
  }

  return (
    <Fragment>
      <Header time={props.time} />
      <article
        className="appointment">
        {mode === EDIT &&
          <Form
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onSave={save}
            onCancel={() => back(SHOW)}
          />}
        {mode === DELETING && <Status message={"Deleting..."} />}
        {mode === CONFIRM && <Confirm onConfirm={cancel} onCancel={() => { transition(SHOW) }} message={"Are you sure you want to delete?"} />}
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            interviewer={props.interview.interviewer.name}
            student={props.interview.student}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === SAVING && <Status message={"saving..."} />}
        {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={() => back(EMPTY)} />}
        {props.message}
      </article>
    </Fragment>
  );
}
