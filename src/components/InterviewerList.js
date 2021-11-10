import React from 'react';
import "components/InterviewerList.scss"
import InterviewerListItem from './InterviewerListItem';



export default function InterviewerList(props) {



  const interviewerlist = props.interviewers.map((persone) => {
    return (
      <InterviewerListItem
        key={persone.id}
        name={persone.name}
        avatar={persone.avatar}
        selected={persone.id === props.value}
        setInterviewer={() => props.onChange(persone.id)}



      />

    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerlist}
      </ul>
    </section>
  );

}
