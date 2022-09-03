import { useContext, useRef, useState } from "react";
import NotificationContext from "../../store/notifiactionContext";
import LoadingPage from "../ui/LoadingPage";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const {showNotification, hideNotification} = useContext(NotificationContext);

  const removeNotificationAfter = ()=>{
    setTimeout(()=>{
      console.log("Hiding notification...");
      hideNotification();
    }, 3000)
  }

  const setRegistrationError = ()=> {
    showNotification({
      title : "Error",
      message : "Registration failed!",
      status : "error"
    })
  }
  
  const setRegistrationSuccess = ()=> {
    showNotification({
      title : "Success",
      message : "Registration was successfull!",
      status : "success"
    })
  }

  const setRegistrationPending = ()=> {
    showNotification({
      title : "Pending",
      message : "Please Wait",
      status : "pending"
    })
  }

  const handleEmailInputChange = () => {
    
  };

  function registrationHandler(event) {
    event.preventDefault();
    setRegistrationPending();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API

    const email = emailRef.current.value;
    if (email === "") {
      setLoading(false);
      setRegistrationError();
      removeNotificationAfter();
      return;
    }

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
        if (response.status !== 201)
          throw new Error("something wrong happened");
        return response.json();
      })
      .then((data) => {
        emailRef.current.value = "";
        setRegistrationSuccess();
        removeNotificationAfter()
      })
      .catch((error) => {
        setRegistrationError();
        removeNotificationAfter()
      })
      .finally(()=>setLoading(false));
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
          <button onClick={() => setLoading(true)}>Register</button>
        </div>
      </form>
      
      {loading && <LoadingPage />}
    </section>
  );
}

export default NewsletterRegistration;
