import React, { Fragment } from 'react';
import Header from './Header';


export default function (props) {

  return (
    <Fragment>
      <Header time={props.time} />
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>

    </main>
    </Fragment>
  );

}