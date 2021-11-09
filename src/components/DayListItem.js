import React from "react";
import "components/DayListItem.scss";
import classNames from 'classnames';
;

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = function(props){
    let message = ''
    if(props.spots > 1) {
     message = `${props.spots} spots remaining`; 
      
    } else if (props.spots === 1) {
      message = `${props.spots} spot remaining`; 
    } else {
      message = 'no spots remaining';
    }
    return message;
  }

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)}</h3>
      
    </li>
  );
}