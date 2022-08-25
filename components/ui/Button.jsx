import React from "react";
import Link from "next/link";
import classes from "./Button.module.css";
import LoadingPage from "./LoadingPage";
import { useState } from "react";

export default function Button(props) {
  const [loading, setLoading] = useState(false);

  const handleOnClick = (e)=> {
    e.preventDefault();
    setLoading(true);
    props.onClick(e);
  }

  if(props.link)
    return (
      <>
        {loading && <LoadingPage/>}
        <Link href={props.link}>
          <a className={classes.btn} onClick={()=>setLoading(true)}>{props.children}</a>
        </Link>
      </>
    );
  return <button onClick={handleOnClick} className={classes.btn}>{props.children}</button>  
}
