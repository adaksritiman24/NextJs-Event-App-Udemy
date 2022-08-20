import React from 'react'
import EventItem from './EventItem';
import allclasses from "./EventList.module.css"

export default function EventList(props) {
    const {items} = props;
  return <ul className={allclasses.list}>
    {items.map(event=><EventItem {...event} key={event.id}/>)}
  </ul>
}
