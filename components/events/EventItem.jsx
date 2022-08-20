import Link from "next/link";
import React from "react";
import Button from "../ui/Button";
import classes from "./EventItem.module.css";

export default function EventItem(props) {
  const { id, title, date, location, image } = props;
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = "/events/" + id;

  return (
    <li className={classes.item}>
      <img src={"/" + image} alt="" width="100px" />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>Explore Event</Button>
        </div>
      </div>
    </li>
  );
}
