import { useState, useEffect, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import LoadingPage from "../ui/LoadingPage";
import NotificationContext from "../../store/notifiactionContext";

function Comments(props) {
  const { id: eventId } = props;
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const { showNotification, hideNotification } =
    useContext(NotificationContext);
  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const removeNotificationAfter = ()=>{
    setTimeout(()=>{
      console.log("Hiding notification...");
      hideNotification();
    }, 3000)
  }

  const setNotificationError = (message) => {
    showNotification({
      title: "Something Went wrong!",
      message: message,
      status: "error",
    });
  };

  const setNotificationPending = (title) => {
    showNotification({
      title: title,
      message: "Please Wait",
      status: "pending",
    });
  };

  const getAllComments = () => {
    setLoading(true);
    setNotificationPending("Loading Comments...");
    fetch("/api/comments/" + eventId)
      .then((response) => {
        if (response.status !== 200) {
          setNotificationError("Failed to load comments!");
          removeNotificationAfter();
          throw new Error("Api call failed");
        }
        return response.json();
      })
      .then((data) => {
        hideNotification();
        setComments(data);
      })
      .catch((error) => setComments([]))
      .finally(() => setLoading(false));
  };

  function addCommentHandler(commentData, clearAllInputs) {
    // send data to API
    setNotificationPending("Adding Comment...");
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.status);
        if(response.status !== 201){
          throw new Error("Failed to add comment!")
        }
        return response.json()
      
      })
      .then((data) => {
        clearAllInputs();
        getAllComments();
      })
      .catch((error)=>{
        setNotificationError("Failed to add comment!");
        removeNotificationAfter();
      });
  }
  useEffect(() => {
    if (showComments) getAllComments();
  }, [showComments]);
  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
      {loading && <LoadingPage />}
    </section>
  );
}

export default Comments;
