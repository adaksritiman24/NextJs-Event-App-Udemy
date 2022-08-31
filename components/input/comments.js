import { useState, useEffect } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import LoadingPage from "../ui/LoadingPage";

function Comments(props) {
  const { id: eventId } = props;
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const getAllComments = () => {
    setLoading(true);
    fetch("/api/comments/" + eventId)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => setComments([]))
      .finally(() => setLoading(false));
  };

  function addCommentHandler(commentData, clearAllInputs) {
    // send data to API
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        clearAllInputs();
        getAllComments();
      })
      .catch(console.log);
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
