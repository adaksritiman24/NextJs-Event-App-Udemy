import { useRef, useState } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailRef = useRef(null);
  const [registrationError, setRegistrationError] = useState(false);
  const [registrationSucccess, setRegistrationSuccess] = useState(false);

  const handleEmailInputChange = ()=>{
    setRegistrationError(false);
    setRegistrationSuccess(false);
  }

  function registrationHandler(event) {
    event.preventDefault();
    setRegistrationError(false);
    setRegistrationSuccess(false);

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API

    const email = emailRef.current.value;
    if(email === "") return setRegistrationError(true);

    fetch("/api/newsletter-registration", {
      body: JSON.stringify({
        email,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if(response.status !== 201)
          throw new Error("something wrong happened");
        return response.json()
      })
      .then((data) => {
        emailRef.current.value = "";
        setRegistrationSuccess(true);

      })
      .catch((error)=>{
        setRegistrationError(true);
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            name="email"
            ref={emailRef}
            onChange={handleEmailInputChange}
            
          />
          <button>Register</button>
        </div>
      </form>
      {registrationError && <div className={classes.error}>Something Went Wrong! Do ensure correct email format</div>}
      {registrationSucccess && <div className={classes.success}>Registration Successfull!</div>}
    </section>
  );
}

export default NewsletterRegistration;
