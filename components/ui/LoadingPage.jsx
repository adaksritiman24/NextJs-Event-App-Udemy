import React from 'react'
import classes from "./LoadingPage.module.css"
export default function LoadingPage() {
  return (
    <div className={classes.bg}>
        <div className={classes.spinner}></div>
    </div>
  )
}
