import React, { Fragment } from "react";


export default function Empty(props) {

  return (
    <Fragment>

      <main className="appointment__add">

        <img
          className="appointment__add-button"
          src="images/add.png"
          alt="Add"
          onClick={props.onAdd}
        />
      </main>
    </Fragment>
  )

}