import React, { Fragment } from 'react';
import "./styles.scss"
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT"
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";



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
    props.bookInterview(props.id, interview)
      .then(() => { transition(SHOW) })
      .catch(error => transition(ERROR_SAVE, true))

  }

  function cancel(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETING, true)
    props.cancelInterview(props.id, interview)
      .then(() => { transition(EMPTY) })
      .catch(error => transition(ERROR_DELETE, true))
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
            onCancel={() => transition(SHOW)}
          />}
        {mode === DELETING && <Status message={"Deleting..."} />}
        {mode === CONFIRM && <Confirm onConfirm={cancel} onCancel={() => back()} message={"Are you sure you want to delete?"} />}
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
        {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={() => back()} />}
        {mode === ERROR_SAVE && <Error message={"Could not save the changes"} onClose={() => back()} />}
        {mode === ERROR_DELETE && <Error message={"Could not cancel appointment."} onClose={() => back()} />}
        {props.message}
      </article>
    </Fragment>
  );
}
